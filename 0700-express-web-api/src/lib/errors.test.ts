import { describe, expect, it } from "vitest";
import { BadRequestError, HttpError, NotFoundError, UnauthorizedError } from "./errors";

describe("errors", () => {
  it("HttpError が statusCode を保持する", () => {
    const error = new HttpError(418, "teapot");

    expect(error.statusCode).toBe(418);
    expect(error.message).toBe("teapot");
  });

  it("派生エラーが既定の statusCode を持つ", () => {
    expect(new BadRequestError().statusCode).toBe(400);
    expect(new UnauthorizedError().statusCode).toBe(401);
    expect(new NotFoundError().statusCode).toBe(404);
  });
});
