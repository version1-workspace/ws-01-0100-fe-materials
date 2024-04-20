const {
  flatten,
  toMap,
  toList,
  ids,
  merge,
  intersection,
  mergeObjOfArray,
  sum
} = require('../../003_practice/003_compound');

const origin = console.log;
afterEach(() => (console.log = origin));

describe('flatten', () => {
  test('normal', () => {
    expect(flatten([[1], [2], [3, 4, 5]])).toEqual([1, 2, 3, 4, 5]);
    expect(flatten([])).toEqual([]);
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('toMap', () => {
  test('normal', () => {
    expect(toMap([1, 2, 3])).toEqual({ 1: true, 2: true, 3: true });
    expect(toMap([-1, -2, -3])).toEqual({ '-1': true, '-2': true, '-3': true });
    expect(toMap([])).toEqual({});
  });
});

describe('toList', () => {
  test('normal', () => {
    expect(toList({ a: 1, b: 2 })).toEqual(['a', 1, 'b', 2]);
    expect(toList({})).toEqual([]);
    expect(toList({
      "BZSU": 920,
      "aW7R": 720,
      "7Fod": 417,
      "D4kg": 317,
      "3Seb": 992,
      "8C6m": 520,
      "hspR": 364,
      "72sM": 28,
      "nPTM": 979,
      "dHRW": 365
    })).toEqual([
      "BZSU", 920,
      "aW7R", 720,
      "7Fod", 417,
      "D4kg", 317,
      "3Seb", 992,
      "8C6m", 520,
      "hspR", 364,
      "72sM", 28,
      "nPTM", 979,
      "dHRW", 365
    ]);
  })
});

describe('ids', () => {
  test('normal', () => {
    expect(ids(
     [
       { id: 1, category: 'kitchen', name: 'knife' },
       { id: 2, category: 'office', name: 'pen' },
       { id: 3, category: 'bath', name: 'soap' },
       { id: 4, category: 'kitchen', name: 'knife' },
       { id: 5, category: 'kitchen', name: 'knife' },
     ]
    )).toEqual([1, 2, 3, 4, 5]);
    expect(ids([])).toEqual([]);
  })
});

describe('merge', () => {
  test('normal', () => {
    expect(merge([1, 2, 3, 4, 5], [4, 5, 6, 7, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(merge([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
    expect(merge([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(merge(['apple', 'banana', 'orange', 'grape'], ['grape', 'kiwi', 'pineapple', 'watermelon'])).toEqual(['apple', 'banana', 'orange', 'grape', 'kiwi', 'pineapple', 'watermelon']);
    expect(merge([], [1, 2, 3])).toEqual([1, 2, 3]);
    expect(merge([], [])).toEqual([]);
  })
});

describe('intersection', () => {
  test('normal', () => {
    expect(intersection([1, 2, 3, 4, 5], [4, 5, 6, 7, 8])).toEqual([4, 5]);
    expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
    expect(intersection([1, 2, 3], [])).toEqual([]);
    expect(intersection(['apple', 'banana', 'orange', 'grape'], ['grape', 'kiwi', 'pineapple', 'watermelon'])).toEqual(['grape']);
    expect(intersection([], [1, 2, 3])).toEqual([]);
    expect(intersection([], [])).toEqual([]);
  })
});

describe('mergeObjOfArray', () => {
  test('normal', () => {
    expect(mergeObjOfArray([{ id: 1, a: 1 }, { id: 2, b: 1 }], [{ id: 1, c: 1 }, {id: 3, d: 4}]))
      .toEqual([{id: 1, a: 1, c: 1}, { id: 2, b: 1 }, {id: 3, d: 4}]);
    expect(mergeObjOfArray([{ id: 2, a: 1 }, { id: 1, b: 1 }], [{ id: 2, c: 1 }, {id: 3, d: 4}]))
      .toEqual([{id: 2, a: 1, c: 1}, { id: 1, b: 1 }, {id: 3, d: 4}]);
    expect(mergeObjOfArray([{ id: 1, a: 1 }, { id: 2, b: 1 }], [{ id: 3, c: 1 }, {id: 4, d: 4}]))
      .toEqual([{ id: 1, a: 1 }, { id: 2, b: 1 }, { id: 3, c: 1 }, { id: 4, d: 4 }]);
    expect(mergeObjOfArray([], [{ id: 3, c: 1 }, {id: 4, d: 4}]))
      .toEqual([{ id: 3, c: 1 }, { id: 4, d: 4 }]);
    expect(mergeObjOfArray([{ id: 1, a: 1 }, { id: 2, b: 1 }], []))
      .toEqual([{ id: 1, a: 1 }, { id: 2, b: 1 }]);
    expect(mergeObjOfArray([], []))
      .toEqual([]);
  })
});

describe('sum', () => {
  test('normal', () => {
    expect(sum([]))
      .toEqual(0);
    expect(sum([{ count: 1 }, { count: 2 }, { count: 3 }]))
      .toEqual(6);
    expect(sum({ count: 1 , a: [{ count: 2 }, { count: 3 }], b: { count: 4 }}, { count: 5 }))
      .toEqual(15);
  })
});
