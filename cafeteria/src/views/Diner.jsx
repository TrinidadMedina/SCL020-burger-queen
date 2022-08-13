import React, { useEffect, useState, useContext } from 'react'
import { Table } from '../components/Table'
import {Clock} from '../components/Clock'
import { Order } from '../components/Order'

import { OrdersContext } from '../context/ordersContext.jsx'
import { TablesContext } from '../context/TablesContext.jsx'
import { useNavigate } from "react-router-dom";
import { ButtonSignOut } from '../components/ButtonSignOut'

export const Diner = () => {
    let navigate = useNavigate();
    const { orders, getOrders, updateOrders } = useContext(OrdersContext)
    const { allTables, getTables } = useContext(TablesContext)

    useEffect(() => {
        getOrders()
        getTables()
    }, [])

    const activateTables = (number) => {
        const newTables = [...allTables]
        const newTable = newTables.find((table) => table.number === number);
        newTable.active = true;
        getTables([...newTables]) //pa q se ponga verde
        navigate(`/TableInfo/${number}`)
    }

    const handleDelivery = (id) => {
        const confirmAlert = confirm('¿Entregado?');
        if (confirmAlert === true) {
            updateOrders("Entregada", id)
        }
    }

    return (
        <div className="w-full h-full bg-zinc-50">
            <nav>
                <header className="flex justify-between">
                    <ButtonSignOut />
                    <Clock />
                </header>
            </nav>
            <div className="grid gap-2 grid-cols-3 grid-rows-2 place-items-center w-4/5 p-4 h-2/5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {allTables.map((table) =>
                    <div key={table.number} className="w-20 h-20" onClick={() => { activateTables(table.number) }}>
                        <Table table={table} />
                    </div>)}
            </div>
            <div className='bg-gray-300 overflow-auto flex  h-2/6 p-8 w-10/12 py-4 px-3 my-4  mx-auto  shadow-lg rounded-lg '>
                {orders.map((order) => (
                    order.estado !== "Entregada" && order.estado !== "Cerrada" ?
                        <Order key={order.orderId} handleDelivery={handleDelivery} order={order} /> : null
                ))}
            </div>
        </div >
    )
}

