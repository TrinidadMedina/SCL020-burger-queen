import React, { useEffect, useContext } from 'react'
import {Clock} from '../components/Clock'
import { Order } from '../components/Order'
import { OrdersContext } from '../context/ordersContext.jsx'
import { TablesContext } from '../context/TablesContext.jsx'
import { useNavigate } from "react-router-dom";
import { ButtonSignOut } from '../components/ButtonSignOut'

export const Diner = () => {
    let navigate = useNavigate();
    const { orders, getOrders, updateOrders } = useContext(OrdersContext)
    const { allTables, getTables, updateTables } = useContext(TablesContext)

    useEffect(() => {
        getOrders()
        getTables()
    }, [])

    const activateTables = (number) => {
        updateTables(true, number.toString())
        navigate(`/Mesa/${number}`)
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
                    <div key={table.number} className = {table.active ? " p-4 w-20 h-20 bg-blue-700 shadow-lg text-blue-200 rounded-lg overflow-hidden" : " p-4 w-20 h-20 bg-gray-300	text-gray-800 shadow-lg rounded-lg overflow-hidden"} onClick={() => { activateTables(table.number) }}>
                            <h1 className="text-4xl font-bold text-right">{table.number}</h1>
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

{/* <div className={table.active ? " p-4 w-20 h-20 bg-blue-700 shadow-lg text-blue-200 rounded-lg overflow-hidden" : " p-4 w-20 h-20 bg-gray-300	text-gray-800 shadow-lg rounded-lg overflow-hidden"}>
<h1 className="text-4xl font-bold text-right">{table.number}</h1>
</div> */}

