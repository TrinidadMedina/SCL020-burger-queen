import React from 'react'

export const Table = ({ table }) => {
    console.log(table.active)
    return (
        <>
            <div className="py-2  max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className={table.active ? " max-w-sm mx-auto bg-cyan-600	 shadow-lg rounded-lg overflow-hidden" : " max-w-sm mx-auto bg-gray-300	 shadow-lg rounded-lg overflow-hidden"}>
                    <h1 style={{ width: "20px" }}>#{table.number}</h1>
                    <h2 > Check in Time:  {table.active ? table.checkInTime : " -"} </h2>
                </div>
            </div>
        </>
    )
}


{/* <div style={{ border: "solid 2px black" }}>
    {!tables ? null : tables.map((table) => ())}
</div> */}
