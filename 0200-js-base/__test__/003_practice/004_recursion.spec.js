const {
  sumSequence,
  fibonacci,
  flatten,
  fileSize,
} = require('../../003_practice/004_recursion');

const origin = console.log;
afterEach(() => (console.log = origin));

describe('sumSequence', () => {
  test('normal', () => {
    expect(sumSequence(1)).toEqual(1);
    expect(sumSequence(3)).toEqual(6);
    expect(sumSequence(10)).toEqual(55);
    expect(sumSequence(30)).toEqual(465);
  });
});

describe('fibonacci', () => {
  test('normal', () => {
    expect(fibonacci(10)).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    expect(fibonacci(3)).toEqual([1, 1, 2]);
  });
});

describe('flatten', () => {
  test('normal', () => {
    expect(flatten([[[1, 2], [3, 4, [5, 6]]], [[7, 8]]])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(flatten([[[[[[[[1, 2, [3, 4]]]]]]]]])).toEqual([1, 2, 3, 4]);
  });
});


describe('fileSize', () => {
  const data1 = {
    type: 'file',
    size: 10,
  }
  const data2 = {
    type: 'folder',
    size: 0,
    children: [
      {
        type: 'file',
        size: 10
      },
      {
        type: 'file',
        size: 5
      },
    ]
  }
  const data3 = {
    type: 'folder',
    size: 0,
    children: [
      {
        type: 'folder',
        size: 0,
        children: [
          {
            type: 'folder',
            size: 0,
            children: [
              {
                type: 'file',
                size: 5,
              },
              {
                type: 'file',
                size: 7,
              },
              {
                type: 'file',
                size: 9,
              },
            ],
          },
        ],
      },
      {
        type: 'file',
        size: 3,
      },
      {
        type: 'file',
        size: 4,
      },
      {
        type: 'file',
        size: 10,
      },
    ],
  };
  test('normal', () => {
    expect(fileSize(data1)).toEqual(10);
    expect(fileSize(data2)).toEqual(15);
    expect(fileSize(data3)).toEqual(38);
  });
});
