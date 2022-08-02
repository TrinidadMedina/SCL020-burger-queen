import React from 'react'

export const Table = ({ table }) => {

    return (
        table.number && <>
            <div className={table.active ? " p-4 max-w-sm mx-auto bg-cyan-600	 shadow-lg rounded-lg overflow-hidden" : " p-4 max-w-sm mx-auto bg-gray-300	 shadow-lg rounded-lg overflow-hidden"}>
                <h1 className="text-4xl font-bold	text-right">{table.number}</h1>
                <h3 className="font-bold	">Active:{table.active.toString()}</h3>
                <h2 > Check in Time:  {table.active ? table.checkInTime : "00:00"} </h2>
            </div>

        </>
    )
}