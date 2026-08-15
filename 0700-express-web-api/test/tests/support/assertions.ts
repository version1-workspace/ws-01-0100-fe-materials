import { expect } from "vitest";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isoDateTimePattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

const openApiDateTimePattern =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function expectUuid(value: unknown): asserts value is string {
  expect(value).toEqual(expect.any(String));
  expect(value).toMatch(uuidPattern);
}

export function expectNonEmptyString(value: unknown): asserts value is string {
  expect(value).toEqual(expect.any(String));
  expect((value as string).length).toBeGreaterThan(0);
}

export function expectString(value: unknown): asserts value is string {
  expect(value).toEqual(expect.any(String));
}

export function expectEmail(value: unknown): asserts value is string {
  expectString(value);
  expect(value).toMatch(emailPattern);
}

export function expectIsoDateTime(value: unknown): asserts value is string {
  expectString(value);
  expect(value).toMatch(openApiDateTimePattern);
  expect(Number.isNaN(Date.parse(value))).toBe(false);
}

export function expectInteger(value: unknown): asserts value is number {
  expect(value).toEqual(expect.any(Number));
  expect(Number.isInteger(value)).toBe(true);
}

export function expectBoolean(value: unknown): asserts value is boolean {
  expect(value).toEqual(expect.any(Boolean));
}

export function expectRecord(value: unknown): asserts value is Record<string, unknown> {
  expect(value).not.toBeNull();
  expect(Array.isArray(value)).toBe(false);
  expect(typeof value).toBe("object");
}

export function expectSchemaProperty(
  object: Record<string, unknown>,
  property: string,
  expectValue: (value: unknown) => void
): void {
  expect(Object.hasOwn(object, property), `property ${property} が存在しません`).toBe(true);

  const value = object[property];
  expect(value, `property ${property} に undefined は指定できません`).not.toBeUndefined();

  if (value !== null) {
    expectValue(value);
  }
}

export function expectOptionalIsoDateTime(value: unknown): void {
  if (value === null || value === undefined) {
    return;
  }

  expect(value).toEqual(expect.any(String));
  expect(value).toMatch(isoDateTimePattern);
}

export function expectOptionalString(value: unknown): void {
  if (value === null || value === undefined) {
    return;
  }

  expect(value).toEqual(expect.any(String));
}

export function expectOptionalInteger(value: unknown): void {
  if (value === null || value === undefined) {
    return;
  }

  expect(value).toEqual(expect.any(Number));
  expect(Number.isInteger(value)).toBe(true);
}

export function expectPageInfo(value: unknown, expected: { limit: number; page: number }): void {
  expect(value).toEqual(
    expect.objectContaining({
      totalCount: expect.any(Number),
      limit: expected.limit,
      page: expected.page,
      hasNext: expect.any(Boolean),
      hasPrevious: expect.any(Boolean)
    })
  );
}
