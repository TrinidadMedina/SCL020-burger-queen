import React, { useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { TableInfo } from '../components/TableInfo'
import { tables } from '../data.jsx'
import Clock from '../components/Clock'
import { Order } from '../components/Order'
import { db } from '../firebase/config'
// import { OrderKitchen } from '../components/OrderKitchen'
import { collection, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { ButtonHome } from '../components/ButtonHome'

export const Diner = () => {
    const [isShown, setIsShown] = useState(false); // guarda booleano que controla mostrar tableInfo
    const [selectedTable, setSelectedTable] = useState(tables) // guarda table clickeada  para uso tableinfo
    const [orders, setOrders] = useState([]); //guarda todas las ordenes del onsnapshot
    const [allTables, setAllTables] = useState(tables) //guarda todas las tables con su estado

    const resetTable = async (number) => {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const snapshot = [];
        querySnapshot.forEach((doc) => {
            return snapshot.push({ ...doc.data(), idFire: doc.id })// console.log(`${doc.id} => ${doc.data()}`);
        });
        const orders = snapshot.filter((order) => { return order.table == number })
        orders.forEach(async (order) => {
            console.log(order.idFire)
            await deleteDoc(doc(db, "orders", order.idFire));
        })
    }
    const callback = (data) => {
        return setOrders(data.docs.map((caca) => {
            return ({ ...caca.data() })
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
        const selectedTableOrders = orders.filter((order) => { return order.table == number }) // [{},{}] arreglo obj ordenes de mesa select
        setSelectedTable({ ...newTable, orders: selectedTableOrders })
        setAllTables([...newTables]) //pa q se ponga verde
    }
    const handleReset = (number) => {
        setIsShown(false);
        const newTables = [...allTables];
        const selected = newTables.find((table) => table.number === number);
        selected.active = false;
        setSelectedTable({ ...selected })
        resetTable(number)
    }
    return (
        <>
            <div className="w-full h-full">
                <nav className="bg-zinc-50">
                    <header className="flex justify-between">
                        <ButtonHome />
                        <Clock />
                    </header>
                </nav>
                {isShown ?
                    <>
                        <TableInfo closeTableInfo={closeTableInfo} handleReset={handleReset} isShown={isShown} selectedTable={selectedTable} />
                    </>
                    : <>
                        <div className="grid gap-2 grid-cols-3 grid-rows-2 place-content-center w-4/5 p-4 h-2/5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                            {allTables.map((table) =>
                                <div onClick={() => { activateTables(table.number) }}>
                                    <Table table={table} />
                                </div>)}
                        </div>
                        <div className='bg-gray-300 overflow-auto flex  h-2/6 p-8 w-10/12 py-4 px-3 my-4  mx-auto  shadow-lg rounded-lg '>
                            {orders.map((item) => (
                                <Order order={item} />
                                // <OrderKitchen order={item} />
                            ))
                            }
                        </div>
                    </>
                }
            </div >
        </>
    )
}

