/**
 *  3.1 二段にネストした配列を一段にして返す関数を実装してください。
 *
 *   [[1, 2], [3, 4], [5, 6]] => [1, 2, 3, 4, 5, 6]
 *
 */

function flatten(list) {
  let res = [];
  for (let i = 0; i < list.length; i++) {
    if (!Array.isArray(list[i])) {
      res.push(list[i]);
    } else {
      res = [...res, ...list[i]];
    }
  }

  return res;
}

/**
 *  3.2 id の配列を各要素がキーの値が true なオブジェクトに変換する関数を実装してください。
 *
 *  input
 *    [1, 3, 4, 5, 9]
 *
 *  output
 *  {
 *    1: true,
 *    3: true,
 *    4: true,
 *    5: true,
 *    9: true,
 *  }
 *
 */

function toMap(list) {
  let obj = {}
  for (let i = 0; i < list.length; i++) {
    obj[list[i]] = true;
  }

  return obj;
}

/**
 *  3.3 オブジェクトが引数で与えられる場合に、それぞれの key と value を順番に配列として返す関数を実装してください。
 *
 *  example:
 *    { a: 1, b: 2 } => ['a', 1, 'b', 2]
 *    {} => []
 *
 */

function toList(obj) {
  return Object.entries(obj).reduce((acc, item) => {
    return [...acc, ...item]
  }, [])
}

/**
 *  3.4 オブジェクトの配列のid だけを取り出して配列として返す関数を実装してください。
 *
 *  input:
 *    [
 *      { id: 1, category: 'kitchen', name: 'knife' },
 *      { id: 2, category: 'office', name: 'pen' },
 *      { id: 3, category: 'bath', name: 'soap' },
 *      { id: 4, category: 'kitchen', name: 'knife' },
 *      { id: 5, category: 'kitchen', name: 'knife' },
 *    ]
 *
 *  input:
 *    [1, 2, 3, 4, 5]
 *
 */

function ids(obj) {
  return Object.values(obj).map((it) => {
    return it.id
  }, [])
}

/**
 *  3.5 二つの配列をマージする関数を実装してください。
 *      ただし、重複する値はまとめた配列になるように実装してください。
 *
 *  example:
 *    [1, 2], [3, 4] => [1, 2, 3, 4]
 *    [1, 2, 3], [3, 4, 5] => [1, 2, 3, 4, 5]
 *    [3, 2, 1], [3, 4, 5] => [3, 2, 1, 4, 5]
 *    [3, 1, 2], [1, 2, 3] => [3, 1, 2]
 *    [3, 1, 2], [1, 2, 5] => [3, 1, 2, 5]
 *
 */

function merge(a, b) {
  let obj = {}
  a.forEach(it => obj[it] = true)
  return Object.values(b).reduce((acc, it) => {
    if (obj[it]) {
      return acc
    }

    obj[it] = true
    return [...acc, it]
  }, a)
}

/**
 *  3.6 二つの配列のどちらにも存在する要素を返す関数を実装してください。
 *      要素は全て数字とします。
 *
 *  example:
 *    [1, 2], [3, 4] => []
 *    [1, 2, 3], [3, 4, 5] => [3]
 *    [3, 1, 2], [1, 2, 3] => [3, 1, 2]
 *    [3, 1, 2], [1, 2, 5] => [1, 2]
 *
 */

function intersection(a, b) {
  return a.filter((aa) => b.find(it => it === aa))
}

/**
 *  3.7 二つのオブジェクトの配列をマージする関数を実装してください。
 *      id が同じだったらオブジェクトをマージしてください。
 *
 *  input:
 *    [{ id: 1, a: 1 }, { id: 2, b: 1 }], [{ id: 1, c: 1 }, {id: 3, d: 4}]
 *      => [[id: 1, a: 1, c: 1], { id: 2, b: 1 }, {id: 3, d: 4}]
 *
 *    [{ id: 1, a: 1 }, { id: 2, b: 1 }], [{ id: 3, c: 1 }, {id: 4, d: 4}]
 *      => [{ id: 1, a: 1 }, { id: 2, b: 1 }, { id: 3, c: 1 }, { id: 4, d: 4 }]
 *
 */

function mergeObjOfArray(a, b) {
  const obj = JSON.parse(JSON.stringify(a))
  for (let i = 0; i < b.length; i++) {
    const index = a.findIndex(it => it.id == b[i].id)
    if (index >= 0) {
      obj[index] = { ...a[index], ...b[i] }
    } else {
      obj.push(b[i])
    }
  }

  return obj
}

/**
 *  3.8 渡されたデータの合計(count プロパティの和) を求める関数を実装してください。
 *
 *  example:
 *    [{ count: 1 , a: [{ count: 2 }, { count: 3 }], b: { count: 4 }}, { count: 5 }]
 *      => 15
 *
 *    [{ count: 1 }, { count: 2 }, { count: 3 }]
 *      => 6
 *
 */

function sum(data) {
  let next = data
  let sum = 0

  const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val)

  while(Object.keys(next || []).length > 0) {
    const list = []
    Object.keys(next).forEach((key) => {
      const val = next[key]
      if (key === 'count') {
        sum += val
      }

      if (Array.isArray(val)) {
        val.forEach((it) => {
          if (it.count) {
            sum += it.count
          }

          if (Array.isArray(it) || isObject(it)) {
            list.push(it)
          }
        })
      }

      if (isObject(val)) {
        Object.keys(val).forEach(key => {
          const it = val[key]
          if (key === 'count') {
            sum += it
          }

          if (Array.isArray(it) || isObject(it)) {
            list.push(it)
          }
        })
      }
    })

    next = list
  }

  return sum
}

module.exports = {
  flatten,
  toMap,
  toList,
  ids,
  merge,
  intersection,
  mergeObjOfArray,
  sum
}
