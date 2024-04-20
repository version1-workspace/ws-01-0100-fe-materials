const { logMock } = require('../index');
const {
  main,
  Chicken,
  Dog,
  Duck
} = require('../../002_class/002_inheritance');

const origin = console.log;
afterEach(() => (console.log = origin));

describe('Chicken', () => {
  let outputs = [];
  beforeEach(() => {
    outputs = []
    console.log = logMock(outputs)
  });
  test('#bark', () => {
    const obj = new Chicken()
    obj.bark()

    expect(outputs[0]).toEqual('cock-a-doodle-do!')
  })

  test('#breeth', () => {
    const obj = new Chicken()
    obj.breeth()

    expect(outputs[0]).toEqual('breezing')
  })

  test('#who', () => {
    const obj = new Chicken()
    obj.who()

    expect(outputs[0]).toEqual('chicken')
  })
});

describe('Dog', () => {
  let outputs = [];
  beforeEach(() => {
    outputs = []
    console.log = logMock(outputs)
  });
  test('#bark', () => {
    const obj = new Dog()
    obj.bark()

    expect(outputs[0]).toEqual('wang, wang!')
  })

  test('#breeth', () => {
    const obj = new Dog()
    obj.breeth()

    expect(outputs[0]).toEqual('breezing')
  })

  test('#who', () => {
    const obj = new Dog()
    obj.who()

    expect(outputs[0]).toEqual('dog')
  })
});

describe('Duck', () => {
  let outputs = [];
  beforeEach(() => {
    outputs = []
    console.log = logMock(outputs)
  });
  test('#bark', () => {
    const obj = new Duck()
    obj.bark()

    expect(outputs[0]).toEqual('quack, quack!')
  })

  test('#breeth', () => {
    const obj = new Duck()
    obj.breeth()

    expect(outputs[0]).toEqual('breezing')
  })

  test('#who', () => {
    const obj = new Duck()
    obj.who()

    expect(outputs[0]).toEqual('duck')
  })
});

describe('main', () => {
  let outputs = [];
  beforeEach(() => {
    outputs = []
    console.log = logMock(outputs)
  });
  test('main', () => {
    expect(main()).toEqual(undefined);
  })
})
