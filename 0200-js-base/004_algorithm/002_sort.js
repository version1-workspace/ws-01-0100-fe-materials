/**
 *  2.2.1 バブルソート
 *
 *  バブルソートを実装してください。(入力は数値のみ)
 *
 *  example:
 *    [1, 3, 2, 4, 5] => [1, 2, 3, 4, 5]
 *    [5, 3, 2, 1] => [1, 2, 3, 5]
 */

function bubbleSort (array) {
  for (let i = 1; i < array.length; i++) {
    for (let j = array.length - 1; j >= 0; j--) {
      if (array[j-1] > array[j]) {
        tmp = array[j-1]
        array[j-1] = array[j]
        array[j] = tmp
      }
    }
  }
  return array
}

/**
 *  2.2.2 挿入ソート
 *
 *  挿入ソートを実装してください。(入力は数値のみ)
 *
 *  example:
 *    [1, 3, 2, 4, 5] => [1, 2, 3, 4, 5]
 *    [5, 3, 2, 1] => [1, 2, 3, 5]
 */

function insertSort (array) {
  for (let i = 1; i < array.length; i++) {
    let j = i
    while ((j > 0) && (array[j-1] > array[j])) {
      tmp = array[j-1]
      array[j-1] = array[j]
      array[j] = tmp

      j--
    }
  }
  return array
}

/**
 *  2.2.3 マージソート
 *
 *  マージソートを実装してください。(入力は数値のみ)
 *
 *  example:
 *    [1, 3, 2, 4, 5] => [1, 2, 3, 4, 5]
 *    [5, 3, 2, 1] => [1, 2, 3, 5]
 */

function mergeSort (arr) {
  if (arr.length <= 1) {
    // return once we hit an array with a single item
    return arr
  }

  const middle = Math.floor(arr.length / 2) // get the middle item of the array rounded down
  const left = arr.slice(0, middle) // items on the left side
  const right = arr.slice(middle) // items on the right side

  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

function merge(left, right) {
  let result = []
  let indexLeft = 0
  let indexRight = 0

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft])
      indexLeft++
    } else {
      result.push(right[indexRight])
      indexRight++
    }
  }

  const _result = result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
  return _result
}

/**
 *  2.2.4 クイックソート
 *
 *  クイックソートを実装してください。(入力は数値のみ)
 *
 *  example:
 *    [1, 3, 2, 4, 5] => [1, 2, 3, 4, 5]
 *    [5, 3, 2, 1] => [1, 2, 3, 5]
 */

function quickSort (a, start = 0, end = (a.length -1)) {
  const pivotIndex = Math.floor((start + end) / 2);
  const pivot = a[pivotIndex];
  let left = start;
  let right = end;

  while (true) {
    while (a[left] < pivot) {
      left++;
    }

    while (pivot < a[right]) {
      right--;
    }

    if (right <= left) {
      break;
    }

    var tmp = a[left];
    a[left] = a[right];
    a[right] = tmp;
    left++;
    right--;
  }

  if (start < left - 1) {
    quickSort(a, start, left - 1);
  }

  if (right + 1 < end) {
    quickSort(a, right + 1, end);
  }

  return a;
};

module.exports = {
  bubbleSort,
  insertSort,
  mergeSort,
  quickSort
}
