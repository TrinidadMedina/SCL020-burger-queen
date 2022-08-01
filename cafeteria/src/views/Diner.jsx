import React, { useEffect, useState } from 'react'
import { Table } from '../components/Table'
import { TableInfo } from '../components/TableInfo'
import tables from '../dataTable.json'
import { Link } from 'react-router-dom'
import Clock from '../components/Clock'
import { Order } from '../components/Order'
import { RestaurantMenu } from './RestaurantMenu'
import { db } from '../firebase/config'
import { collection, getDocs, query, onSnapshot, orderBy } from 'firebase/firestore'
import { RestMenu } from '../components/RestMenu'

export const Diner = () => {
    const [isShown, setIsShown] = useState(false);
    const [selectedTable, setSelectedTable] = useState({ number: 1, bill: 29, checkInTime: "99" })
    const [showMenu, setShowMenu] = useState(false);
    const [order, setOrder] = useState([]);
    const orderCollectionRef = collection(db, "orders");

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
        // console.log(data.docs.map((order) => { console.log(order); return { ...order.data() } }))
        return setOrder(data.docs.map((caca) => { return ({ ...caca.data() }) }))
        // return data.docs.map((order) => { setOrder(order.data()); return [{ ...order.data() }] })

    }

    useEffect(() => {
        const getOrders = async () => {
            const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
            onSnapshot(q, callback)

        }
        getOrders()


    }, [])


    const showInfoTable = () => {
        setIsShown(true)
    }
    const closeTableInfo = (isShown) => {
        if (isShown)
            setIsShown(false)
    }

    const selectTable = (table) => {
        setSelectedTable({ ...table })
    }
    const openMenu = (number) => {

        setIsShown(false)
    }

    const activateTables = () => {
        setSelectedTable({ ...selectedTable, checkInTime: Date.now().toLocaleString(), active: true })
        console.log(selectedTable)
    }

    console.log("render")
    return (
        <>
            <div className=" w-full h-full">
                <nav className=" p-3 w-full h-auto	  flex justify-between ">
                    <div className="  bg-gray-500 hover:bg-blue-700 text-white font-bold  py-6 px-4 rounded">
                        <Link to="/">Home</Link>
                    </div>
                    <div className=' font-bold place-content-center  px-3 my-4  bg-white shadow-lg rounded-lg ' >
                        User: <br />
                        <div className=" ">Time: <Clock /></div>
                    </div>
                </nav>
                {isShown ?
                    <><TableInfo allOrders={order} openMenu={openMenu} activateTable={activateTables} closeTableInfo={closeTableInfo} isShown={isShown} selectedTable={selectedTable} />  </> :
                    <><div className="grid gap-2 grid-cols-3 grid-rows-2 place-content-center w-4/5 py-4 h-2/5  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        {Object.entries(tables).map((caca) => (caca.map((tableObj) => (<Table selectTable={selectTable} showInfoTable={showInfoTable} table={tableObj} />))))}
                    </div>
                        <div className='place-content-center p-8 w-96 py-4 px-3 my-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg '>Pendientes:

                        </div>
                    </>
                }
            </div >
        </>
    )
}