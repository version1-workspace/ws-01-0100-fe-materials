/**
 *  3.1 二段にネストした配列を一段にして返す関数を実装してください。
 *
 *   [[1, 2], [3, 4], [5, 6]] => [1, 2, 3, 4, 5, 6]
 *
 */

function flatten(list) {
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
