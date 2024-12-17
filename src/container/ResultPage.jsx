import React from 'react'

export default function ResultPage({ result, loading }) {
    return (
        <div className="w-full text-left flex flex-col justify-center items-center">
            <div className='w-full h-60 p-10 text-left flex flex-col justify-center items-start bg-green-300 rounded-3xl'>
                {!loading ? (
                    <>
                        <p className='text-sm'>{`${result.amount} ${result.base_short_code} =`}</p>
                        <p className='text-3xl my-4'>{`${result.foreign_short_code} ${result.amount_result}`}</p>
                        <p className='text-xl'>{`${result.foreign_name}`}</p>
                    </>
                ) : (
                    <>
                        <span className="loader"></span>
                    </>
                )}
            </div>

        </div>
    )
}
