'use client'

import React from 'react'
import data from '@/lib/words.json'
import WordSchema from './WordSchema'
import { useWords } from '@/store/useWords'

const ChoiceWords = () => {
  const { words, toggle } = useWords()

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
            toggle={toggle}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ChoiceWords
