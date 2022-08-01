import React, { useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { TableInfo } from '../components/TableInfo'
import {tables} from '../data.jsx'
import { Link } from 'react-router-dom'
import Clock from '../components/Clock'
import { Order } from '../components/Order'
import { RestaurantMenu } from './RestaurantMenu'
import { db } from '../firebase/config'
import { collection, getDocs, query, onSnapshot, orderBy } from 'firebase/firestore'

export const Diner = () => {
    const [isShown, setIsShown] = useState(false);
    const [selectedTable, setSelectedTable] = useState(tables)
    const [order, setOrder] = useState([]);
    const [allTables, setAllTables] = useState(tables)

    // useEffect(() => {
    //     const getOrders = async () => {
    //         const data = await getDocs(orderCollectionRef);
    //         console.log(data)
    //         setOrder(data.docs.map((order) => ({ ...order.data() })))
    //         console.log(order)
    //     }
    //     getOrders();
    // }, [])

    const callback = (data) => {
        return setOrder(data.docs.map((caca) => { return ({ ...caca.data() }) }))
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
        newTable.active=true;
        setSelectedTable({...newTable})
        setAllTables([...newTables])
    }


    return (
        <>
            <div className=" w-full h-full">
                <nav className=" p-3 w-full h-auto	  flex justify-between ">
                    <div className="  bg-gray-500 hover:bg-blue-700 text-white font-bold  py-6 px-4 rounded">
                        <Link to="/">Home</Link>
                    </div>
                    <Clock />
                </nav>
                {isShown ?
                    <>
                        <TableInfo allOrders={order} closeTableInfo={closeTableInfo} isShown={isShown} selectedTable={selectedTable} />  
                    </> 
                    :<>
                        <div className="grid gap-2 grid-cols-3 grid-rows-2 place-content-center w-4/5 py-4 h-2/5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                            {allTables.map((table) => 
                                <div onClick={()=>{activateTables(table.number)}}>
                                <Table table={table} />
                                </div>)}
                        </div>
                        <div className='place-content-center p-8 w-96 py-4 px-3 my-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg '>
                            Pendientes:
                        </div>
                    </>
                }
            </div >
        </>
    )
}
