const {
  filter,
  find,
  findIndex,
  some,
  every,
  map,
  forEach
} = require('../../001_syntax/007_high-order-function');

describe('filter', () => {
  test('正常系', () => {
    const list = [1, 2, 3, 4, 5];
    const res = filter(list, (num) => num % 2 === 0)

    expect(res).toEqual([2, 4]);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('正常系 2', () => {
    const list = ['a', 'b', 'cde', 'fgh'];
    const res = filter(list, (it) => it.length === 1)

    expect(res).toEqual(['a', 'b']);
    expect(list).toEqual(['a', 'b', 'cde', 'fgh']);
  });

  test('正常系 3', () => {
    const list = [];
    const res = filter(list, (it) => it.length === 1)

    expect(res).toEqual([]);
    expect(list).toEqual([]);
  });

  test('index: 正常系', () => {
    const indexList = [];
    const list = [1, 2, 3, 4, 5];
    filter(list, (_it, index) => indexList.push(index))

    expect(indexList).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('find', () => {
  test('正常系', () => {
    const list = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const res = find(list, (it) => it.id === 3)

    expect(res).toEqual({ id: 3 });
    expect(list).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  });

  test('正常系 2', () => {
    const list = ['a', 'b', 'cde', 'fgh'];
    const res = find(list, (it) => it.length > 1)

    expect(res).toEqual('cde');
    expect(list).toEqual(['a', 'b', 'cde', 'fgh']);
  });

  test('正常系 3', () => {
    const list = [];
    const res = find(list, (it) => it.length === 1)

    expect(res).toEqual(undefined);
    expect(list).toEqual([]);
  });

  test('正常系 4', () => {
    const list = [1, 2, 3, 4, 5];
    const res = find(list, (it) => it === 6)

    expect(res).toEqual(undefined);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('index: 正常系', () => {
    const indexList = [];
    const list = [1, 2, 3, 4, 5];
    find(list, (_it, index) => {
      indexList.push(index)
      return false
    })

    expect(indexList).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('findIndex', () => {
  test('正常系', () => {
    const list = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const res = findIndex(list, (it) => it.id === 3)

    expect(res).toEqual(2);
    expect(list).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  });

  test('正常系 2', () => {
    const list = ['a', 'b', 'cde', 'fgh'];
    const res = findIndex(list, (it) => it.length > 1)

    expect(res).toEqual(2);
    expect(list).toEqual(['a', 'b', 'cde', 'fgh']);
  });

  test('正常系 3', () => {
    const list = [];
    const res = findIndex(list, (it) => it.length === 1)

    expect(res).toEqual(-1);
    expect(list).toEqual([]);
  });

  test('正常系 4', () => {
    const list = [1, 2, 3, 4, 5];
    const res = findIndex(list, (it) => it === 6)

    expect(res).toEqual(-1);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('index: 正常系', () => {
    const indexList = [];
    const list = [1, 2, 3, 4, 5];
    findIndex(list, (_it, index) => {
      indexList.push(index)
      return false
    })

    expect(indexList).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('some', () => {
  test('正常系', () => {
    const list = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const res = some(list, (it) => it.id === 3)

    expect(res).toEqual(true);
    expect(list).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  });

  test('正常系 2', () => {
    const list = ['a', 'b', 'cde', 'fgh'];
    const res = some(list, (it) => it.length > 1)

    expect(res).toEqual(true);
    expect(list).toEqual(['a', 'b', 'cde', 'fgh']);
  });

  test('正常系 3', () => {
    const list = [];
    const res = some(list, (it) => it.length === 1)

    expect(res).toEqual(false);
    expect(list).toEqual([]);
  });

  test('正常系 4', () => {
    const list = [1, 2, 3, 4, 5];
    const res = some(list, (it) => it === 6)

    expect(res).toEqual(false);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('正常系 5', () => {
    const list = [1, 2, 3, 4, 5];
    const res = some(list, (it) => it > 0)

    expect(res).toEqual(true);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('index: 正常系', () => {
    const indexList = [];
    const list = [1, 2, 3, 4, 5];
    some(list, (_it, index) => {
      indexList.push(index)
      return false;
    })

    expect(indexList).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('every', () => {
  test('正常系', () => {
    const list = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const res = every(list, (it) => it.id === 3)

    expect(res).toEqual(false);
    expect(list).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  });

  test('正常系 2', () => {
    const list = ['a', 'b', 'cde', 'fgh'];
    const res = every(list, (it) => it.length > 1)

    expect(res).toEqual(false);
    expect(list).toEqual(['a', 'b', 'cde', 'fgh']);
  });

  test('正常系 3', () => {
    const list = [];
    const res = every(list, (it) => it.length === 1)

    expect(res).toEqual(true);
    expect(list).toEqual([]);
  });

  test('正常系 4', () => {
    const list = [1, 2, 3, 4, 5];
    const res = every(list, (it) => it === 6)

    expect(res).toEqual(false);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('index: 正常系', () => {
    const indexList = [];
    const list = [1, 2, 3, 4, 5];
    every(list, (_it, index) => {
      indexList.push(index)
      return true
    })

    expect(indexList).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('map', () => {
  test('正常系', () => {
    const list = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const res = map(list, (it) => ({ ...it, processed: true }));

    expect(res).toEqual([
      { id: 1, processed: true },
      { id: 2, processed: true },
      { id: 3, processed: true },
      { id: 4, processed: true },
      { id: 5, processed: true },
    ]);
    expect(list).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  });

  test('正常系 2', () => {
    const list = ['a', 'b', 'cde', 'fgh'];
    const res = map(list, (it) => '"' + it + '"')

    expect(res).toEqual(['"a"', '"b"', '"cde"', '"fgh"']);
    expect(list).toEqual(['a', 'b', 'cde', 'fgh']);
  });

  test('正常系 3', () => {
    const list = [];
    const res = map(list, (it) => it.length === 1)

    expect(res).toEqual([]);
    expect(list).toEqual([]);
  });

  test('正常系 4', () => {
    const list = [1, 2, 3, 4, 5];
    const res = map(list, () => undefined)

    expect(res).toEqual([undefined, undefined, undefined, undefined, undefined]);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('index: 正常系', () => {
    const indexList = [];
    const list = [1, 2, 3, 4, 5];
    map(list, (_it, index) => indexList.push(index))

    expect(indexList).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('forEach', () => {
  test('正常系', () => {
    const list = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const res = forEach(list, (it) => it.processed = true );

    expect(res).toEqual(undefined);
    expect(list).toEqual([
      { id: 1, processed: true },
      { id: 2, processed: true },
      { id: 3, processed: true },
      { id: 4, processed: true },
      { id: 5, processed: true },
    ]);
  });

  test('正常系 2', () => {
    const list = ['a', 'b', 'cde', 'fgh'];
    const res = forEach(list, (it, index) => list[index] = '"' + it + '"')

    expect(res).toEqual(undefined);
    expect(list).toEqual(['"a"', '"b"', '"cde"', '"fgh"']);
  });

  test('正常系 3', () => {
    const list = [];
    const res = forEach(list, (it, index) => list[index] = it + 1)

    expect(res).toEqual(undefined);
    expect(list).toEqual([]);
  });

  test('正常系 4', () => {
    const list = [1, 2, 3, 4, 5];
    const res = forEach(list, () => undefined)

    expect(res).toEqual(undefined);
    expect(list).toEqual([1, 2, 3, 4, 5]);
  });

  test('index: 正常系', () => {
    const indexList = [];
    const list = [1, 2, 3, 4, 5];
    forEach(list, (_it, index) => indexList.push(index))

    expect(indexList).toEqual([0, 1, 2, 3, 4]);
  });
});

