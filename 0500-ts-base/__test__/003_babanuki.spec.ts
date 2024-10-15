import { Player, GameMaster } from "../practices/003_babanuki";
import { IPlayer, ILogger, Card, Suit } from "../lib/babanuki";


class LoggerStub implements ILogger {
  _firstDiscard: number = 0;
  _start: number = 0;
  _end?: [Player, Player[]];
  _done: Player[] = [];
  _currentState: [number, Player][] = [];
  _discard: [Player, Card[]][] = [];
  _draw: [Player, Player, Card][] = [];

  firstDiscard() {
    this._firstDiscard++;
  }

  start() {
    this._start++;
  }

  end(loser: Player, rank: Player[]) {
    this._end = [loser, rank];
  }

  done(player: Player) {
    this._done.push(player);
  }

  currentState(turn: number, player: Player) {
    this._currentState.push([turn, player]);
  }

  discard(player: Player, cards: Card[]) {
    this._discard.push([player, cards]);
  }

  draw(from: Player, to: Player, card: Card) {
    this._draw.push([from, to, card]);
  }
}

describe("GameMaster", () => {
  let outputs: string[] = [];
  test(".run", () => {
    const loggerStub = new LoggerStub();
    const gm = new GameMaster(
      loggerStub,
      [
        new Player("A"),
        new Player("B"),
        new Player("C"),
        new Player("D"),
      ],
    );
    gm.run();

    expect(loggerStub._firstDiscard).toEqual(1);
    expect(loggerStub._start).toEqual(1);
    expect(loggerStub._end?.length).toEqual(2);

    expect(loggerStub._done.length).toBeGreaterThanOrEqual(0)
    expect(loggerStub._done.length).toBeLessThan(5);
    expect(loggerStub._currentState.length).toBeGreaterThan(1);
    expect(loggerStub._discard.length).toBeGreaterThan(1);
    expect(loggerStub._draw.length).toBeGreaterThan(1);
    if (loggerStub._end) {
      const [loser, rank] = loggerStub._end;
      const names = rank.map((it) => it.name);

      // rank count should match done call count.
      expect(loser.done).toEqual(false);
      expect(rank.length).toEqual(loggerStub._done.length);
      expect(names.includes(loser.name)).toBeFalsy();
    }
  });
});
