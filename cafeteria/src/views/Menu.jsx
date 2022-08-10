import React, { useState, useEffect } from 'react'
import { menu } from '../data'
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp, addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { ButtonHome } from '../components/ButtonHome.jsx'
import flecha from '../flecha.png';

//actualizar arreglo segun horario

export function Menu({ isShownMenu, closeMenu }) {

    const [food, setFood] = useState([]);

    const unique = Array.from(new Set(food.map(item => item.category)));

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
        }
    }

    const handleClikCategory = (e) => {
        const cat = e.currentTarget;
        const panel = cat.nextElementSibling;
        panel.style.display === "block" ? panel.style.display = "none" : panel.style.display = "block";
    }

    return (

        isShownMenu ?
            <div className=' z-index:10 w-4/5 h-4/5'>
                <div className=" flex flex-col bg-white">
                    <button className=' bg-gray-500  text-xs text-white font-bold w-6 h-6 rounded' type="button" onClick={() => { closeMenu(isShownMenu) }}> X </button>
                    <main className="w-3/5 shadow-lg flex flex-col self-center">
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
                    </main>
                    <button className=" content-center bg-gray-500 hover:bg-blue-700 text-white font-bold rounded w-fit p-3 m-4" onClick={handleSendOrder}>
                        <Link to="/Salon">Enviar</Link>
                    </button>
                </div>
            </div> : null
    )
}

