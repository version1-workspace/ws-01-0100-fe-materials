const { logMock } = require('../index');
const {
  Person,
  main,
} = require('../../002_class/001_class');

const origin = console.log;
afterEach(() => (console.log = origin));

describe('Person', () => {
  let outputs = [];
  beforeEach(() => {
    outputs = []
    console.log = logMock(outputs)
  });
  test('.describe', () => {
    Person.describe()

    expect(outputs[0]).toEqual('This is a Person class');
  });

  test('#sayHi', () => {
    const person = new Person()
    person.sayHi()

    expect(outputs[0]).toEqual('Hi!!');
  });

  test('constructor', () => {
    let person = new Person()
    expect(person.name).toEqual('');
    expect(person.age).toEqual(0);
    expect(person.bio).toEqual('');

    const name = 'ichiro'
    const age = 20
    const bio = 'lorem ipsum'
    person = new Person(name, age, bio)
    expect(person.name).toEqual('ichiro');
    expect(person.age).toEqual(20);
    expect(person.bio).toEqual('lorem ipsum');
  })

  test('#isUnderage', () => {
    let person = new Person('ichiro', 19, '')
    expect(person.isUnderage).toEqual(true);
    person = new Person('ichiro', 20, '')
    expect(person.isUnderage).toEqual(false);
    person = new Person()
    expect(person.isUnderage).toEqual(true);
  })

  test('#toString', () => {
    const name = 'ichiro'
    const age = 20
    const bio = 'lorem ipsum'
    const person = new Person(name, age, bio)

    expect(person.toString()).toEqual('name: ichiro, age: 20, bio: lorem ipsum')
  })
});


describe('main', () => {
  let outputs = [];
  beforeEach(() => {
    outputs = []
    console.log = logMock(outputs)
  });
  test('main', () => {
    expect(main()).toEqual('name: ichiro, age: 54, bio: I like to play basketball');
  })
})
