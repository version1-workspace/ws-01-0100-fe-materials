import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler";
import { prisma } from "../models/prisma";
import {
  accessTokenCookieMaxAge,
  authCookieOptions,
  refreshTokenCookieMaxAge,
  signAccessToken,
  signRefreshToken,
} from "../lib/auth";
import { BadRequestError, UnauthorizedError } from "../lib/errors";
import { comparePassword, createUser, UserAlreadyExistsError } from "../models/user";

const router = Router();

router.post("/auth/signup", asyncHandler(async (req, res) => {
  const {
    username,
    email,
    email_confirmation: emailConfirmation,
    password,
    password_confirmation: passwordConfirmation,
  } = req.body ?? {};

  if (!username || !email || !emailConfirmation || !password || !passwordConfirmation) {
    throw new BadRequestError("Invalid request body");
  }

  if (email !== emailConfirmation || password !== passwordConfirmation) {
    throw new BadRequestError("Confirmation does not match");
  }

  const tokenPayload = { userId: "", email };
  const refreshToken = signRefreshToken(tokenPayload);

  let user;
  try {
    user = await createUser({
      username,
      email,
      password,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      throw new UnauthorizedError("User already exists");
    }

    throw error;
  }

  const payload = { userId: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const nextRefreshToken = signRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: nextRefreshToken },
  });

  res.cookie("access_token", accessToken, {
    ...authCookieOptions,
    maxAge: accessTokenCookieMaxAge,
  });
  res.cookie("refresh_token", nextRefreshToken, {
    ...authCookieOptions,
    maxAge: refreshTokenCookieMaxAge,
  });

  res.json({
    data: {
      uuid: user.id,
      accessToken,
      refreshToken: nextRefreshToken,
    },
  });
}));

router.post("/auth/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    throw new BadRequestError("Invalid request body");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedError();
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError();
  }

  const payload = { userId: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.cookie("access_token", accessToken, {
    ...authCookieOptions,
    maxAge: accessTokenCookieMaxAge,
  });
  res.cookie("refresh_token", refreshToken, {
    ...authCookieOptions,
    maxAge: refreshTokenCookieMaxAge,
  });

  res.json({
    data: {
      uuid: user.id,
      accessToken,
      refreshToken,
    },
  });
}));

export { router as authRouter };
