import React from 'react'

export default function SearchInput({ query, onSearch }) {
    const handleSearchChange = (e) => {
        const value = e.target.value
        onSearch(value)
    }
    return (
        <div className='w-full py-2 px-4 flex justify-start items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
                type="search"
                name="search"
                value={query}
                placeholder='Currency of Country'
                className='px-2 text-base outline-none w-full'
                onChange={handleSearchChange}
            />
        </div>
    )
}
