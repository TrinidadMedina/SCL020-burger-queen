import React, { useState } from 'react'

export const TableInfo = ({ isShown, closeTableInfo, selectedTable, openMenu, activateTable }) => {
    const { number, bill, active, order, checkInTime } = selectedTable;
    if (isShown) {
        return (
            <section className='place-content-center flex flex-col p-8 w-96 py-4 px-3 my-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg '>
                <div className='place-content-center justify-between flex flex-row-reverse'>
                    <button className=' bg-gray-500    text-white font-bold py-1 px-2  rounded' type="button" onClick={() => { closeTableInfo(isShown) }}> X </button>
                    <h1 className='font-bold text-xl'>Table {number}</h1>
                </div>
                <article>
                    <ul>
                        <li>Bill: $ {bill}</li>
                        <li>Time:{active && checkInTime}</li>
                        <li>Order:{order}</li>
                        <li>active:{active.toString()}</li>
                    </ul>
                    {active ?
                        <button className=' bg-gray-500   place-content-center text-white font-bold py-2 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckOut #{number}</button> :
                        <button className=' bg-gray-500  place-content-center text-white font-bold py-2 px-4  rounded' type="button" onClick={() => { console.log(selectedTable), activateTable() }}> CheckIn #{number}</button>}
                    <button className=' bg-gray-500   place-content-center text-white font-bold py-2 px-4  rounded' type="button" onClick={() => { openMenu() }}> Add product </button>
                </article>
            </section>
        )
    }

}

