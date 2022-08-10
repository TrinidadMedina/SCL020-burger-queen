import React, { useEffect, useState, useContext } from 'react'

import { Menu2 } from '../views/Menu2';
import { OrdersContext } from '../context/ordersContext';


export const TableInfo = ({ isShown, closeTableInfo, selectedTable, handleReset }) => {
    const { number, active, checkInTime } = selectedTable;
    const { getOrders, orders } = useContext(OrdersContext)
    const [isShownMenu, setIsShownMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        console.log("hola")
    }, [orders])

    const closeModal = () => {
        setShowModal(false)


    }

    const getProducts = () => {
        const products = [];
        for (let i = 0; i < selectedTable.orders.length; i++) {
            products.push(...selectedTable.orders[i].products)
        }
        return products   // [{name:"Expreso", category:"cafes", status:"always",quantity:"1"...},{...},{...},{...}]
    }
    const getBill = () => {
        const prices = getProducts().map((pro) => { return pro.price * pro.quantity })
        const total = prices.reduce((a, b) => { return a + b })
        // console.log(Math.round(total))
        return total
    }

    const categories = Array.from(new Set(getProducts().map(item => item.category))); // ["cafes","sandwiches", "Pastelería"]

    function formatAmounts(price) {
        if (selectedTable.orders) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else {
            return null
        }
    }

    if (isShown) {
        return (
            <div className='w-screen h-screen position:relative '>
                <Menu2 showModal={showModal} closeModal={closeModal} tableNumber={number} />
                <section className=' border-8 border-x-gray-100  h-2/3  w-2/3 flex max-h-fit flex-col p-8 py-4 px-3 my-4  mx-auto bg-white shadow-lg rounded-lg '>
                    <div className=' justify-between flex flex-row-reverse'>
                        <button className=' bg-gray-500  text-xs text-white font-bold w-6 h-6 rounded' type="button" onClick={() => { closeTableInfo(isShown) }}> X </button>
                        <div className='font-bold text-2xl mb-2'>Mesa {number}
                            {/* <p className='font-light text-xs'>Check in Time: {active && checkInTime}</p> */}
                        </div>
                    </div>
                    <article className="flex overflow-auto ">
                        <div className='w-auto  '>
                            {categories.map((category) => (
                                <div className="">
                                    <p className=' font-bold'> {category}</p>
                                    <ul className='w-full '>
                                        {getProducts().map((product) => (
                                            category == product.category ?
                                                < ul className=' text-base grid gap-4 grid-cols-[13rem,1rem,3rem,4em]' >
                                                    <li>-{product.name} </li>
                                                    <li className='text-center'>{product.quantity}</li>
                                                    <li className='text-right'>${formatAmounts(product.price)}</li>
                                                    <li className='text-right'> ${formatAmounts(product.price * product.quantity)}</li>
                                                </ul>
                                                : null
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            {selectedTable.orders.length > 0 &&
                                <div className='w-full border-t mt-2 border-black ' >
                                    <ul className='w-full  '>
                                        <li className='mt-4 grid grid-cols-2 gap-10   '>Sub-Total:
                                            <p className='text-right'>${formatAmounts(getBill())} </p>
                                        </li>
                                        <li className='  grid grid-cols-2  '>Propina:
                                            <p className='text-right'>${formatAmounts(getBill() * 0.1)} </p>
                                        </li>
                                        <li className=' font-bold grid grid-cols-2   '>Total:
                                            <p className='text-right'>${formatAmounts(Math.floor((getBill() * 1.1)))} </p>
                                        </li>
                                    </ul>
                                </div>
                            }</div>
                        <footer className='flex  h-full w-6/12 flex-row-reverse flex-wrap  mt-8 justify-around p-5'>
                        </footer>
                    </article>
                </section >
                <button className=' bg-gray-500 hover:bg-blue-700 text-white font-bold h-20 w-50 py-4 px-5 rounded-lg' type="button" onClick={() => { handleReset(number, selectedTable.orders) }}> Cerrar</button>

                <button
                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Open regular modal
                </button>

            </div>
        )
    }
}
