import { describe, expect, it, vi } from "vitest";
import { asyncHandler } from "./async-handler";

describe("asyncHandler", () => {
  it("成功時は handler を実行する", async () => {
    const next = vi.fn();
    const handler = vi.fn().mockResolvedValue(undefined);
    const wrapped = asyncHandler(handler);

    wrapped({} as never, {} as never, next);
    await Promise.resolve();

    expect(handler).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("失敗時は next に error を渡す", async () => {
    const next = vi.fn();
    const error = new Error("boom");
    const wrapped = asyncHandler(async () => {
      throw error;
    });

    wrapped({} as never, {} as never, next);
    await Promise.resolve();

    expect(next).toHaveBeenCalledWith(error);
  });
});
