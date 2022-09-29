import React, { useEffect, useContext } from 'react'
import { Clock } from '../components/Clock'
import { Order } from '../components/Order'
import { OrdersContext } from '../context/OrdersContext.jsx'
import { TablesContext } from '../context/TablesContext.jsx'
import { useNavigate } from "react-router-dom";
import { ButtonSignOut } from '../components/ButtonSignOut'
import { CircleTable } from '../components/CircleTable'
import { SquareTable } from '../components/SquareTable'
import logo from '../img/logo.png'
import floor from '../img/floor.png'


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
        updateOrders("Entregada", id)
    }

    return (
        <div className="w-full h-full  bg-orange-90">
            <nav>
                <header className="flex justify-between">
                    <ButtonSignOut />
                    <div className='w-20' >
                        <img src={logo} alt="" />
                    </div>
                    <Clock />
                </header>
            </nav>
            <div className={`bg-[url(..${floor})] grid gap-2 grid-cols-3 grid-rows-2 place-items-center w-4/5  h-2/5 bg-fixed m-auto bg-cover  shadow-lg rounded  `}  >
                {allTables.map((table, i) =>
                    i < allTables.length / 2 ?
                        <SquareTable table={table} activateTables={activateTables} />
                        :
                        <CircleTable table={table} activateTables={activateTables} />
                )
                }
            </div >
            <div className='bg-white overflow-y-scroll flex h-[40%] w-4/5 px-3 my-4 mx-auto shadow-lg rounded '>
                {orders.map((order) => (
                    order.estado !== "Entregada" && order.estado !== "Cerrada" ?
                        <Order key={order.orderId} handleDelivery={handleDelivery} order={order} /> : null
                ))}
            </div>
        </div >
    )
}



