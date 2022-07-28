import React, { useState } from 'react'

export const TableInfo = ({ isShown, closeTableInfo, selectedTable }) => {

    if (isShown) {
        return (<>

            <button onClick={closeTableInfo}> x </button>
            <div style={{ border: "2px solid black" }}>TableInfo
                <div> Table: #{selectedTable.number} <br />
                    Bill: $ {selectedTable.bill} <br />
                    Time:{selectedTable.checkInTime} <br />
                </div>
                {/* {tables.map((table) => (<>
                    <h1 style={{ color: "red" }} key={table.number}> Table number: {table.number} </h1>
                    <h2 style={{ color: "red" }}> Orders: {!table.orders.length ? "No Orders" : table.orders.map((orders) => (<> <p>Orden:{orders.idOrder}</p></>))} </h2>
                    <h3 style={{ color: "red" }}>Bill: {table.bill}</h3>
                </>))} */}

            </div>
        </>
        )
    } else { return <></> }

}

