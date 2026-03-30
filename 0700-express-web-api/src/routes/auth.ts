import { Router } from "express";
import { prisma } from "../lib/prisma";
import {
  accessTokenCookieMaxAge,
  authCookieOptions,
  refreshTokenCookieMaxAge,
  signAccessToken,
  signRefreshToken,
} from "../lib/auth";
import { comparePassword, createUser, UserAlreadyExistsError } from "../models/user";

const router = Router();

router.post("/auth/signup", async (req, res) => {
  try {
    const {
      username,
      email,
      email_confirmation: emailConfirmation,
      password,
      password_confirmation: passwordConfirmation,
    } = req.body ?? {};

    if (!username || !email || !emailConfirmation || !password || !passwordConfirmation) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    if (email !== emailConfirmation || password !== passwordConfirmation) {
      res.status(400).json({ message: "Confirmation does not match" });
      return;
    }

    const tokenPayload = { userId: "", email };
    const refreshToken = signRefreshToken(tokenPayload);

    const user = await createUser({
      username,
      email,
      password,
      refreshToken,
    });

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
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      res.status(401).json({ message: "User already exists" });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Unauthorized" });
      return;
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as authRouter };
