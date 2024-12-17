import React from 'react'

export default function Currency({ currency }) {
  const { short_code, name } = currency
  const code = short_code?.slice(0, 2).toLowerCase()
  return (
    <div className='flex justify-start items-center h-full bg-white py-2 px-4 z-10 rounded-2xl'>
      <img
        src={`https://flagcdn.com/48x36/${code}.png`}
        width="45"
        height="36"
        loading='lazy'
        alt={name}
      />
      <p className='mx-2'>{short_code}</p>
      <div>-</div>
      <p className='mx-2'>{name?.slice(0, 15)}</p>
    </div>
  )
}
