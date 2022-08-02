import React from 'react'
import { Link } from 'react-router-dom';
import { RestaurantMenu } from '../views/RestaurantMenu';


export const TableInfo = ({ isShown, closeTableInfo, selectedTable, allOrders }) => {
    const { number, bill, active, order, checkInTime } = selectedTable;
    // console.log(allOrders.map((item) => { return item.table == number ? item.products.map((product) => { return product.price }) : null }))

    const getTotalBill = (array) => {
        const prices = [];
        const allProductsOrderTable = []
        const selectedTableOrders = array.filter((order) => { return order.table == number })
        const selectedTableProducts = selectedTableOrders.filter((order1) => { return order1.products })
        const comandas = selectedTableProducts.map((order2) => { return order2 })
        const caca = comandas.forEach((item) => { allProductsOrderTable.push(...item.products) })
        console.log(allProductsOrderTable.forEach((pro) => { prices.push(pro.price * pro.quantity) }))
        const prices2 = prices.reduce((a, b) => { return a + b })

        return prices2

    }
    // getTotalBill(allOrders)
    function formatAmounts(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    if (isShown) {
        return (
            <section className='place-content-center border-8 border-x-gray-100  flex flex-col w-2/3 p-8 py-4 px-3 my-4  mx-auto bg-white shadow-lg rounded-lg '>
                <div className='place-content-center justify-between flex flex-row-reverse'>
                    <button className=' bg-gray-500   text-white font-bold py-1 px-2  rounded' type="button" onClick={() => { closeTableInfo(isShown) }}> X </button>
                    <p className='font-bold  text-xl'>{active && checkInTime}</p>
                    <h1 className='font-bold text-xl '>Table {number}</h1>
                </div>
                <article className="bg-yellow-50 flex">  {/* TRINI  =>  row or column????? */}
                    <ul className="bg-red-50  w-2/3">
                        {allOrders.map((item) => {
                            return item.table == number && <ul className='font-light grid grid-cols-3 '> {item.products.map((product) => {
                                return (<>
                                    <li>-{product.name}</li><li>{product.quantity}</li><li className='text-right'>${formatAmounts(product.price)}</li>
                                </>)
                            })}</ul>
                        })}
                        <li className='  grid grid-cols-3 '>Sub-Total:<span></span> <p className='text-right'>${formatAmounts(getTotalBill(allOrders))} </p>  </li>
                        <li className='  grid grid-cols-3 '>Propina:<span></span><p className='text-right'>${formatAmounts(getTotalBill(allOrders) * 0.1)} </p> </li>
                        <li className=' font-bold grid grid-cols-3 '>Total:<span></span><p className='text-right'>${formatAmounts((getTotalBill(allOrders) * 1.1))} </p> </li>
                    </ul>
                    <footer className='flex  bg-purple-100 h-1/2 w-6/12 flex-row-reverse mt-8 justify-around p-5'>
                        {active ?
                            <button className=' bg-neutral-500  text-white font-bold py-4 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckOut #{number}</button> :
                            <button className=' bg-stone-400 text-white font-bold py-4 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckIn #{number}</button>}
                        <div className=' bg-gray-500 hover:bg-blue-700  flex justify-center text-white mr-4 text-center font-bold py-4 px-4  rounded'>
                            <Link to={`/RestaurantMenu/${number}`}>Add Products</Link>
                        </div>
                    </footer>
                </article>
            </section>
        )
    }
}
