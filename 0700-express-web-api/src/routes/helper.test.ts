import { describe, expect, it } from "vitest";
import { toOptionalDate, toPositiveInt } from "./helper";

describe("routes/helper", () => {
  it("toPositiveInt は正の整数を返し、それ以外は fallback を返す", () => {
    expect(toPositiveInt("5", 20)).toBe(5);
    expect(toPositiveInt(0, 20)).toBe(20);
    expect(toPositiveInt(-1, 20)).toBe(20);
    expect(toPositiveInt("abc", 20)).toBe(20);
  });

  it("toOptionalDate は undefined/null/空文字/日付を正しく扱う", () => {
    expect(toOptionalDate(undefined)).toBeUndefined();
    expect(toOptionalDate(null)).toBeNull();
    expect(toOptionalDate("")).toBeNull();
    expect(toOptionalDate("2026-03-30")?.toISOString()).toContain("2026-03-30");
    expect(toOptionalDate("invalid-date")).toBeUndefined();
  });
});
