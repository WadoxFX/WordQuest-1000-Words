import clsx from 'clsx'
import React from 'react'
import { Button } from '../ui'

interface WordSchemaProps {
  word: Word
  selected: boolean
  toggle: (word: Word) => void
}

const WordSchema: React.FC<WordSchemaProps> = ({
  word,
  selected,
  toggle,
}) => (
  <tr>
    <td className="border p-3">{word.id}</td>
    <td className="border p-3">{word.word}</td>
    <td className="border p-3">{word.ru}</td>
    <td className="border w-16 h-16">
      <Button
        onClick={() => toggle(word)}
        className={clsx(
          'transition-all duration-75 aspect-square h-12 ml-[7px] rounded-xl',
          selected ? 'bg-black text-white' : 'bg-blue-50'
        )}
      >
        {selected ? '-' : '+'}
      </Button>
    </td>
  </tr>
)

export default WordSchema
