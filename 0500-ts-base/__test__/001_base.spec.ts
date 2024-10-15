import { add, sum, format, merge, stringify } from "../practices/001_base";

const origin = console.log;
afterEach(() => (console.log = origin));

describe("add", () => {
  test("return add result", () => {
    expect(add(1, 2)).toEqual(3);
    expect(add(-1, 2)).toEqual(1);
    expect(add(1, -2)).toEqual(-1);
    expect(add(0, 0)).toEqual(0);
  });
});

describe("sum", () => {
  test("return sum result", () => {
    expect(sum([1, 2, 3])).toEqual(6);
    expect(sum([-1, 2, -4])).toEqual(-3);
    expect(sum([1, -2])).toEqual(-1);
    expect(sum([0, 0])).toEqual(0);
  });
});

describe("format", () => {
  test("return format result", () => {
    const list = [
      new Date("2021-01-01 00:00:00"),
      new Date("2024-10-03 00:00:00"),
      new Date("9999-12-31 00:00:00"),
    ];
    expect(format(list[0])).toEqual("2021/01/01");

    expect(format(list[1])).toEqual("2024/10/03");

    expect(format(list[2])).toEqual("9999/12/31");
  });
});

describe("merge", () => {
  test("return format result", () => {
    const list: {
      a: Record<string, number>;
      b: Record<string, number>;
      expected: Record<string, number>;
    }[] = [
      {
        a: { a: 1, b: 2 },
        b: { a: 1, b: 2 },
        expected: { a: 2, b: 4 },
      },
      {
        a: {},
        b: {},
        expected: {},
      },
      {
        a: { a: 1, c: 1 },
        b: { b: 1, d: 1 },
        expected: { a: 1, b: 1, c: 1, d: 1 },
      },
    ];

    list.forEach(({ a, b, expected }) => {
      expect(merge(a, b)).toEqual(expected);
    });
  });
});

describe("stringify", () => {
  test("return format result", () => {
    [
      ["a", "a"],
      [1, "1"],
      [true, "true"],
      [null, "null"],
      [undefined, "undefined"],
    ].forEach(([input, expected]) => {
      expect(stringify(input)).toEqual(expected);
    });
  });
});
