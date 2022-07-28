import React, { useState } from 'react'
import { Table } from './Table'
import { TableInfo } from './TableInfo'
import tables from '../dataTable.json'
import { Link } from 'react-router-dom'

export const Diner = () => {

    const [isShown, setIsShown] = useState(false);
    const [selectedTable, setSelectedTable] = useState([])

    return (<>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/">Home</Link>
        </div>

        <div>Diner</div>
        <img src="" alt="" />
        <div style={{ border: "solid 2px black" }}>
            INFO GRAL <br />
            User: XXXX <br />
            Time: XXXX
        </div><br />
        <div> tables
            {console.log(Object.entries(tables))}
            {Object.entries(tables).map((caca) => (caca.map((tableObj) => { console.log(tableObj) })))}

            {Object.entries(tables).map((caca) => (caca.map((tableObj) => (<Table table={tableObj} />))))}
        </div>
        {/* <TableInfo closeTableInfo={closeTableInfo} isShown={isShown} selectedTable={selectedTable} /> 
         <div style={{ border: "solid 2px black", height: "180px" }}>Pendientes:</div> */}
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