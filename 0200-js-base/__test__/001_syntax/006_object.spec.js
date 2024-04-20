const { logMock } = require('../index');
const {
  getPersonObject,
  keys,
  values,
  doubleAge,
  setProcessedFlag,
  assignNumber,
  isDuplicate,
} = require('../../001_syntax/006_object');

const origin = console.log;
let outputs = [];
beforeEach(() => {
  outputs = []
  console.log = logMock(outputs)
});
afterEach(() => (console.log = origin));

describe('getPersonObject', () => {
  test('正常系', () => {
    const res = getPersonObject()
    expect(res.name).toEqual("Bob");
    expect(res.age).toEqual(32);
    expect(res.gender).toEqual("male");
  });
});

describe('keys', () => {
  test('正常系', () => {
    keys({})
    expect(outputs.length).toEqual(0);
    expect(outputs).toEqual([]);
  });

  test('正常系 2', () => {
    keys({ a: 1, b: 2, c: 3 })
    expect(outputs.length).toEqual(3);
    expect(outputs).toEqual(['a', 'b', 'c']);
  });

  test('正常系 3', () => {
    keys({ a: 1, b: 2, c: 3, d: 4, e: 5})
    expect(outputs.length).toEqual(5);
    expect(outputs).toEqual(['a', 'b', 'c', 'd', 'e']);
  });
});

describe('values', () => {
  test('正常系', () => {
    values({});
    expect(outputs.length).toEqual(0);
    expect(outputs).toEqual([]);
  });

  test('正常系 2', () => {
    values({ a: 1, b: 2, c: 3 });
    expect(outputs.length).toEqual(3);
    expect(outputs).toEqual([1, 2, 3]);
  });

  test('正常系 3', () => {
    values({ a: 1, b: 2, c: 3, d: 4, e: 5 });
    expect(outputs.length).toEqual(5);
    expect(outputs).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('doubleAge', () => {
  test('正常系', () => {
    const obj = { name: 'Bob', age: 32, gender: 'male' }
    const res = doubleAge(obj)

    expect(res.name).toEqual('Bob');
    expect(res.age).toEqual(33);
    expect(res.gender).toEqual('male');

    expect(obj.name).toEqual('Bob');
    expect(obj.age).toEqual(33);
    expect(obj.gender).toEqual('male');

    expect(Object.keys(obj).length).toEqual(3);
  });

  test('正常系 2', () => {
    const obj = { name: 'Mary', age: 20, gender: 'female' }
    const res = doubleAge(obj)
    expect(res.name).toEqual('Mary');
    expect(res.age).toEqual(21);
    expect(res.gender).toEqual('female');

    expect(obj.name).toEqual('Mary');
    expect(obj.age).toEqual(21);
    expect(obj.gender).toEqual('female');

    expect(Object.keys(obj).length).toEqual(3);
    expect(Object.keys(res).length).toEqual(3);
  });
});

describe('setProcessedFlag', () => {
  test('正常系', () => {
    const obj = { name: 'Bob', age: 32, gender: 'male' }
    const res = setProcessedFlag(obj)

    expect(res.name).toEqual('Bob');
    expect(res.age).toEqual(32);
    expect(res.gender).toEqual('male');
    expect(res.processed).toEqual(true);

    expect(obj.name).toEqual('Bob');
    expect(obj.age).toEqual(32);
    expect(obj.gender).toEqual('male');
    expect(obj.processed).toEqual(undefined);

    expect(Object.keys(obj).length).toEqual(3);
    expect(Object.keys(res).length).toEqual(4);
  });

  test('正常系 2', () => {
    const obj = { a: 1, b: 2 }
    const res = setProcessedFlag(obj)
    expect(res.a).toEqual(1);
    expect(res.b).toEqual(2);
    expect(res.processed).toEqual(true);

    expect(obj.a).toEqual(1);
    expect(obj.b).toEqual(2);
    expect(obj.processed).toEqual(undefined);

    expect(Object.keys(res).length).toEqual(3);
    expect(Object.keys(obj).length).toEqual(2);
  });

  test('正常系 3', () => {
    const obj = {}
    const res = setProcessedFlag(obj)
    expect(res.processed).toEqual(true);

    expect(obj.processed).toEqual(undefined);

    expect(Object.keys(res).length).toEqual(1);
    expect(Object.keys(obj).length).toEqual(0);
  });
});

describe('assignNumber', () => {
  test('正常系', () => {
    for (let i = 0; i < 100; i++) {
      let res = assignNumber(['Bob', 'Mary', 'Ann', 'Mike'])

      Object.keys(res).forEach((key) => {
        expect(res[key]).toBeGreaterThanOrEqual(1);
        expect(res[key]).toBeLessThanOrEqual(10);
      });

      res = assignNumber(['paris', 'tokyo', 'newyork', 'london', 'osaka'])

      Object.keys(res).forEach((key) => {
        expect(res[key]).toBeGreaterThanOrEqual(1);
        expect(res[key]).toBeLessThanOrEqual(10);
      });
    }

    res = assignNumber([])

    expect(Object.keys(res).length).toEqual(0);
  });
});

describe('isDuplicate', () => {
  test('正常系', () => {
    expect(isDuplicate([1, 2, 3, 2])).toEqual(true);
    expect(isDuplicate([2, 2, 2, 2])).toEqual(true);
    expect(isDuplicate([1, 2, 2, 3])).toEqual(true);
    expect(isDuplicate([1, 2, 3])).toEqual(false);
    expect(isDuplicate([])).toEqual(false);
  });
});
