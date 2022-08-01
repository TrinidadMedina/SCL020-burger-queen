import React, { useEffect, useState } from 'react'
import { Table } from './Table'
import { TableInfo } from './TableInfo'
import tables from '../dataTable.json'
import { Link } from 'react-router-dom'
import Clock from './Clock'
import { Order } from './Order'
import { RestaurantMenu } from './RestaurantMenu'

export const Diner = () => {
    const [isShown, setIsShown] = useState(false);
    const [selectedTable, setSelectedTable] = useState({ number: 1, bill: 29, checkInTime: "99" })
    const [showMenu, setShowMenu] = useState(false)
    const showInfoTable = () => {
        setIsShown(true)
    }
    const closeTableInfo = (isShown) => {
        if (isShown)
            setIsShown(false)
    }

    const selectTable = (table) => {
        setSelectedTable({ ...table })
    }
    const openMenu = () => {
        // return (<RestaurantMenu />)
    }
    const activateTables = () => {
        setSelectedTable({ ...selectedTable, checkInTime: Date.now().toLocaleString(), active: true })
        console.log(selectedTable)
    }
    useEffect(() => {
        console.log("use Effect")
    })
    console.log("render")
    return (
        <>
            <div className=" w-full h-full">
                <nav className=" p-3 w-full h-auto	  flex justify-between ">
                    <div className="  bg-gray-500 hover:bg-blue-700 text-white font-bold  py-6 px-4 rounded">
                        <Link to="/">Home</Link>
                    </div>
                    <div className=' font-bold place-content-center  px-3 my-4  bg-white shadow-lg rounded-lg ' >
                        User: <br />
                        <div className=" ">Time: <Clock /></div>
                    </div>
                </nav>



                {isShown ?
                    <><TableInfo openMenu={openMenu} activateTable={activateTables} closeTableInfo={closeTableInfo} isShown={isShown} selectedTable={selectedTable} /> { } </> :
                    <><div className="grid gap-2 grid-cols-3 grid-rows-2 place-content-center w-4/5 py-4 h-2/5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        {Object.entries(tables).map((caca) => (caca.map((tableObj) => (<Table selectTable={selectTable} showInfoTable={showInfoTable} table={tableObj} />))))}
                    </div>
                        <div className='place-content-center p-8 w-96 py-4 px-3 my-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg '>Pendientes:
                            <Order order='orden' />
                        </div>
                    </>
                }



            </div >

        </>
    )
}




// function handleShowInfoTable(num) {
//     console.log(num), setSelectedTable(tables), setIsShown(true);
// }
// const closeTableInfo = () => { setIsShown(false) }
{/* //     tables.map((table) => (
        //         <div id={table.number} onClick={() => { handleShowInfoTable(table.number) }}>
        //             <Table key={table.number} table={table} />
        //         </div>))} */}