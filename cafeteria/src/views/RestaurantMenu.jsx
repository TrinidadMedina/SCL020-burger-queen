import React, { useState, useEffect } from 'react'
import { menu } from '../data'
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { ButtonHome } from '../components/ButtonHome.jsx'
import flecha from '../flecha.png';

//actualizar arreglo segun horario
//setear arreglo menu selected:false - setear checkbox

export function RestaurantMenu() {
    const { tableNumber } = useParams();

    const menu2 = menu
    const [food, setFood] = useState(menu2);

    const unique = Array.from(new Set(food.map(item => item.category)));

    useEffect(() => {
        console.log(food[0].quantity)
    }, [food])
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
                estado: "preparando"
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
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col bg-white">
            <ButtonHome />
            <main className="w-3/5 shadow-lg flex flex-col self-center">
                {unique.map((category) => (
                    <div className="w-full">
                        <button className="flex bg-gray-200 text-lg cursor-pointer p-4 text-left w-full hover:bg-gray-300 justify-between" onClick={handleClikCategory} key={category}>
                            <p className="">{category}</p>
                            <img src={flecha} className="w-4"></img>
                        </button>
                        <div className="bg-white hidden overflow-hidden py-2 px-4 text-base">
                            {food.map((product) =>
                                product.category === category ?
                                    <div className="grid grid-cols-3 gap-4 p-1" >
                                        <span className="w-60 self-center">{product.name}</span>
                                        <span className="w-10 self-center">${product.price}</span>
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
                {/* <Link to="/Diner">Enviar</Link> */}
            </button>
            <div>has sleccionado {JSON.stringify(menu.filter((product) => product.quantity > 0))}
            </div>
        </div>
    )
}

