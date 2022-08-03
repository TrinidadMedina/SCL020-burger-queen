import React from 'react'
import { Link } from 'react-router-dom';


export const TableInfo = ({ isShown, closeTableInfo, selectedTable }) => {
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
            <section className='place-content-center border-8 border-x-gray-100  flex flex-col w-2/3 p-8 py-4 px-3 my-4  mx-auto bg-white shadow-lg rounded-lg '>
                <div className='place-content-center justify-between flex flex-row-reverse'>
                    <button className=' bg-gray-500   text-white font-bold py-1 px-2  rounded' type="button" onClick={() => { closeTableInfo(isShown) }}> X </button>
                    <div className='font-bold text-xl mb-2'>Table {number}
                        <p className='font-light text-xs'>Check in Time: {active && checkInTime}</p>
                    </div>
                </div>
                <article className="flex">
                    {categories.map((category) => (
                        <div className=" ">
                            <p className=' font-bold'> {category}</p>
                            <ul>
                                {getProducts().map((product) => (
                                    category == product.category ?
                                        <div className=' grid grid-cols-4 text-base '>
                                            <li>-{product.name}</li>
                                            <li className=' text-center'>{product.quantity}</li>
                                            <li className='text-right'>${formatAmounts(product.price)}</li>
                                            <li className='text-right'> ${formatAmounts(product.price * product.quantity)}</li>
                                        </div>
                                        : null
                                ))}
                            </ul>
                        </div>
                    ))}
                    {orders.length > 0 &&   /* para que no aparezca la lista Agregar condición si hay productos && */
                        <ul className=' '>
                            <li className='mt-4 grid grid-cols-2 border-t-2 border-zinc-900 '>Sub-Total:
                                <p className='text-right'>${formatAmounts(getBill())} </p>
                            </li>
                            <li className='  grid grid-cols-2  '>Propina:
                                <p className='text-right'>${formatAmounts(getBill() * 0.1)} </p>
                            </li>
                            <li className=' font-bold grid grid-cols-2   '>Total:
                                <p className='text-right'>${formatAmounts(Math.floor((getBill() * 1.1)))} </p>
                            </li>
                        </ul>
                    }
                    <footer className='flex  h-1/2 w-6/12 flex-row-reverse mt-8 justify-around p-5'>
                        {active ?
                            <button className=' bg-gray-500  text-white font-bold py-4 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckOut #{number}</button> :
                            <button className=' bg-gray-400 text-white font-bold py-4 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckIn #{number}</button>}
                        <div className=' bg-gray-500 hover:bg-blue-700  flex justify-center text-white mr-4 text-center font-bold py-4 px-4  rounded'>
                            <Link to={`/RestaurantMenu/${number}`}>Add Products</Link>
                        </div>
                    </footer>
                </article>
            </section>
        )
    }
}
