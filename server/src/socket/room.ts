interface Word {
  id: number
  word: string
  ru: string
}

interface User {
  words: Word[]
}

class Room {
  private users: { [id: string]: User } = {}

  addUser(id: string) {
    if (!this.users[id]) {
      this.users[id] = { words: [] }
    }
  }

  removeUser(id: string) {
    delete this.users[id]
  }

  hasUser(id: string): boolean {
    return !!this.users[id]
  }

  isEmpty(): boolean {
    return Object.keys(this.users).length === 0
  }

  playersInRoom(): string[] {
    return Object.keys(this.users)
  }

  addWordToUser(userId: string, words: Word[]) {
    if (this.hasUser(userId)) {
      this.users[userId].words.push(...words)
    }
  }

  removeWordFromUser(userId: string, wordId: number) {
    if (this.hasUser(userId)) {
      this.users[userId].words = this.users[userId].words.filter((word) => word.id !== wordId)
    }
  }

  getWordsForUser(userId: string): Word[] {
    return this.hasUser(userId) ? this.users[userId].words : []
  }
}

export default Room
