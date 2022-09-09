import React, { useEffect, useContext } from 'react'
import { Clock } from '../components/Clock'
import { Order } from '../components/Order'
import { OrdersContext } from '../context/OrdersContext.jsx'
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
        <div className="w-full h-full  bg-zinc-50">
            <nav>
                <header className="flex justify-between">
                    <ButtonSignOut />
                    <Clock />
                </header>
            </nav>
            <div className="grid gap-2 grid-cols-3 grid-rows-2 place-items-center w-4/5 p-2 h-3/6  mx-auto bg-[url('img/floor.png')] bg-cover  bg-no-repeat shadow-lg rounded-lg bg-opacity-10 " >
                {allTables.map((table, i) =>
                    i < allTables.length / 2 ?
                        <div id="tableWrapper" className='flex items-center justify-center w-full h-full' >
                            <div id="chairWrapper" className='h-2/5 flex flex-col justify-between w-1/5  '>
                                <div className='h-1/6 w-full rounded bg-gray-300'></div>
                                <div className='flex h-full '>
                                    <div className='bg-gray-400 w-1/6'></div>
                                    <div className='bg-gray-200  w-1/6'></div>
                                    <div className='bg-gray-400  w-5/6'></div>
                                </div>
                                <div className='h-1/6 w-full rounded bg-gray-300'></div>
                            </div>
                            <div key={table.number} className={table.active ? " p-4 w-20 h-20 bg-blue-700 shadow-lg text-blue-200 rounded-lg overflow-hidden cursor-pointer" : " p-4 w-20 h-20 bg-gray-300	text-gray-800 shadow-lg rounded-lg overflow-hidden cursor-pointer"} onClick={() => { activateTables(table.number) }}>
                                <h1 className="text-4xl font-bold text-right">{table.number}</h1>
                            </div>
                            <div id="chairWrapper" className='h-2/5 flex flex-col justify-between w-1/5  '>
                                <div className='h-1/6 w-full rounded bg-gray-300'></div>
                                <div className='flex h-full flex-row-reverse '>
                                    <div className='bg-gray-400 w-1/6'></div>
                                    <div className='bg-gray-200  w-1/6'></div>
                                    <div className='bg-gray-400  w-5/6 '></div>
                                </div>
                                <div className='h-1/6 w-full rounded bg-gray-300'></div>
                            </div>
                        </div>
                        :
                        <div id="circleTableWrapper" className='flex justify-between items-center w-36 h-36 relative flex-wrap  '>
                            <div id="chairWrapper" className=' h-2/5 flex flex-col  w-2/5  rotate-[45deg]  '>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                                <div className='flex flex-row h-full '>
                                    <div className='bg-gray-400 w-1/6'></div>
                                    <div className='bg-gray-200 w-1/6'></div>
                                    <div className='bg-gray-400 rounded-l-lg w-4/6'></div>
                                </div>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                            </div>
                            <div id="chairWrapper" className=' h-2/5 flex flex-col justify-between w-2/5 max-w-5 rotate-[-45deg]  '>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                                <div className='flex flex-row-reverse h-full '>
                                    <div className='bg-gray-400 w-1/6'></div>
                                    <div className='bg-gray-200 w-1/6'></div>
                                    <div className='bg-gray-400 rounded-r-lg  w-4/6'></div>
                                </div>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                            </div>
                            <div id="chairWrapper" className=' h-2/5 flex flex-col  w-2/5  rotate-[-45deg]  '>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                                <div className='flex flex-row h-full '>
                                    <div className='bg-gray-400 w-1/6'></div>
                                    <div className='bg-gray-200 w-1/6'></div>
                                    <div className='bg-gray-400 rounded-l-lg w-4/6'></div>
                                </div>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                            </div>
                            <div id="chairWrapper" className=' h-2/5 flex flex-col justify-between w-2/5 max-w-10 rotate-[45deg]  '>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                                <div className='flex flex-row-reverse h-full '>
                                    <div className='bg-gray-400 w-1/6'></div>
                                    <div className='bg-gray-200 w-1/6'></div>
                                    <div className='bg-gray-400 rounded-r-lg  w-4/6'></div>
                                </div>
                                <div className='h-1/6 w-full rounded bg-gray-600'></div>
                            </div>
                            <div className='absolute flex justify-center items-center  w-full h-full'>
                                <div key={table.number} className={table.active ? " shadow-2xl absolute drop-shadow-2xl p-4 w-20 h-20 bg-blue-700  text-blue-200 rounded-full overflow-hidden cursor-pointer" : " shadow-2xl absolute drop-shadow-2xl p-4 w-20 h-20 bg-gray-300  text-black rounded-full overflow-hidden cursor-pointer"} onClick={() => { activateTables(table.number) }}>
                                    <h1 className="text-4xl font-bold text-center">{table.number}</h1>
                                </div>
                            </div>

                        </div>
                )}
            </div>
            <div className='bg-gray-300 overflow-auto flex h-2/6 w-10/12 px-3 my-4 mx-auto shadow-lg rounded-lg '>
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

