type Words = Word[]
interface Word {
  id: number
  word: string
  ru: string
}

interface Hero {
  hp: number
  mp: number
}

interface PlayerStuff {
  words: Words
  hero?: Hero
}

class Room {
  players: { [key: string]: PlayerStuff } = {}

  constructor(id: string) {
    this.players[id] = { words: [] }
  }

  addPlayer(id: string) {
    this.players[id] = { words: [] }
  }

  addWords(id: string, words: Words) {
    this.players[id].words.push(...words)
  }

  remove(id: string) {
    delete this.players[id]
  }

  isEmpty(): boolean {
    return Object.keys(this.players).length === 0
  }

  playersInRoom(): string[] {
    return Object.keys(this.players)
  }
}

export default Room
