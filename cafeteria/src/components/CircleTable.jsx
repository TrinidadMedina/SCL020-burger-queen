import React from 'react'

export function CircleTable({ table, activateTables }) {
    return (
        < >
            <div id="circleTableWrapper" className='flex justify-between items-center w-32 h-32 mb-10 relative flex-wrap  '>
                < div id="chairWrapper" className='invisible md:visible h-2/5  w-2/5  rotate-[45deg]  ' >
                    <img src={table.active ? "../img/active-chair.svg" : "../img/inactive-chair.svg"} alt="" />
                </div>
                <div id="chairWrapper" className='invisible md:visible h-2/5 w-2/5 rotate-[-220deg] '>
                    <img src={table.active ? "../img/active-chair.svg" : "../img/inactive-chair.svg"} alt="" />
                </div>
                <div id="chairWrapper" className='invisible md:visible h-2/5 w-2/5 rotate-[-45deg]'>
                    <img src={table.active ? "../img/active-chair.svg" : "../img/inactive-chair.svg"} alt="" />
                </div>
                <div id="chairWrapper" className='invisible md:visible  h-2/5  w-2/5 rotate-[220deg] '>
                    <img src={table.active ? "../img/active-chair.svg" : "../img/inactive-chair.svg"} alt="" />
                </div>
                <div className='absolute flex justify-center items-center  w-full '>
                    <div key={table.number} className={table.active ? `shadow-2xl absolute drop-shadow-2xl p-4 w-[98px] h-[98px] flex justify-center items-center bg-dark-green border-4 border-[#385450] text-white rounded-full overflow-hidden cursor-pointer` : `shadow-2xl absolute drop-shadow-2xl p-4 w-[98px] h-[98px] flex justify-center items-center bg-orange-90  text-dark-green rounded-full overflow-hidden cursor-pointer`} onClick={() => { activateTables(table.number) }}>
                        <h1 className="text-4xl font-bold ">{table.number}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}


{/* <div key={table.number} className={table.active ? " shadow-2xl absolute drop-shadow-2xl p-4 w-[98px] h-[98px] flex justify-center items-center bg-dark-green  text-white rounded-full overflow-hidden cursor-pointer" : " shadow-2xl absolute drop-shadow-2xl p-4 w-[80px] h-[80px] bg-orange-90  text-[#3D5552] rounded-full overflow-hidden cursor-pointer"} onClick={() => { activateTables(table.number) }}> */ }
