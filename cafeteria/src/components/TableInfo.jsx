import React from 'react'
import { Link } from 'react-router-dom';
import { RestaurantMenu } from '../views/RestaurantMenu';
export const TableInfo = ({ isShown, closeTableInfo, selectedTable, openMenu, activateTable, allOrders }) => {
    const { number, bill, active, order, checkInTime } = selectedTable;

    if (isShown) {
        return (
            <section className='place-content-center flex flex-col p-8 w-96 py-4 px-3 my-4 max-w-sm mx-auto bg-white shadow-lg rounded-lg '>
                <div className='place-content-center justify-between flex flex-row-reverse'>
                    <button className=' bg-gray-500    text-white font-bold py-1 px-2  rounded' type="button" onClick={() => { closeTableInfo(isShown) }}> X </button>
                    <h1 className='font-bold text-xl'>Table {number}</h1>
                </div>
                <article>
                    <ul>
                        <li>Time:{active && checkInTime}</li>
                        <li className='font-bold'>Order:<div>{allOrders.map((order) => {
                            return (
                                order.table === number ? <ul className='font-light grid grid-cols-2 '>{order.products && order.products.map((product) => { return (<><li>-{product.name}</li><li>${product.price}</li></>) })}</ul> : null
                            )
                        })}</div></li>

                        <li className='font-bold grid grid-cols-2 '>Total:<p>${active.toString()} </p> </li>

                    </ul>

                    {active ?
                        <button className=' bg-gray-500   place-content-center text-white font-bold py-2 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckOut #{number}</button> :
                        <button className=' bg-gray-500  place-content-center text-white font-bold py-2 px-4  rounded' type="button" onClick={() => { console.log(selectedTable) }}> CheckIn #{number}</button>}
                    <button className=' bg-gray-500   place-content-center text-white font-bold py-2 px-4  rounded' type="button" onClick={() => { }}> Add product </button>
                    <div className=' bg-gray-500 hover:bg-blue-700   text-white font-bold py-2 px-4  rounded'>
                        <Link to={`/RestaurantMenu/${number}`}>Add Products</Link>
                    </div>

                </article>
            </section>
        )
    }

}
{/* <Route path="/" element={<LaunchList />} />
<Route path="launch/:launchId" element={<LaunchDetails />} /> */}
//<Link to={`/launch/${launch.flight_number}`}>

