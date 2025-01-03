/* 下記に指定した仕様のばば抜きアプリを作成して下さい。
 *
 *  参加プレイヤーは4名: Alice, Bob, Charlie, David
 *
 *  1. ジョーカーを含む52+1枚のトランプを用意し、プレイヤーに2枚ずつ配る
 *  2. プレイヤーは手札から同じ数字のカードを捨てることができる
 *  3. 手札のが配られた場合、全部のプレイヤーが手札から全てのペアのカードを捨てる。
 *  4. プレイヤーはAlice => Bob => Charlie => David の順番でカードを引く
 *  5. プレイヤーはカードを引いた後に、手札にペアがあるか確認し、あれば捨てる
 *
 *  [勝利条件]
 *  1. 手札がなくなったプレイヤーが勝利。最後の1人が残るまで続ける。
 *
 *  [敗北条件]
 *  1. 自分以外のプレイヤーが全て抜けた場合。
 *  2. ジョーカーのみの手札を持っている場合。その人を負けとして即時にゲームを終了する。
 *
 *  [実行例]
 *  ./docs/003_babanuki_example.md を参照してください。
 *
 *  [出力内容]
 *  実行例を参考に、ゲームの進行状況を Logger クラスを使って出力してください。
 *  出力はテストコードでも検証するので例にならって出力を行ってください。
 *
 */

import { getRandomIndex, Card, ILogger, IPlayer, Logger } from "../lib/babanuki";

export class Player implements IPlayer {
  hands: Card[] = [];
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  get done() {
    return this.hands.length === 0;
  }

  get onlyJoker() {
    return this.hands.length === 1 && this.hands[0].isJoker;
  }

  assign(card: Card) {
    this.hands.push(card);
  }

  discard() {
    let acc: Record<number, number | undefined> = {};
    const cards = [];
    const hands: (Card | undefined)[] = [...this.hands];
    for (let i = 0; i < this.hands.length; i++) {
      const cursor = this.hands[i];
      if (acc[cursor.value] !== undefined) {
        const pairIndex = acc[cursor.value];
        cards.push(this.hands[pairIndex!]);

        hands[i] = undefined;
        hands[pairIndex!] = undefined;

        acc[cursor.value] = undefined;
        continue;
      }

      acc[cursor.value] = i;
    }

    this.hands = hands.filter((it) => it) as Card[];

    return cards;
  }

  draw(player: Player) {
    const index = getRandomIndex(player.hands.length);
    const card = player.hands[index];
    this.assign(card);

    const hands: (Card | undefined)[] = [...player.hands];
    hands[index] = undefined;
    player.hands = hands.filter((it) => it) as Card[];

    return card;
  }
}

export class GameMaster {
  logger: ILogger;
  cards: Card[] = [];
  players: IPlayer[] = [];
  rank: IPlayer[] = [];
  turn = 1;

  constructor(logger: Logger, players: IPlayer[]) {
    this.logger = logger;
    this.players = players;
  }

  prepare() {
    const deck = Card.prepare();
    let flag: Record<number, boolean> = {};
    while (true) {
      for (let i = 0; i < this.players.length; i++) {
        for (let j = 0; j < 2; j++) {
          const index = getRandomIndex(deck.length, flag);
          flag[index] = true;

          this.players[i].assign(deck[index]);
          if (Object.keys(flag).length >= deck.length) {
            return;
          }
        }
      }
    }
  }

  firstDiscard() {
    for (let i = 0; i < this.players.length; i++) {
      const currentPlayer = this.players[i];
      this.logger.currentState(this.turn, currentPlayer);
      const discardCards = currentPlayer.discard();
      this.logger.discard(currentPlayer, discardCards);
      this.turn++;
    }
  }

  run() {
    this.prepare();

    // first discard
    this.logger.firstDiscard();
    this.firstDiscard();

    // draw
    this.logger.start();
    while (this.rank.length < this.players.length - 1) {
      for (let i = 0; i < this.players.length; i++) {
        const currentPlayer = this.players[i];
        if (currentPlayer.done) {
          continue;
        }

        let nextPlayerIndex = (i + 1) % this.players.length;
        while (this.players[nextPlayerIndex].done) {
          nextPlayerIndex = (nextPlayerIndex + 1) % this.players.length;
        }

        const nextPlayer = this.players[nextPlayerIndex];

        this.logger.currentState(this.turn, currentPlayer);
        const card = currentPlayer.draw(nextPlayer);
        this.logger.draw(currentPlayer, nextPlayer, card);
        if (nextPlayer.done) {
          this.rank.push(nextPlayer);
          this.logger.done(nextPlayer);
        }

        const discardCards = currentPlayer.discard();
        this.logger.discard(currentPlayer, discardCards);

        if (currentPlayer.done) {
          this.rank.push(currentPlayer);
          this.logger.done(currentPlayer);
        }

        if (currentPlayer.onlyJoker) {
          this.logger.end(currentPlayer, this.rank);
          return;
        }

        this.turn++;
      }
    }

    const player = this.players.find((it) => !it.done);
    if (player) {
      this.logger.end(player, this.rank);
    }
  }
}

export function run() {
  const gameMaster = new GameMaster(new Logger(), [
    new Player("Alice"),
    new Player("Bob"),
    new Player("Charlie"),
    new Player("David"),
  ]);
  gameMaster.run();
}
