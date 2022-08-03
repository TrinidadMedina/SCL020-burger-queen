import React from 'react'
import { Link } from 'react-router-dom';


export const TableInfo = ({ isShown, closeTableInfo, selectedTable, allOrders }) => {
    const { number, active, checkInTime } = selectedTable;

    const getAllProductsSelTable = (array) => {
        const allProductsOrderTable = []
        const selectedTableOrders = array.filter((order) => { return order.table == number })
        const selectedTableProducts = selectedTableOrders.filter((order1) => { return order1.products })
        const comandas = selectedTableProducts.map((order2) => { return order2 })
        comandas.forEach((item) => { allProductsOrderTable.push(...item.products) })
        return allProductsOrderTable // [{name:"Expreso", category:"cafes", status:"always",quantity:"1"...},{...},{...},{...}]
    }
    const getTotalBill = (array) => {
        const prices = [];
        const allProductsOrderTable = getAllProductsSelTable(array)
        allProductsOrderTable.forEach((pro) => { prices.push(pro.price * pro.quantity) })
        if (prices.length !== 0) {
            const prices2 = prices.reduce((a, b) => { return a + b })
            return Math.round(prices2)
        } else {
            return null
        }
    }
    const productsByCategory = (array) => { // REFACTORIZAR - vuelta estupida (?)
        const allProductsOrderTable = getAllProductsSelTable(array) // [{name:"Expreso", category:"cafes", status:"always",quantity:"1"...},{...},{...},{...}]
        const productsByCategoryTable = {}
        const sorted = []                   // [[{},{},{}],[{}] ]
        const categories = Array.from(new Set(allProductsOrderTable.map(item => item.category))); // ["cafes","sandwiches", "Pastelería"]
        categories.forEach((category) => {
            sorted.push(allProductsOrderTable.filter((product) => product.category === category))
        })
        sorted.forEach((group, i) => {
            productsByCategoryTable[group[0].category] = group
        })
        return productsByCategoryTable  // {almuerzo:[{},{}],desayuno:[{}]}
    }
    // console.log("FILTERPRODCATEGORY", productsByCategory(allOrders))
    // console.log(Object.entries(productsByCategory(allOrders)).forEach((item) => { console.log(item) }))
    function formatAmounts(x) {
        if (getAllProductsSelTable(allOrders).length > 0) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        } else {
            return null
        }
    }

    if (isShown) {
        allOrders.forEach((item) => {
            let productsTable = [];
            // console.log(item.products)
            item.number == selectedTable.number ? productsTable.push(item.products) : null
        })
        return (
            <section className='place-content-center border-8 border-x-gray-100  flex flex-col w-2/3 p-8 py-4 px-3 my-4  mx-auto bg-white shadow-lg rounded-lg '>
                <div className='place-content-center justify-between flex flex-row-reverse'>
                    <button className=' bg-gray-500   text-white font-bold py-1 px-2  rounded' type="button" onClick={() => { closeTableInfo(isShown) }}> X </button>
                    <div className='font-bold text-xl mb-2'>Table {number}
                        <p className='font-light text-xs'>Check in Time: {active && checkInTime}</p>
                    </div>
                </div>
                <article className="flex">
                    <div> {((Object.entries(productsByCategory(allOrders))).map((group) => {
                        return (
                            <div className=" ">
                                <p className=' font-bold'> {group[0]}</p>
                                <ul> {group[1].map((product) => {
                                    return (
                                        <div className=' grid grid-cols-4 text-base '>
                                            <li>-{product.name}</li>
                                            <li className=' text-center'>{product.quantity}</li>
                                            <li className='text-right'>${formatAmounts(product.price)}</li>
                                            <li className='text-right'> ${formatAmounts(product.price * product.quantity)}</li>
                                        </div>)
                                })} </ul>
                            </div>)
                    }))}{getAllProductsSelTable(allOrders).length > 0 &&   /* para que no aparezca la lista Agregar condición si hay productos && */
                        <ul className=' '>
                            <li className='mt-4 grid grid-cols-2 border-t-2 border-zinc-900 '>Sub-Total:  <p className='text-right'>${formatAmounts(getTotalBill(allOrders))} </p></li>
                            <li className='  grid grid-cols-2  '>Propina:<p className='text-right'>${formatAmounts(getTotalBill(allOrders) * 0.1)} </p> </li>
                            <li className=' font-bold grid grid-cols-2   '>Total:<p className='text-right'>${formatAmounts(Math.floor((getTotalBill(allOrders) * 1.1)))} </p> </li>
                        </ul>}
                    </div>
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
