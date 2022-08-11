import React, { useState, useEffect, useContext } from 'react'
import { OrdersContext } from '../context/ordersContext.jsx';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp, addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import flecha from '../flecha.png';
import { useNavigate } from 'react-router-dom';


export function Menu2({ showModal, closeModal, tableNumber, time }) {
    const [food, setFood] = useState([]);
    let navigate = useNavigate()
    let unique = [];
    console.log(time)
    if (time > 12 && time < 15) {
        const prod = food.filter(item => item.status != "breakfast")
        unique = Array.from(new Set(prod.map((item) => item.category)))
    } else if (time < 12 && time > 8) {
        const prod = food.filter(item => item.status != "lunch")
        unique = Array.from(new Set(prod.map((item) => item.category)))
    } else {
        const prod = food.filter(item => item.status === "always")
        unique = Array.from(new Set(prod.map((item) => item.category)))
    }
    const callback = (data) => {
        return setFood(data.docs.map((product) => {
            return ({ ...product.data() })
        }))
    }

    useEffect(() => {
        const getProducts = async () => {
            const q = query(collection(db, 'productos'));
            onSnapshot(q, callback)
        }
        getProducts()
    }, [])

    const handlePlus = (name) => {
        const newMenu = [...food];
        const product = newMenu.find((product) => product.name === name);
        product.quantity += 1;
        setFood(newMenu);
    }

    const handleRest = (name) => {
        const newMenu = [...food];
        const product = newMenu.find((product) => product.name === name);
        product.quantity > 0 ? product.quantity -= 1 : product.quantity;
        setFood(newMenu);
    }

    const handleSendOrder = () => {//NO ENVIAR SI ESTA VACIO
        const confirmAlert = confirm('¿Enviar a cocina?');
        if (confirmAlert === true) {
            const products = food.filter((product) => product.quantity > 0);
            addDoc(collection(db, 'orders'), {
                date: Timestamp.fromDate(new Date()),
                table: tableNumber,
                products,
                orderId: tableNumber + "-" + uuidv4(),
                estado: "Preparando"
                //meserx: "",
                //observaciones:"",
            })
            food.forEach((product) => {
                product.quantity = 0;
            })
            closeModal()
            navigate('/Salon')

        }
    }

    const handleClikCategory = (e) => {
        const cat = e.currentTarget;
        const panel = cat.nextElementSibling;
        panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";
    }

    return (
        <>

            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        {tableNumber}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {unique.map((category) => (

                                        <div className="w-full">
                                            <button className="flex bg-gray-200 text-lg cursor-pointer p-4 text-left w-full hover:bg-gray-300 justify-between" onClick={handleClikCategory} key={category}>
                                                <p className="">{category}</p>
                                                <img src={flecha} className="w-4"></img>
                                            </button>
                                            <div className="bg-white hidden overflow-hidden px-1 text-base">
                                                {food.map((product) =>
                                                    product.category === category ?
                                                        <div className="grid grid-cols-3 gap-4 p-1" >
                                                            <span className="w-60 self-center">{product.name}</span>
                                                            <span className="w-10 self-center">${product.price.toLocaleString()}</span>
                                                            <div className="justify-self-end">
                                                                <button className="px-2 m-2 w-8 h-8 border-2 rounded-full bg-gray-300 font-bold hover:bg-blue-700" onClick={() => { handleRest(product.name) }}>-</button>
                                                                <label className="p-2">{product.quantity}</label>
                                                                <button className="px-2 m-2 w-8 h-8 border-2 rounded-full bg-gray-300 font-bold hover:bg-blue-700" onClick={() => { handlePlus(product.name) }}>+</button>
                                                            </div>
                                                        </div>
                                                        : null
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSendOrder}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}