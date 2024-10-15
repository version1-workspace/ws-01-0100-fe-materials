

## 初回ドロー

```console
[First Discard]
1 [STATE] Alice's hands [
  '♣️ 3',  '♥️ 7', '♣️ 4',
  '♠️ 2',  '♥️ 5', '♥️ 8',
  '♦️ 10', '♦️ 9', '♦️ 6',
  '♥️ 3',  '♠️ 1', '♠️ 6',
  '♥️ 12', '♣️ 7'
]
Alice discarded ♣️ 3,♦️ 6,♥️ 7
Alice's hands after discard [
  '♣️ 4',  '♠️ 2',
  '♥️ 5',  '♥️ 8',
  '♦️ 10', '♦️ 9',
  '♠️ 1',  '♥️ 12'
] count: 8
2 [STATE] Bob's hands [
  '♣️ 8',  '♥️ 1',  '♠️ 3',
  '♣️ 1',  '♦️ 7',  'JOKER',
  '♦️ 8',  '♥️ 4',  '♥️ 6',
  '♥️ 2',  '♦️ 11', '♣️ 6',
  '♥️ 13', '♣️ 13'
]
Bob discarded ♥️ 1,♣️ 8,♥️ 6,♥️ 13
Bob's hands after discard [ '♠️ 3', '♦️ 7', 'JOKER', '♥️ 4', '♥️ 2', '♦️ 11' ] count: 6
3 [STATE] Charlie's hands [
  '♦️ 2',  '♥️ 10', '♠️ 12',
  '♠️ 10', '♦️ 4',  '♥️ 11',
  '♠️ 7',  '♠️ 5',  '♣️ 11',
  '♠️ 13', '♦️ 1',  '♦️ 5',
  '♠️ 11'
]
Charlie discarded ♥️ 10,♥️ 11,♠️ 5
Charlie's hands after discard [
  '♦️ 2',  '♠️ 12',
  '♦️ 4',  '♠️ 7',
  '♠️ 13', '♦️ 1',
  '♠️ 11'
] count: 7
4 [STATE] David's hands [
  '♣️ 12', '♠️ 4',  '♠️ 9',
  '♣️ 9',  '♣️ 2',  '♣️ 5',
  '♦️ 3',  '♣️ 10', '♥️ 9',
  '♦️ 13', '♠️ 8',  '♦️ 12'
]
David discarded ♠️ 9,♣️ 12
David's hands after discard [
  '♠️ 4',  '♣️ 2',
  '♣️ 5',  '♦️ 3',
  '♣️ 10', '♥️ 9',
  '♦️ 13', '♠️ 8'
] count: 8
```

## ゲーム開始後

```console
[Game Start]
5 ===========
[STATE] Alice's hands [
  '♣️ 4',  '♠️ 2',
  '♥️ 5',  '♥️ 8',
  '♦️ 10', '♦️ 9',
  '♠️ 1',  '♥️ 12'
]
[DRAW] Alice drew " ♦️ 7 " from Bob
6 ===========
[STATE] Bob's hands [ '♠️ 3', 'JOKER', '♥️ 4', '♥️ 2', '♦️ 11' ]
[DRAW] Bob drew " ♠️ 7 " from Charlie
7 ===========
[STATE] Charlie's hands [ '♦️ 2', '♠️ 12', '♦️ 4', '♠️ 13', '♦️ 1', '♠️ 11' ]
[DRAW] Charlie drew " ♦️ 13 " from David
Charlie discarded ♠️ 13
Charlie's hands after discard [ '♦️ 2', '♠️ 12', '♦️ 4', '♦️ 1', '♠️ 11' ] count: 5
8 ===========
[STATE] David's hands [
  '♠️ 4',  '♣️ 2',
  '♣️ 5',  '♦️ 3',
  '♣️ 10', '♥️ 9',
  '♠️ 8'
]
[DRAW] David drew " ♠️ 2 " from Alice
David discarded ♣️ 2
David's hands after discard [ '♠️ 4', '♣️ 5', '♦️ 3', '♣️ 10', '♥️ 9', '♠️ 8' ] count: 6
9 ===========
[STATE] Alice's hands [
  '♣️ 4',  '♥️ 5',
  '♥️ 8',  '♦️ 10',
  '♦️ 9',  '♠️ 1',
  '♥️ 12', '♦️ 7'
]
[DRAW] Alice drew " ♥️ 4 " from Bob
Alice discarded ♣️ 4
Alice's hands after discard [
  '♥️ 5',  '♥️ 8',
  '♦️ 10', '♦️ 9',
  '♠️ 1',  '♥️ 12',
  '♦️ 7'
] count: 7
10 ===========
[STATE] Bob's hands [ '♠️ 3', 'JOKER', '♥️ 2', '♦️ 11', '♠️ 7' ]
[DRAW] Bob drew " ♦️ 1 " from Charlie
11 ===========
[STATE] Charlie's hands [ '♦️ 2', '♠️ 12', '♦️ 4', '♠️ 11' ]
[DRAW] Charlie drew " ♣️ 10 " from David
12 ===========
[STATE] David's hands [ '♠️ 4', '♣️ 5', '♦️ 3', '♥️ 9', '♠️ 8' ]
[DRAW] David drew " ♥️ 8 " from Alice
David discarded ♠️ 8
David's hands after discard [ '♠️ 4', '♣️ 5', '♦️ 3', '♥️ 9' ] count: 4
13 ===========
[STATE] Alice's hands [ '♥️ 5', '♦️ 10', '♦️ 9', '♠️ 1', '♥️ 12', '♦️ 7' ]
[DRAW] Alice drew " ♦️ 11 " from Bob
14 ===========
[STATE] Bob's hands [ '♠️ 3', 'JOKER', '♥️ 2', '♠️ 7', '♦️ 1' ]
[DRAW] Bob drew " ♠️ 11 " from Charlie
15 ===========
[STATE] Charlie's hands [ '♦️ 2', '♠️ 12', '♦️ 4', '♣️ 10' ]
[DRAW] Charlie drew " ♠️ 4 " from David
Charlie discarded ♦️ 4
Charlie's hands after discard [ '♦️ 2', '♠️ 12', '♣️ 10' ] count: 3
16 ===========
[STATE] David's hands [ '♣️ 5', '♦️ 3', '♥️ 9' ]
[DRAW] David drew " ♦️ 10 " from Alice
17 ===========
[STATE] Alice's hands [ '♥️ 5', '♦️ 9', '♠️ 1', '♥️ 12', '♦️ 7', '♦️ 11' ]
[DRAW] Alice drew " ♥️ 2 " from Bob
18 ===========
[STATE] Bob's hands [ '♠️ 3', 'JOKER', '♠️ 7', '♦️ 1', '♠️ 11' ]
[DRAW] Bob drew " ♠️ 12 " from Charlie
19 ===========
[STATE] Charlie's hands [ '♦️ 2', '♣️ 10' ]
[DRAW] Charlie drew " ♣️ 5 " from David
20 ===========
[STATE] David's hands [ '♦️ 3', '♥️ 9', '♦️ 10' ]
[DRAW] David drew " ♦️ 9 " from Alice
David discarded ♥️ 9
David's hands after discard [ '♦️ 3', '♦️ 10' ] count: 2
21 ===========
[STATE] Alice's hands [ '♥️ 5', '♠️ 1', '♥️ 12', '♦️ 7', '♦️ 11', '♥️ 2' ]
[DRAW] Alice drew " ♠️ 3 " from Bob
22 ===========
[STATE] Bob's hands [ 'JOKER', '♠️ 7', '♦️ 1', '♠️ 11', '♠️ 12' ]
[DRAW] Bob drew " ♦️ 2 " from Charlie
23 ===========
[STATE] Charlie's hands [ '♣️ 10', '♣️ 5' ]
[DRAW] Charlie drew " ♦️ 3 " from David
24 ===========
[STATE] David's hands [ '♦️ 10' ]
[DRAW] David drew " ♠️ 1 " from Alice
25 ===========
[STATE] Alice's hands [ '♥️ 5', '♥️ 12', '♦️ 7', '♦️ 11', '♥️ 2', '♠️ 3' ]
[DRAW] Alice drew " JOKER " from Bob
26 ===========
[STATE] Bob's hands [ '♠️ 7', '♦️ 1', '♠️ 11', '♠️ 12', '♦️ 2' ]
[DRAW] Bob drew " ♣️ 10 " from Charlie
27 ===========
[STATE] Charlie's hands [ '♣️ 5', '♦️ 3' ]
[DRAW] Charlie drew " ♠️ 1 " from David
28 ===========
[STATE] David's hands [ '♦️ 10' ]
[DRAW] David drew " ♥️ 2 " from Alice
29 ===========
[STATE] Alice's hands [ '♥️ 5', '♥️ 12', '♦️ 7', '♦️ 11', '♠️ 3', 'JOKER' ]
[DRAW] Alice drew " ♦️ 2 " from Bob
30 ===========
[STATE] Bob's hands [ '♠️ 7', '♦️ 1', '♠️ 11', '♠️ 12', '♣️ 10' ]
[DRAW] Bob drew " ♦️ 3 " from Charlie
31 ===========
[STATE] Charlie's hands [ '♣️ 5', '♠️ 1' ]
[DRAW] Charlie drew " ♥️ 2 " from David
32 ===========
[STATE] David's hands [ '♦️ 10' ]
[DRAW] David drew " ♥️ 5 " from Alice
33 ===========
[STATE] Alice's hands [ '♥️ 12', '♦️ 7', '♦️ 11', '♠️ 3', 'JOKER', '♦️ 2' ]
[DRAW] Alice drew " ♦️ 1 " from Bob
34 ===========
[STATE] Bob's hands [ '♠️ 7', '♠️ 11', '♠️ 12', '♣️ 10', '♦️ 3' ]
[DRAW] Bob drew " ♣️ 5 " from Charlie
35 ===========
[STATE] Charlie's hands [ '♠️ 1', '♥️ 2' ]
[DRAW] Charlie drew " ♥️ 5 " from David
36 ===========
[STATE] David's hands [ '♦️ 10' ]
[DRAW] David drew " ♦️ 1 " from Alice
37 ===========
[STATE] Alice's hands [ '♥️ 12', '♦️ 7', '♦️ 11', '♠️ 3', 'JOKER', '♦️ 2' ]
[DRAW] Alice drew " ♠️ 12 " from Bob
Alice discarded ♥️ 12
Alice's hands after discard [ '♦️ 7', '♦️ 11', '♠️ 3', 'JOKER', '♦️ 2' ] count: 5
38 ===========
[STATE] Bob's hands [ '♠️ 7', '♠️ 11', '♣️ 10', '♦️ 3', '♣️ 5' ]
[DRAW] Bob drew " ♥️ 2 " from Charlie
39 ===========
[STATE] Charlie's hands [ '♠️ 1', '♥️ 5' ]
[DRAW] Charlie drew " ♦️ 10 " from David
40 ===========
[STATE] David's hands [ '♦️ 1' ]
[DRAW] David drew " ♦️ 2 " from Alice
41 ===========
[STATE] Alice's hands [ '♦️ 7', '♦️ 11', '♠️ 3', 'JOKER' ]
[DRAW] Alice drew " ♠️ 11 " from Bob
Alice discarded ♦️ 11
Alice's hands after discard [ '♦️ 7', '♠️ 3', 'JOKER' ] count: 3
42 ===========
[STATE] Bob's hands [ '♠️ 7', '♣️ 10', '♦️ 3', '♣️ 5', '♥️ 2' ]
[DRAW] Bob drew " ♦️ 10 " from Charlie
Bob discarded ♣️ 10
Bob's hands after discard [ '♠️ 7', '♦️ 3', '♣️ 5', '♥️ 2' ] count: 4
43 ===========
[STATE] Charlie's hands [ '♠️ 1', '♥️ 5' ]
[DRAW] Charlie drew " ♦️ 1 " from David
Charlie discarded ♠️ 1
Charlie's hands after discard [ '♥️ 5' ] count: 1
44 ===========
[STATE] David's hands [ '♦️ 2' ]
[DRAW] David drew " JOKER " from Alice
45 ===========
[STATE] Alice's hands [ '♦️ 7', '♠️ 3' ]
[DRAW] Alice drew " ♣️ 5 " from Bob
46 ===========
[STATE] Bob's hands [ '♠️ 7', '♦️ 3', '♥️ 2' ]
[DRAW] Bob drew " ♥️ 5 " from Charlie
[!!!] Charlie  Done
47 ===========
[STATE] David's hands [ '♦️ 2', 'JOKER' ]
[DRAW] David drew " ♣️ 5 " from Alice
48 ===========
[STATE] Alice's hands [ '♦️ 7', '♠️ 3' ]
[DRAW] Alice drew " ♥️ 2 " from Bob
49 ===========
[STATE] Bob's hands [ '♠️ 7', '♦️ 3', '♥️ 5' ]
[DRAW] Bob drew " ♦️ 2 " from David
50 ===========
[STATE] David's hands [ 'JOKER', '♣️ 5' ]
[DRAW] David drew " ♦️ 7 " from Alice
51 ===========
[STATE] Alice's hands [ '♠️ 3', '♥️ 2' ]
[DRAW] Alice drew " ♠️ 7 " from Bob
52 ===========
[STATE] Bob's hands [ '♦️ 3', '♥️ 5', '♦️ 2' ]
[DRAW] Bob drew " ♣️ 5 " from David
Bob discarded ♥️ 5
Bob's hands after discard [ '♦️ 3', '♦️ 2' ] count: 2
53 ===========
[STATE] David's hands [ 'JOKER', '♦️ 7' ]
[DRAW] David drew " ♠️ 7 " from Alice
David discarded ♦️ 7
David's hands after discard [ 'JOKER' ] count: 1
```

## ゲームを抜ける場合

```console
46 ===========
[STATE] Bob's hands [ '♠️ 7', '♦️ 3', '♥️ 2' ]
[DRAW] Bob drew " ♥️ 5 " from Charlie
[!!!] Charlie  Done
```

## ゲーム終了後


### 全員抜けて終わった場合

```console
[Game End]
Charlie Lose
Rank [
  Player { hands: [], name: 'Bob' },
  Player { hands: [], name: 'Alice' },
  Player { hands: [], name: 'David' }
]
```

### JOKER で負けたプレイヤーがいる場合

```console
[Game End]
David Lose
Rank [ Player { hands: [], name: 'Charlie' } ]
```
