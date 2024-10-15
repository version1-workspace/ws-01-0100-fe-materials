import {
  List,
  Stack,
  Queue,
} from '../practices/002_generics';

describe('List', () => {
  test('#data', () => {
    const l1 = new List([1, 2, 3]);
    expect(l1.data).toEqual([1, 2, 3]);

    const l2 = new List([]);
    expect(l2.data).toEqual([]);
  });

  test('#size', () => {
    const l1 = new List([1, 2, 3]);
    expect(l1.size).toEqual(3);

    const l2 = new List([]);
    expect(l2.size).toEqual(0);
  });

  test('#add', () => {
    const l1 = new List<number>([]);
    l1.add(1);
    l1.add(2);
    l1.add(3);
    expect(l1.data).toEqual([1, 2, 3]);

    const l2 = new List<string>([]);
    l2.add('a');
    l2.add('b');
    l2.add('c');
    expect(l2.data).toEqual(['a', 'b', 'c']);
  })

  test('#pop', () => {
    const l1 = new List<number>([1, 2, 3]);
    expect(l1.pop()).toEqual(3);
    l1.pop();
    l1.pop();
    expect(l1.pop()).toBeUndefined();

    const l2 = new List<string>(['a', 'b', 'c']);
    expect(l2.pop()).toEqual('c');
    l2.pop();
    l2.pop();
    expect(l2.pop()).toBeUndefined();
  })

  test('#remove', () => {
    const l1 = new List<number>([1, 2, 3]);
    expect(l1.remove(1)).toEqual(2);

    expect(l1.remove(-1)).toBeUndefined();
  })
});

describe('Stack', () => {
  test('#data', () => {
    const l1 = new Stack([1, 2, 3]);
    expect(l1.data).toEqual([1, 2, 3]);

    const l2 = new Stack([]);
    expect(l2.data).toEqual([]);
  });

  test('#size', () => {
    const l1 = new Stack([1, 2, 3]);
    expect(l1.size).toEqual(3);

    const l2 = new Stack([]);
    expect(l2.size).toEqual(0);
  })

  test('#push', () => {
    const l1 = new Stack([1, 2, 3]);
    l1.push(1);
    expect(l1.data).toEqual([1, 2, 3, 1]);

    const l2 = new Stack(['a', 'b', 'c']);
    l2.push('d');
    expect(l2.data).toEqual(['a', 'b', 'c', 'd']);
  });

  test('#pop', () => {
    const l1 = new Stack<number>([1, 2, 3]);
    expect(l1.pop()).toEqual(3);
    l1.pop();
    l1.pop();
    expect(l1.pop()).toBeUndefined();

    const l2 = new Stack<string>(['a', 'b', 'c']);
    expect(l2.pop()).toEqual('c');
    l2.pop();
    l2.pop();
    expect(l2.pop()).toBeUndefined();
  });

  test('#peak', () => {
    const l1 = new Stack<number>([1, 2, 3]);
    expect(l1.peak()).toEqual(3);

    const l2 = new Stack<string>(['a', 'b', 'c']);
    expect(l2.peak()).toEqual('c');

    const l3 = new Stack<string>([]);
    expect(l3.peak()).toBeUndefined();
  })
})

describe('Queue', () => {
  test('#data', () => {
    const l1 = new Queue([1, 2, 3]);
    expect(l1.data).toEqual([1, 2, 3]);

    const l2 = new Queue([]);
    expect(l2.data).toEqual([]);
  })

  test('#size', () => {
    const l1 = new Queue([1, 2, 3]);
    expect(l1.size).toEqual(3);

    const l2 = new Queue([]);
    expect(l2.size).toEqual(0);
  })

  test('#enqueue', () => {
    const l1 = new Queue([1, 2, 3]);
    l1.enqueue(1);
    expect(l1.data).toEqual([1, 2, 3, 1]);

    const l2 = new Queue(['a', 'b', 'c']);
    l2.enqueue('d');
    expect(l2.data).toEqual(['a', 'b', 'c', 'd']);
  })

  test('#dequeue', () => {
    const l1 = new Queue<number>([1, 2, 3]);
    expect(l1.dequeue()).toEqual(1);
    l1.dequeue();
    l1.dequeue();
    expect(l1.dequeue()).toBeUndefined();

    const l2 = new Queue<string>(['a', 'b', 'c']);
    expect(l2.dequeue()).toEqual('a');
    l2.dequeue();
    l2.dequeue();
    expect(l2.dequeue()).toBeUndefined();
  })

  test('#peak', () => {
    const l1 = new Queue<number>([1, 2, 3]);
    expect(l1.peak()).toEqual(1);

    const l2 = new Queue<string>(['a', 'b', 'c']);
    expect(l2.peak()).toEqual('a');

    const l3 = new Queue<string>([]);
    expect(l3.peak()).toBeUndefined();
  })
})
