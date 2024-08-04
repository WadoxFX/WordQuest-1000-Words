import clsx from 'clsx'
import React from 'react'

interface WordSchemaProps {
  word: Word
  selected: boolean
  optionWord: (word: Word) => void
}

const WordSchema: React.FC<WordSchemaProps> = ({
  word,
  selected,
  optionWord,
}) => (
  <tr>
    <td className="border p-3">{word.id}</td>
    <td className="border p-3">{word.word}</td>
    <td className="border p-3">{word.ru}</td>
    <td className="border w-16 h-16">
      <button
        className={clsx(
          'transition-all aspect-square h-12 ml-[7px] rounded-xl',
          selected ? 'bg-black text-white' : 'bg-blue-50 '
        )}
        onClick={() => optionWord(word)}
      >
        +
      </button>
    </td>
  </tr>
)

export default WordSchema
