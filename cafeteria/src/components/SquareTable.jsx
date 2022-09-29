import React from 'react'
import chairActive from '../img/active-chair.svg'
import chairInactive from '../img/inactive-chair.svg'

export function SquareTable({ table, activateTables }) {

    return (
        < >
            <div id="tableWrapper" className='flex items-center  justify-center w-full h-full' >
                <div id="chairWrapper" className='invisible md:visible h-2/5    '>
                    <img src={table.active ? chairActive : chairInactive} alt="" />
                </div>

                <div key={table.number} className={table.active ? "p-4 w-[70px] h-[70px] bg-dark-green shadow-lg text-white rounded-md overflow-hidden cursor-pointer flex justify-center items-center " : " p-4 w-[70px] h-[70px] bg-orange-90	text-dark-green shadow-lg rounded-lg overflow-hidden cursor-pointer flex justify-center items-center"} onClick={() => { activateTables(table.number) }}>
                    <h1 className="text-4xl font-bold ">{table.number}</h1>
                </div>
                <div id="chairWrapper" className='invisible md:visible h-2/5   rotate-[180deg]'>
                    <img src={table.active ? "../img/active-chair.svg" : "../img/inactive-chair.svg"} alt="" />
                </div>
            </div>
        </>
    )
}
