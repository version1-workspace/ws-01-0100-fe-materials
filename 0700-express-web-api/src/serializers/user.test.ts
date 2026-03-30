import { describe, expect, it } from "vitest";
import { serializeUser } from "./user";

describe("serializeUser", () => {
  it("UserResponse をそのまま整形する", () => {
    expect(
      serializeUser({
        id: "user-1",
        username: "demo",
        email: "demo@example.com",
        status: "active",
      }),
    ).toEqual({
      id: "user-1",
      username: "demo",
      email: "demo@example.com",
      status: "active",
    });
  });
});
