import React, { useState } from 'react'
import Currency from './Currency'

export default function SearchInput({ currency, data, onSelection }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleInput = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSelection = (currencyItem) => {
    onSelection(data.find(ids => ids.id === currencyItem.id))
    setIsOpen(true)
  }

  return (
    <>
      <button
        type='button'
        role='combobox'
        aria-haspopup={true}
        aria-expanded={isOpen}
        onClick={handleToggleInput}
        className='relative w-full bg-gray-50 border border-gray-400 rounded-2xl'
      >
        <Currency key={data.id} currency={currency} />
        {isOpen &&
          <ul className='absolute bg-white border border-gray-300 max-h-52 w-full z-20 overflow-auto'>
            {data?.map((currencyItem) => (
              <li
                role='option'
                key={currencyItem.id}
                aria-selected={currencyItem.id === currency.id}
              >
                <button type="button" className='w-full' onClick={() => handleSelection(currencyItem)}>
                  <Currency currency={currencyItem} />
                </button>
              </li>
            ))}
          </ul>
        }
      </button>
    </>
  )
}
