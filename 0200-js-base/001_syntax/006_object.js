/**
 *  6.1 下記データを持ったオブジェクトを返す関数を実装してください。
 *
 *  name: 'Bob'
 *  age: 32
 *  gender: 'male'
 *
 */

function getPersonObject() {
  return {
    name: 'Bob',
    age: 32,
    gender: 'male',
  };
}

/**
 *  6.2 与えられたオブジェクトのkeyを一つずつ表示する関数を実装してください。
 *
 * input:
 *  name: 'Bob'
 *  age: 32
 *  gender: 'male'
 * output:
 *  name
 *  age
 *  gender
 *
 */

function keys(obj) {
  Object.keys(obj).forEach(key => console.log(key));
}

/**
 *  6.3 与えられたオブジェクトのvalueを一つずつ表示する関数を実装してください。
 *
 * input:
 *  name: 'Bob'
 *  age: 32
 *  gender: 'male'
 * output:
 *  Bob
 *  32
 *  male
 *
 */

function values(obj) {
  Object.values(obj).forEach(value => console.log(value));
}

/**
 *  6.4 下記オブジェクトが引数で与えられる場合に、
 *      オブジェクトの年齢を+1した値で書き換えそれを返却する関数を実装してください
 *
 *  {
 *    name: [任意の文字列]
 *    age: [任意の整数]
 *    gender: [任意の文字列]
 *  }
 *
 */

function doubleAge(person) {
  person.age = person.age + 1;
  return person;
}

/**
 *  6.5 ランダムなオブジェクトが引数で与えられる場合に、
 *      引数に変更を加えずに、processedというキーにtrueを追加したオブジェクトを返却する関数を実装してください。
 *
 *  example:
 *    { a: 1, b: 2 } => { a: 1, b: 2, processed: true }
 *    {} => { processed: true }
 *    { alpha: true, beta: true } => { alpha: true, beta: true, processed: true }
 *
 */

function setProcessedFlag(obj) {
  return {
    ...obj,
    processed: true
  };
}

/**
 *  6.6 下記引数で渡される配列にランダムな1 ~ 10の数字を割り振り、オブジェクトとして返す
 *      関数を実装してください
 *
 *   input:
 *    [
 *      'Bob',
 *      'Mary',
 *      'Ann',
 *      'Mike'
 *    ]
 *
 *   output:
 *     {
 *       Bob: [Random Number],
 *       Mary: [Random Number],
 *       Ann: [Random Number],
 *       Mike: [Random Number]
 *     }
 *
 */

function assignNumber(persons) {
  let obj = {};
  for (let i = 0; i < persons.length; i++) {
    const rand = Math.floor((Math.random() * 10) + 1);
    obj[persons[i]] = rand;
  }
  return obj;
}

/**
 *  6.7 配列に重複した要素があれば、true、そうでなければfalseを返す関数を実装してください
 *      但し、オブジェクトを使って実装すること
 *
 *  example:
 *    [1, 2, 3], 1 => false
 *    [1, 2, 2, 3], 5 => true
 *    [] => false
 *
 */

function isDuplicate(array) {
  numMap = {};
  for (let i = 0; i < array.length; i++) {
    if (numMap[array[i]]) {
      return true;
    }
    numMap[array[i]] = true;
  }
  return false;
}

module.exports = {
  getPersonObject,
  keys,
  values,
  doubleAge,
  setProcessedFlag,
  assignNumber,
  isDuplicate
}
