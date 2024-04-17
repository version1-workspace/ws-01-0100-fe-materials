const {
  linearSearch,
  binarySearch
} = require('../../004_algorithm/001_search');

const origin = console.log;
afterEach(() => (console.log = origin));

describe('linearSearch', () => {
  test('normal', () => {
    expect(linearSearch([1, 3, 2, 4, 5], 3)).toEqual(1);
    expect(linearSearch([1, 3, 2, 4, 5], 6)).toEqual(-1);
  });
});

describe('binarySearch', () => {
  test('normal', () => {
    expect(binarySearch([1, 10, 20, 30, 40, 50, 90, 100], 40)).toEqual(4);
    expect(binarySearch([1, 10, 20, 30, 40, 50, 90, 100], 110)).toEqual(-1);
  });
});

