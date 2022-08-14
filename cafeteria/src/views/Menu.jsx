import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Timestamp, addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import flecha from '../flecha.png';
import { useNavigate } from 'react-router-dom';
import { Confirm } from '../components/Confirm.jsx';

export function Menu({ showModal, closeModal, tableNumber, time }) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [food, setFood] = useState([]);
    let navigate = useNavigate()

    let unique = [];
    if (time >= 12 && time <= 15) {
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

    const handleOpenConfirm = () => {
        setShowConfirm(true)
    }
    const handleSendOrder = () => {
        const products = food.filter((product) => product.quantity > 0);
        if (products.length != 0) {
            addDoc(collection(db, 'orders'), {
                date: Timestamp.fromDate(new Date()),
                table: tableNumber,
                products,
                orderId: tableNumber + "-" + uuidv4(),
                estado: "Preparando",
                //meserx: "",
                observaciones: "",
            })
            food.forEach((product) => {
                product.quantity = 0;
            })
            closeModal()
            navigate('/Salon')
        } else {
            alert("No tienes ningún producto seleccionado")
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
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto max-h-2/3 fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative  my-6  max-h-screen max-w-2xl">
                            <Confirm showConfirm={showConfirm} setShowConfirm={setShowConfirm} handleSendOrder={handleSendOrder} />
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-between py-2 px-4 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl p-2  font-semibold">
                                        Mesa {tableNumber}
                                    </h3>
                                    <button
                                        className="  w-8 h-8 bg-gray-500  text-white font-bold  rounded shadow  text-xl leading-none  outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="   ">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {unique.map((category) => (
                                        <div key={category} className="w-full">
                                            <button className="flex bg-gray-200 text-lg cursor-pointer p-2 text-left w-full hover:bg-gray-300 justify-between" onClick={handleClikCategory} key={category}>
                                                <p className="">{category}</p>
                                                <img src={flecha} className="w-4"></img>
                                            </button>
                                            <div className="bg-white hidden overflow-hidden px-1 text-base">
                                                {food.map((product) =>
                                                    product.category === category ?
                                                        <div key={product.name} className="grid grid-cols-3 gap-4 p-1" >
                                                            <span className="w-60 self-center">{product.name}</span>
                                                            <span className="w-10 self-center">${product.price.toLocaleString('de-DE')}</span>
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
                                    <input type="text" />
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleOpenConfirm}
                                    >
                                        Agregar
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