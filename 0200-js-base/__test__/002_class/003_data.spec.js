const { logMock } = require('../index');
const {
  List,
  Stack,
  Queue
} = require('../../002_class/003_data');

const origin = console.log;
afterEach(() => (console.log = origin));

describe('List', () => {
  let outputs = [];
  beforeEach(() => {
    outputs = []
    console.log = logMock(outputs)
  });
  test('#size', () => {
    let obj = new List([1, 2, 3])
    expect(obj.size).toEqual(3)

    obj = new List([])
    expect(obj.size).toEqual(0)
  })

  test('#index', () => {
    let obj = new List([1, 2, 3])
    expect(obj.index(0)).toEqual(1)
    expect(obj.size).toEqual(3)

    expect(obj.index(10)).toEqual(undefined)
    expect(obj.size).toEqual(3)

    expect(obj.index(-1)).toEqual(undefined)
    expect(obj.size).toEqual(3)

    obj = new List([])
    expect(obj.index(0)).toEqual(undefined)
    expect(obj.size).toEqual(0)
  })

  test('#push', () => {
    let obj = new List([])
    obj.push(1)
    obj.push(2)
    obj.push(3)

    expect(obj.index(2)).toEqual(3)
    expect(obj.size).toEqual(3)
  })

  test('#remove', () => {
    let obj = new List([1, 2, 3])
    expect(obj.remove(1)).toEqual(2)

    expect(obj.index(0)).toEqual(1)
    expect(obj.index(1)).toEqual(3)
    expect(obj.size).toEqual(2)

    expect(obj.remove(3)).toEqual(undefined)

    expect(obj.index(0)).toEqual(1)
    expect(obj.index(1)).toEqual(3)
    expect(obj.size).toEqual(2)

    obj = new List([])
    expect(obj.remove(0)).toEqual(undefined)
    expect(obj.size).toEqual(0)
  })

  test('#pop', () => {
    let obj = new List([1, 2, 3])
    expect(obj.pop()).toEqual(3)
    expect(obj.size).toEqual(2)
    expect(obj.pop()).toEqual(2)
    expect(obj.size).toEqual(1)
    expect(obj.pop()).toEqual(1)
    expect(obj.pop()).toEqual(undefined)
    expect(obj.size).toEqual(0)
  })

  test('#shift', () => {
    let obj = new List([1, 2, 3])
    expect(obj.shift()).toEqual(1)
    expect(obj.size).toEqual(2)
    expect(obj.shift()).toEqual(2)
    expect(obj.size).toEqual(1)
    expect(obj.shift()).toEqual(3)
    expect(obj.shift()).toEqual(undefined)
    expect(obj.size).toEqual(0)
  })

  test('#find', () => {
    let obj = new List([1, 2, 3])

    expect(obj.find(2)).toEqual(2)
    expect(obj.size).toEqual(3)

    expect(obj.find(5)).toEqual(undefined)
    expect(obj.size).toEqual(3)

    obj = new List([])
    expect(obj.find(5)).toEqual(undefined)
    expect(obj.size).toEqual(0)
  })

  test('#findIndex', () => {
    let obj = new List([1, 2, 3])

    expect(obj.findIndex(2)).toEqual(1)
    expect(obj.size).toEqual(3)

    expect(obj.findIndex(5)).toEqual(-1)
    expect(obj.size).toEqual(3)

    obj = new List([])
    expect(obj.findIndex(5)).toEqual(-1)
    expect(obj.size).toEqual(0)
  })

  test('#filter', () => {
    let obj = new List([1, 2, 3, 2, 4])
    let list = obj.filter(2)

    expect(list.size).toEqual(3)
    expect(list.index(0)).toEqual(1)
    expect(list.index(1)).toEqual(3)
    expect(list.index(2)).toEqual(4)


    obj = new List([])
    list = obj.filter(0)
    expect(list.size).toEqual(0)
  })
});

describe('Stack', () => {
  test('#size', () => {
    let stack = new Stack()

    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.size).toEqual(3)
  })

  test('#push', () => {
    let stack = new Stack()

    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.size).toEqual(3)
  })

  test('#pop', () => {
    let stack = new Stack()

    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.pop()).toEqual(3)
    expect(stack.size).toEqual(2)
    expect(stack.pop()).toEqual(2)
    expect(stack.size).toEqual(1)
    expect(stack.pop()).toEqual(1)
    expect(stack.size).toEqual(0)
    expect(stack.pop()).toEqual(undefined)
    expect(stack.size).toEqual(0)
  })

  test('#peek', () => {
    let stack = new Stack()

    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.peek()).toEqual(3)
    expect(stack.size).toEqual(3)
    expect(stack.peek()).toEqual(3)
    expect(stack.size).toEqual(3)
  })
})

describe('Queue', () => {
  test('#size', () => {
    let queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.size).toEqual(3)
  })

  test('#enqueue', () => {
    let queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.size).toEqual(3)
  })

  test('#dequeue', () => {
    let queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.dequeue()).toEqual(1)
    expect(queue.size).toEqual(2)
    expect(queue.dequeue()).toEqual(2)
    expect(queue.size).toEqual(1)
    expect(queue.dequeue()).toEqual(3)
    expect(queue.size).toEqual(0)
    expect(queue.dequeue()).toEqual(undefined)
    expect(queue.size).toEqual(0)
  })

  test('#peek', () => {
    let queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.peek()).toEqual(1)
    expect(queue.size).toEqual(3)
  })
})
