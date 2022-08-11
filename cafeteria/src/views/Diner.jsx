import React, { useEffect, useState, useContext } from 'react'
import { Table } from '../components/Table'
import { tables } from '../data'
import Clock from '../components/Clock'
import { Order } from '../components/Order'
import { db } from '../firebase/config'
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore'
import { ButtonHome } from '../components/ButtonHome'
import { OrdersContext } from '../context/ordersContext.jsx'
import { useNavigate } from "react-router-dom";

export const Diner = () => {
    let navigate = useNavigate();
    const { orders, getOrders } = useContext(OrdersContext)
    const [allTables, setAllTables] = useState(tables) //guarda todas las tables con su estado

    useEffect(() => {
        getOrders()
    }, [])
    const activateTables = (number) => {
        const newTables = [...allTables]
        const newTable = newTables.find((table) => table.number === number);
        newTable.active = true;
        setAllTables([...newTables]) //pa q se ponga verde
        navigate(`/TableInfo/${number}`)
    }

    const handleDelivery = async (id) => {
        const confirmAlert = confirm('¿Entregado?');
        if (confirmAlert === true) {
            const newOrders = [...orders];
            const order = newOrders.find((order) => order.orderId === id);
            order.estado = "Entregada"
            const allOrders = await getDocs(collection(db, "orders"));
            allOrders.forEach((item) => {
                if (item.data().orderId == id) {
                    updateDoc(doc(db, "orders", item.id), {
                        estado: order.estado
                    })
                }
            })
        }
    }

    return (
        <div className="w-full h-full bg-zinc-50">
            <nav>
                <header className="flex justify-between">
                    <ButtonHome />
                    <Clock />
                </header>
            </nav>
            <div className="grid gap-2 grid-cols-3 grid-rows-2 place-content-center w-4/5 p-4 h-2/5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {allTables.map((table) =>
                    <div onClick={() => { activateTables(table.number) }}>
                        <Table table={table} />
                    </div>)}
            </div>
            <div className='bg-gray-300 overflow-auto flex  h-2/6 p-8 w-10/12 py-4 px-3 my-4  mx-auto  shadow-lg rounded-lg '>
                {orders.map((order) => (
                    order.estado !== "Entregada" && order.estado !== "Cerrada" ?
                        <Order handleDelivery={handleDelivery} order={order} /> : null
                ))}
            </div>
        </div >
    )
}

