import React, { useState } from 'react'
import { Table } from '../components/Table'
import { TableInfo } from '../components/TableInfo'
import tables from '../dataTable.json'
import { Link } from 'react-router-dom'
import Clock from '../components/Clock'
import {Order} from '../components/Order'

export const Diner = () => {
    const [isShown, setIsShown] = useState(false);
    const [selectedTable, setSelectedTable] = useState([])

    return (
        <>
        <div className=" w-full ">
            <div className="  bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to="/">Home</Link>
            </div>
            <div className='px-4' >
                User: <br />
                <div className=" ">Time: <Clock /></div>
            </div>
            <br />
            <div className="grid gap-2 grid-cols-2 grid-rows-2 place-content-center p-8 w-96 py-4 px-3  max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {console.log(Object.entries(tables))}
                {Object.entries(tables).map((caca) => (caca.map((tableObj) => { console.log(tableObj) })))}
                {Object.entries(tables).map((caca) => (caca.map((tableObj) => (<Table table={tableObj} />))))}
            </div>
            {/* <TableInfo closeTableInfo={closeTableInfo} isShown={isShown} selectedTable={selectedTable} /> 
            <div style={{ border: "solid 2px black", height: "180px" }}>Pendientes:</div> */}
        </div >
        <Order order='orden'/>
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