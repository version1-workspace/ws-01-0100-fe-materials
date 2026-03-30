import { describe, expect, it, vi } from "vitest";
import { BadRequestError } from "../lib/errors";
import { errorHandler } from "./error-handler";

function createResponseMock() {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  };
}

describe("errorHandler", () => {
  it("HttpError は対応する status で返す", () => {
    const res = createResponseMock();

    errorHandler(new BadRequestError("invalid"), {} as never, res as never, vi.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "invalid" });
  });

  it("未知の error は 500 で返す", () => {
    const res = createResponseMock();
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    errorHandler(new Error("unexpected"), {} as never, res as never, vi.fn());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    spy.mockRestore();
  });
});
