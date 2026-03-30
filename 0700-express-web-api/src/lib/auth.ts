import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_ACCESS_SECRET ?? "local-access-secret";
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET ?? "local-refresh-secret";

const accessTokenExpiresIn = "15m";
const refreshTokenExpiresIn = "7d";

export type AuthTokenPayload = {
  userId: string;
  email: string;
};

export function signAccessToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
}

export function signRefreshToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiresIn });
}

export function verifyAccessToken(token: string): AuthTokenPayload {
  return jwt.verify(token, accessTokenSecret) as AuthTokenPayload;
}

export const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export const accessTokenCookieMaxAge = 15 * 60 * 1000;
export const refreshTokenCookieMaxAge = 7 * 24 * 60 * 60 * 1000;
