import { describe, expect, it } from "vitest";
import {
  accessTokenCookieMaxAge,
  authCookieOptions,
  refreshTokenCookieMaxAge,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
} from "./auth";

describe("auth", () => {
  it("access token を発行して検証できる", () => {
    const token = signAccessToken({
      userId: "user-1",
      email: "user@example.com",
    });

    const payload = verifyAccessToken(token);

    expect(payload.userId).toBe("user-1");
    expect(payload.email).toBe("user@example.com");
  });

  it("refresh token を文字列で発行できる", () => {
    const token = signRefreshToken({
      userId: "user-1",
      email: "user@example.com",
    });

    expect(token).toEqual(expect.any(String));
    expect(token.split(".")).toHaveLength(3);
  });

  it("cookie 設定値が想定どおり", () => {
    expect(authCookieOptions.httpOnly).toBe(true);
    expect(authCookieOptions.sameSite).toBe("lax");
    expect(authCookieOptions.path).toBe("/");
    expect(accessTokenCookieMaxAge).toBe(15 * 60 * 1000);
    expect(refreshTokenCookieMaxAge).toBe(7 * 24 * 60 * 60 * 1000);
  });
});
