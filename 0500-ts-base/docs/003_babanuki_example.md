
## 開始時

プレイヤーはカードが配られた状態で順番に手札からペアを捨てていきます。
その場合の出力例は以下の通りです。

```console
[First Discard]
1 [STATE] Alice's hands [
  '♥️ 8',  '♣️ 12', '♠️ 3',
  '♦️ 8',  '♦️ 5',  '♦️ 12',
  '♦️ 10', '♠️ 11', '♥️ 11',
  '♥️ 12', '♣️ 10', '♠️ 4',
  '♣️ 2',  '♠️ 6'
]
Alice discarded ♥️ 8,♣️ 12,♠️ 11,♦️ 10
Alice's hands after discard [ '♠️ 3', '♦️ 5', '♥️ 12', '♠️ 4', '♣️ 2', '♠️ 6' ] count: 6
2 [STATE] Bob's hands [
  '♥️ 3', '♣️ 6',   '♥️ 4',
  '♥️ 5', '♦️ 2',   '♠️ 5',
  '♠️ 9', 'JOKER', '♥️ 1',
  '♣️ 7', '♥️ 10',  '♦️ 11',
  '♦️ 3', '♠️ 13'
]
Bob discarded ♥️ 5,♥️ 3
Bob's hands after discard [
  '♣️ 6',   '♥️ 4',
  '♦️ 2',   '♠️ 9',
  'JOKER', '♥️ 1',
  '♣️ 7',   '♥️ 10',
  '♦️ 11',  '♠️ 13'
] count: 10
3 [STATE] Charlie's hands [
  '♥️ 9',  '♦️ 7', '♥️ 7',
  '♥️ 13', '♠️ 8', '♦️ 1',
  '♦️ 13', '♠️ 7', '♠️ 10',
  '♣️ 5',  '♣️ 9', '♠️ 1',
  '♣️ 11'
]
Charlie discarded ♦️ 7,♥️ 13,♥️ 9,♦️ 1
Charlie's hands after discard [ '♠️ 8', '♠️ 7', '♠️ 10', '♣️ 5', '♣️ 11' ] count: 5
4 [STATE] David's hands [
  '♦️ 6',  '♥️ 2', '♣️ 3',
  '♠️ 12', '♦️ 4', '♣️ 8',
  '♦️ 9',  '♣️ 4', '♣️ 13',
  '♠️ 2',  '♣️ 1', '♥️ 6'
]
David discarded ♦️ 4,♥️ 2,♦️ 6
David's hands after discard [ '♣️ 3', '♠️ 12', '♣️ 8', '♦️ 9', '♣️ 13', '♣️ 1' ] count: 6
```

## ゲーム中

最初にゲームを開始するメッセージを表示し、隣のプレイヤーからカードを取ってペアを作る過程を下記のように表示して下さい。
(ペアがあった場合とない場合で表示が違うので注意してください。)

```console
[Game Start]
5 ===========
[STATE] Alice's hands [ '♦️ 11', '♦️ 6', '♠️ 1', '♥️ 8', '♥️ 10', '♠️ 4' ]
[DRAW] Alice drew " ♥️ 11 " from Bob
Alice discarded ♦️ 11
Alice's hands after discard [ '♦️ 6', '♠️ 1', '♥️ 8', '♥️ 10', '♠️ 4' ] count: 5
6 ===========
[STATE] Bob's hands [ '♥️ 5', '♦️ 1', 'JOKER', '♥️ 2', '♦️ 4' ]
[DRAW] Bob drew " ♣️ 6 " from Charlie
7 ===========
[STATE] Charlie's hands [ '♦️ 5', '♣️ 4', '♣️ 11', '♠️ 9', '♠️ 2', '♠️ 7' ]
[DRAW] Charlie drew " ♠️ 11 " from David
Charlie discarded ♣️ 11
Charlie's hands after discard [ '♦️ 5', '♣️ 4', '♠️ 9', '♠️ 2', '♠️ 7' ] count: 5
8 ===========
[STATE] David's hands [ '♦️ 8', '♥️ 4', '♦️ 7', '♥️ 9', '♦️ 10' ]
[DRAW] David drew " ♥️ 10 " from Alice
David discarded ♦️ 10
David's hands after discard [ '♦️ 8', '♥️ 4', '♦️ 7', '♥️ 9' ] count: 4
9 ===========
[STATE] Alice's hands [ '♦️ 6', '♠️ 1', '♥️ 8', '♠️ 4' ]
[DRAW] Alice drew " ♣️ 6 " from Bob
Alice discarded ♦️ 6
Alice's hands after discard [ '♠️ 1', '♥️ 8', '♠️ 4' ] count: 3

...

```


##  手札がなくなった場合

手札がなくなったプレイヤーがいる場合、そのプレイヤーがゲームから抜けたことを表示して下さい。
「XXX Done」と表示してください。

```console
31 ===========
[STATE] David's hands [ '♦️ 4' ]
[DRAW] David drew " ♠️ 4 " from Charlie
David discarded ♦️ 4
David's hands after discard [] count: 0
[!!!] David  Done
```

## ゲーム終了時

```console
[Game End]
Charlie Lose
Rank [
  Player { hands: [], name: 'Bob' },
  Player { hands: [], name: 'Alice' },
  Player { hands: [], name: 'David' }
]
```

「XXX Lose」の部分はそのゲームの敗者の名前を表示します。
ゲーム終了時点（全員が抜けるか、ジョーカー一枚残りでゲームが終了した場合）ですでにゲームから抜けているメンバーがいればゲームを抜けた順にメンバーを表示して下さい。

