'use client'

import { Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { Suspense, lazy } from "react";

const Convert = lazy(() => import('./Convert'))

export default function ConvertPage({
    data,
    amount,
    selectedBase,
    setSelectedBase,
    selectedForeign,
    setSelectedForeign,
    swapCurrency,
    handleChangeAmount,
    handleConversion,
    query,
    setSearchQuery,
    searchQuery
}) {
    return (
        <div className="w-full mb-10 md:px-12 flex flex-col items-center justify-center">
            <h1 className="text-balance my-6 text-xl font-bold text-gray-900">
                Converting Currency
            </h1>
            <div className="w-full text-left flex flex-col justify-center items-center">
                <Field className='my-4 w-full'>
                    <Label className="text-sm/6 font-medium text-black">Amount</Label>
                    <Input
                        type='number'
                        placeholder='0.00'
                        value={amount}
                        onChange={handleChangeAmount}
                        autoComplete='off'
                        spellCheck={false}
                        className={clsx(
                            'mt-3 block w-full rounded-2xl bg-white border border-black/25 py-3 px-3 text-lg text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                        )}
                    />
                </Field>
                <Field className='my-4 w-full'>
                    <Label className="text-sm/6 font-medium text-black">Base Currency</Label>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Convert
                            currency={selectedBase}
                            data={data}
                            onSelection={setSelectedBase}
                            query={query}
                            setSearchQuery={setSearchQuery}
                            searchQuery={searchQuery}
                        />
                    </Suspense>
                </Field>
                <button type="button" onClick={swapCurrency}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500 hover:text-black duration-100 ease-linear">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                    </svg>
                </button>
                <Field className='my-4 w-full'>
                    <Label className="text-sm/6 font-medium text-black">Foreign Currency</Label>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Convert
                            currency={selectedForeign}
                            data={data}
                            onSelection={setSelectedForeign}
                            query={query}
                            setSearchQuery={setSearchQuery}
                            searchQuery={searchQuery}
                        />
                    </Suspense>
                </Field>
            </div>
            <button
                type="button"
                className='my-4 w-full bg-green-400 hover:bg-green-500 text-black/60 hover:text-black py-3 px-8 rounded-xl duration-100 ease-in-out'
                onClick={handleConversion}
            >
                CONVERT
            </button>
        </div>
    )
}
