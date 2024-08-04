'use client'

import React, { useState } from 'react'
import data from '@/lib/words.json'
import WordSchema from './WordSchema'

const ChoiceWords = () => {
  const [words, setWords] = useState<Word[]>([])

  const optionWord = (word: Word) => {
    setWords((prev) => {
      if (prev.includes(word)) {
        return prev.filter((w) => w.id !== word.id)
      } else {
        return [...prev, word]
      }
    })
  }

  return (
    <table className="max-w-[786px] w-full border">
      <thead className="border">
        <tr>
          <td className="border p-3">Id</td>
          <td className="border p-3">Word</td>
          <td className="border p-3">Ru</td>
          <td className="border p-3">Pick</td>
        </tr>
      </thead>
      <tbody>
        {data.map((word) => (
          <WordSchema
            key={word.id}
            word={word}
            selected={words.some((w) => w.id === word.id)}
            optionWord={optionWord}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ChoiceWords
