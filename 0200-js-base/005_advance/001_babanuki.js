function getRandomIndex(max, flag = {}) {
  let list = []
  for (let i = 0; i < max; i++) {
    if (!flag[i]) {
       list.push(i)
    }
  }

  let index = Math.floor(Math.random() * list.length)

  return list[index]
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  static spade(value) {
    return new Card('spade', value)
  }

  static diamond(value) {
    return new Card('diamond', value)
  }

  static heart(value) {
    return new Card('heart', value)
  }

  static clover(value) {
    return new Card('clover', value)
  }

  static joker() {
    return new Card('joker', 0)
  }

  static prepare() {
    const deck = []
    for (let i = 1; i <= 13; i++) {
      deck.push(this.spade(i))
      deck.push(this.diamond(i))
      deck.push(this.heart(i))
      deck.push(this.clover(i))
    }
    deck.push(this.joker())

    return deck
  }

  get isJoker() {
    return this.suit === 'joker'
  }

  equal(card) {
    return card.suit === this.suit && card.value === this.value
  }

  toString() {
    switch(this.suit) {
      case 'spade':
        return `♠️ ${this.value}`
      case 'diamond':
        return `♦️ ${this.value}`
      case 'heart':
        return `♥️ ${this.value}`
      case 'clover':
        return `♣️ ${this.value}`
      case 'joker':
        return `JOKER`
    }

  }
}


class GameMaster {
  cards = []
  players = []
  rank = []
  turn = 1

  constructor(players) {
    this.players = players
  }

  prepare() {
    const deck = Card.prepare()
    let flag = {}
    while (true) {
      for (let i = 0; i < this.players.length; i++) {
        for (let j = 0; j < 2; j++) {
          const index = getRandomIndex(deck.length, flag)
          flag[index] = true

          this.players[i].assign(deck[index])
          if (Object.keys(flag).length >= deck.length) {
            return
          }
        }
      }
    }
  }

  firstDiscard() {
    for (let i = 0; i < this.players.length; i++) {
      const currentPlayer = this.players[i]
      console.log(
        this.turn,
        '[STATE]',
        `${currentPlayer.name}'s hands`,
        currentPlayer.hands.map(it => it.toString())
      )
      const discardCards = currentPlayer.discard()
      this.printDiscard(currentPlayer, discardCards)
      this.turn++
    }
  }

  run() {
    this.prepare()

    // first discard
    console.log('[First Discard]')
    this.firstDiscard()

    // draw
    console.log('[Game Start]')
    while(this.rank.length < this.players.length - 1) {
      for (let i = 0; i < this.players.length; i++) {
        const currentPlayer = this.players[i]
        if (currentPlayer.done) {
          continue
        }

        let nextPlayerIndex = (i + 1) % this.players.length
        while(this.players[nextPlayerIndex].done) {
          nextPlayerIndex = (nextPlayerIndex + 1) % this.players.length
        }

        const nextPlayer = this.players[nextPlayerIndex]

        this.printCurrentState(currentPlayer)
        const card = currentPlayer.draw(nextPlayer)
        this.printDraw(currentPlayer, nextPlayer, card)
        if(nextPlayer.done) {
          this.rank.push(nextPlayer)
          console.log('[!!!]', nextPlayer.name, ' Done')
        }

        const discardCards = currentPlayer.discard()
        this.printDiscard(currentPlayer, discardCards)

        if(currentPlayer.done) {
          this.rank.push(currentPlayer)
          console.log('[!!!]', currentPlayer.name, ' Done')
        }

        if(currentPlayer.onlyJoker) {
          console.log('[Game End]')
          console.log(currentPlayer.name, 'Lose')
          console.log('Rank', this.rank)
          return
        }

        this.turn++
      }
    }

    console.log('[Game End]')
    console.log('Rank', this.rank)
  }

  printCurrentState(currentPlayer) {
    console.log()
    console.log(this.turn, '===========')
    console.log(
      '[STATE]',
      `${currentPlayer.name}'s hands`,
      currentPlayer.hands.map(it => it.toString())
    )
  }

  printDiscard(currentPlayer, discardCards) {
    if (discardCards.length) {
      console.log(
        `${currentPlayer.name} discarded ${discardCards.map(it => it.toString())}`,
      )
      console.log(
        `${currentPlayer.name}'s hands after discard`,
        currentPlayer.hands.map(it => it.toString()),
        `count: ${currentPlayer.hands.length}`
      )
    }
  }

  printDraw(currentPlayer, nextPlayer, card) {
    console.log(
      '[DRAW]',
      `${currentPlayer.name} drew " ${card.toString()} " from ${nextPlayer.name}`
    )
  }

}

class Player {
  hands = []
  constructor(name) {
    this.name = name
  }

  get done() {
    return this.hands.length === 0
  }

  get onlyJoker() {
    return this.hands.length === 1 && this.hands[0].isJoker
  }

  assign(card) {
    this.hands.push(card)
  }

  discard() {
    let acc = {}
    const cards = []
    for (let i = 0; i < this.hands.length; i++) {
      const cursor = this.hands[i]
      if (acc[cursor.value] !== undefined) {
        const pairIndex = acc[cursor.value]
        cards.push(cursor)
        cards.push(this.hands[pairIndex])

        this.hands[i] = undefined
        this.hands[pairIndex] = undefined


        acc[cursor.value] = undefined
        continue
      }

      acc[cursor.value] = i
    }

    this.compact()

    return cards
  }

  draw(player) {
    const index = getRandomIndex(player.hands.length)
    const card = player.hands[index]
    this.assign(card)
    player.hands[index] = undefined
    player.compact()

    return card
  }

  compact() {
    this.hands = this.hands.filter(it => it)
  }
}

new GameMaster([
  new Player('Alice'),
  new Player('Bob'),
  new Player('Charlie'),
  new Player('David'),
]).run()

