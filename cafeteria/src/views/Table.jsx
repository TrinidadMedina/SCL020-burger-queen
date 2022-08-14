import React, { useState, useContext, useEffect } from 'react'
import { Menu } from './Menu';
import { OrdersContext } from '../context/ordersContext';
import { TablesContext } from '../context/TablesContext.jsx'
import { Confirm } from '../components/Confirm';
import { useParams, Link, useNavigate } from 'react-router-dom';

export const Table = () => {
    const { tableNumber } = useParams();
    const { orders, getOrders, updateOrders } = useContext(OrdersContext);
    const { updateTables } = useContext(TablesContext)
    const [showModal, setShowModal] = useState(false);
    const [showConfirmReset, setShowConfirmReset] = useState(false);
    const [tableOrders, setTableOrders] = useState([]);
    const [time, setTime] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        getOrders();
        const selectedTableOrders = orders.filter((order) => { return order.table == tableNumber && order.estado !== "Cerrada" });
        setTableOrders(selectedTableOrders);
    }, [])

    const openConfirm = () => {
        setShowConfirmReset(true)
    }

    const handleReset = () => {
        tableOrders.forEach((order) => {
            updateOrders("Cerrada", order.docId)
        })
        updateTables(false, tableNumber)
        navigate('/Salon')
    }

    const handleClickAdd = () => {
        const time = new Date();
        let hh = time.getHours();
        setTime(hh)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const getProducts = () => {
        const products = [];
        for (let i = 0; i < tableOrders.length; i++) {
            products.push(...tableOrders[i].products) //agregar el numero de orden para que no se repita la key en caso de pedir dos veces el mismo producto en diferentes ordenes
        }
        return products   // [{name:"Expreso", category:"cafes", status:"always",quantity:"1"...},{...},{...},{...}]
    }
    const categories = Array.from(new Set(getProducts().map(item => item.category))); // ["cafes","sandwiches", "Pastelería"]

    const getBill = () => {
        const prices = getProducts().map((pro) => { return pro.price * pro.quantity })
        const total = prices.reduce((a, b) => { return a + b })
        return total
    }

    return (
        <div className='w-screen h-screen position:relative '>
            <div className=" content-center bg-gray-500 hover:bg-blue-700 text-white font-bold rounded w-fit p-3 m-4">
                <Link to="/Salon">Salón</Link>
            </div>
            <Menu time={time} showModal={showModal} closeModal={closeModal} tableNumber={tableNumber} />
            <Confirm showConfirmReset={showConfirmReset} setShowConfirmReset={setShowConfirmReset} handleReset={handleReset} />
            <section className=' border-8 border-x-gray-100  h-2/3  w-2/3 flex max-h-fit flex-col p-8 py-4 px-3 my-4  mx-auto bg-white shadow-lg rounded-lg '>
                <div className=' justify-between flex flex-row-reverse'>
                    <div className='font-bold text-2xl mb-2'>Mesa {tableNumber}
                    </div>
                </div>
                <article className="flex overflow-auto ">
                    <div className='w-auto  '>
                        {categories.map((category) => (
                            <div key={category} className="">
                                <p className=' font-bold'> {category}</p>
                                <ul className='w-full '>
                                    {getProducts().map((product) => (
                                        category == product.category ?
                                            < ul key={product.name} className=' text-base grid gap-4 grid-cols-[13rem,1rem,3rem,4em]' >
                                                <li>-{product.name} </li>
                                                <li className='text-center'>{product.quantity}</li>
                                                <li className='text-right'>${product.price.toLocaleString('de-DE')}</li>
                                                <li className='text-right'> ${(product.price * product.quantity).toLocaleString('de-DE')}</li>
                                            </ul>
                                            : null
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {tableOrders.length > 0 &&
                            <div className='w-full border-t mt-2 border-black ' >
                                <ul className='w-full  '>
                                    <li className='mt-4 grid grid-cols-2 gap-10   '>Sub-Total:
                                        <p className='text-right'>${getBill().toLocaleString('de-DE')} </p>
                                    </li>
                                    <li className='  grid grid-cols-2  '>Propina:
                                        <p className='text-right'>${(getBill() * 0.1).toLocaleString('de-DE')} </p>
                                    </li>
                                    <li className=' font-bold grid grid-cols-2   '>Total:
                                        <p className='text-right'>${(Math.floor((getBill() * 1.1))).toLocaleString('de-DE')} </p>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </article>
            </section >
            <div className="flex justify-center ">
                <button className=" h-14 w-20 bg-gray-500 hover:bg-blue-700 text-white active:bg-blue-700 font-bold uppercase text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={openConfirm}> CERRAR MESA</button>
                <button
                    className="h-14 w-20  bg-gray-500 hover:bg-blue-700 text-white active:bg-blue-700 font-bold uppercase text-sm  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        handleClickAdd()
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}
