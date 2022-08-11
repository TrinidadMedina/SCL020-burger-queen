import React from 'react'

export const Table = ({ table }) => {

    return (
        table.number && <>
            <div className={table.active ? " p-4 w-20 h-20 bg-blue-700 shadow-lg text-blue-200 rounded-lg overflow-hidden" : " p-4 w-20 h-20 bg-gray-300	text-gray-800 shadow-lg rounded-lg overflow-hidden"}>
                <h1 className="text-4xl font-bold text-right">{table.number}</h1>
            </div>

        </>
    )
}