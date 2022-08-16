import React, { useEffect, useContext } from 'react'
import { Clock } from '../components/Clock'
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
            updateOrders("Entregada", id)
    }

    return (
        <div className="w-full h-full bg-[url('diner.png')] bg-zinc-50">
            <nav>
                <header className="flex justify-between">
                    <ButtonSignOut />
                    <Clock />
                </header>
            </nav>
            <div className="grid gap-2 grid-cols-3 grid-rows-2 place-items-center w-4/5 p-2 h-3/6  mx-auto bg-[url('img/floor.png')]  bg-no-repeat shadow-lg rounded-lg  " >
                {allTables.map((table, i) =>
                    i < 3 ?
                        <div  key={table.number} id="tableWrapper" className='flex bg-orange-500 items-center justify-center w-full h-full' >
                            <div id="chairWrapper" className='h-1/4  w-1/4 outline-2 outline  bg-slate-500  '></div>
                            <div key={table.number} className={table.active ? " p-4 w-20 h-20 bg-blue-700 shadow-lg text-blue-200 rounded-lg overflow-hidden" : " p-4 w-20 h-20 bg-gray-300	text-gray-800 shadow-lg rounded-lg overflow-hidden"} onClick={() => { activateTables(table.number) }}>
                                <h1 className="text-4xl font-bold text-right">{table.number}</h1>
                            </div>
                            <div className='h-2/5 w-1/4  outline-2 outline bg-slate-500 '>
                                <div className='h-1/6 w-full outline-1 outline'></div>
                                <div className='h-4/6 w-full outline-1 outline'>
                                    <div className='w-1/12 h-full outline-dotted'></div>
                                </div>
                                <div className='h-1/6 w-full outline-1 outline'></div>
                            </div>
                        </div>
                        :
                        <div key={table.number} className={table.active ? " p-4 w-20 h-20 bg-blue-700 shadow-lg text-blue-200 rounded-full overflow-hidden" : " p-4 w-20 h-20 bg-gray-300	text-gray-800 shadow-lg rounded-lg overflow-hidden"} onClick={() => { activateTables(table.number) }}>
                            <h1 className="text-4xl font-bold text-right">{table.number}</h1>
                        </div>
                )}
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

