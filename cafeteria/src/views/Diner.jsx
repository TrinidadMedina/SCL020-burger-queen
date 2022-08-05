import React, { useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { TableInfo } from '../components/TableInfo'
import { tables } from '../data'
import Clock from '../components/Clock'
import { Order } from '../components/Order'
import { db } from '../firebase/config'
import { collection, query, onSnapshot, orderBy, doc, updateDoc, getDocs } from 'firebase/firestore'
import { ButtonHome } from '../components/ButtonHome'

export const Diner = () => {
    const [isShown, setIsShown] = useState(false); // guarda booleano que controla mostrar tableInfo
    const [selectedTable, setSelectedTable] = useState(tables) // guarda table clickeada  para uso tableinfo
    const [orders, setOrders] = useState([]); //guarda todas las ordenes del onsnapshot, para render en pendientes y sumar la selected table
    const [allTables, setAllTables] = useState(tables) //guarda todas las tables con su estado

    const callback = (data) => {
        return setOrders(data.docs.map((order) => {
            return ({ ...order.data() })
        }))
    }

    useEffect(() => {
        const getOrders = async () => {
            const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
            onSnapshot(q, callback)
        }
        getOrders()
    }, [])

    const closeTableInfo = (isShown) => {
        if (isShown)
            setIsShown(false)
    }

    const activateTables = (number) => {
        setIsShown(true)
        const newTables = [...allTables]
        const newTable = newTables.find((table) => table.number === number);
        newTable.active = true;
        const selectedTableOrders = orders.filter((order) => { return order.table == number && order.estado !== "Cerrada" }) // [{},{}] arreglo obj ordenes de mesa select
        console.log(selectedTableOrders)
        setSelectedTable({ ...newTable, orders: selectedTableOrders })
        setAllTables([...newTables]) //pa q se ponga verde
    }

    const handleReset = async (number, ordersTable) => {
        setIsShown(false);
        const newTables = [...allTables];
        const selected = newTables.find((table) => table.number === number);
        selected.active = false;
        const ordersFirestore = await getDocs(collection(db, "orders"));
        ordersTable.forEach((order) => {
            order.estado = "Cerrada"
            ordersFirestore.forEach((item) => {
                if (item.data().orderId == order.orderId) {
                    updateDoc(doc(db, "orders", item.id), {
                        estado: order.estado
                    })
                }
            })
        })
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
            setOrders(newOrders)
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
            {isShown ?
                    <TableInfo closeTableInfo={closeTableInfo} handleReset={handleReset} isShown={isShown} selectedTable={selectedTable} />
                : <>
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
                </>
            }
        </div >
    )
}

