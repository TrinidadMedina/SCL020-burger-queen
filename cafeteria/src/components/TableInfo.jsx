import React from 'react'
import { Link } from 'react-router-dom';


export const TableInfo = ({ isShown, closeTableInfo, selectedTable, handleReset }) => {
    const { number, active, checkInTime, orders } = selectedTable;


    const getProducts = () => {
        const products = [];
        for (let i = 0; i < orders.length; i++) {
            products.push(...orders[i].products)
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
        if (orders) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else {
            return null
        }
    }

    if (isShown) {
        return (
            <section className=' border-8 border-x-gray-100  h-2/3  w-2/3 flex max-h-fit flex-col p-8 py-4 px-3 my-4  mx-auto bg-white shadow-lg rounded-lg '>
                <div className=' justify-between flex flex-row-reverse'>
                    <button className=' bg-gray-500   text-white font-bold py-1 px-2  rounded' type="button" onClick={() => { closeTableInfo(isShown) }}> X </button>
                    <div className='font-bold text-2xl mb-2'>Table {number}
                        <p className='font-light text-xs'>Check in Time: {active && checkInTime}</p>
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
                        {orders.length > 0 &&
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
                    <footer className='flex  h-1/2 w-6/12 flex-row-reverse flex-wrap  mt-8 justify-around p-5'>
                        {active ?
                            <button className=' bg-gray-500  text-white font-bold py-4 px-5  rounded' type="button" onClick={() => { handleReset(number) }}> CheckOut #{number}</button> :
                            <button className=' bg-gray-400 text-white font-bold py-4 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckIn #{number}</button>}
                        < div className=' bg-gray-500 hover:bg-blue-700  flex justify-center text-white mt-4 text-center font-bold py-4 px-4  rounded'>
                            <Link to={`/RestaurantMenu/${number}`}>Add Products</Link>
                        </div>
                    </footer>
                </article>
            </section >
        )
    }
}
