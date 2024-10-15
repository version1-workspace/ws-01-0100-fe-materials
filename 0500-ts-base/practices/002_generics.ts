/* 2. 下記にそれぞれList、Stack、Queue クラスを実装して下さい
*
*     また
*
*       List => IList,
*       Stack => IStack,
*       Queue => IQueue
*
*     というインターフェースを実装して下さい。
*
*/

interface IList<T> {
  data: T[];
  size: number;
  add: (value: T) => void;
  pop: () => T | undefined;
  remove: (index: number) => T | undefined;
}

interface IStack<T> {
  data: T[];
  size: number;
  push: (value: T) => void;
  pop: () => T | undefined;
  peak: () => T | undefined;
}

interface IQueue<T> {
  data: T[];
  size: number;
  enqueue: (value: T) => void;
  dequeue: () => T | undefined;
  peak: () => T | undefined;
}

// ↓↓↓ 以下に実装してください ↓↓↓

