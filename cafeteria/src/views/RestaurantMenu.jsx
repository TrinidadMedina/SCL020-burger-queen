import React, { useState } from 'react'
import { Product } from '../components/Product'
import { menu } from '../data'
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useEffect } from 'react';
//actualizar arreglo segun horario
//Enviar orden a diner y a kitchen
//setear arreglo menu selected:false - setear checkbox

export function RestaurantMenu() {

    const { tableNumber } = useParams();
    console.log(tableNumber)

    const [food, setFood] = useState(menu);
    const [clear, setClear] = useState(false);
    const order = [];


    const unique = Array.from(new Set(menu.map(item => item.category)));
    const toggleProduct = (name) => {
        const newMenu = [...food];
        const product = newMenu.find((product) => product.name === name);
        product.selected = !product.selected;
        setFood(newMenu);
    };

    const handleSendOrder = () => {
        const confirmAlert = confirm('¿Enviar a cocina?');
        if (confirmAlert === true) {
            const products = menu.filter((product) => product.selected);
            addDoc(collection(db, 'orders'), {
                date: Timestamp.fromDate(new Date()),
                table: tableNumber,
                products,
                //meserx: "",
                //observaciones:"",
            })
            //setClear(true)

        }
    }

    /*      useEffect(()=>{
            const newMenu = [...menu]
            console.log('effect')
            setFood(newMenu);
        },[clear]) */

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
        <div className="w-screen flex flex-col">
            <div className="bg-gray-500 hover:bg-blue-700  text-white font-bold py-2 px-2 rounded w-24">
                <Link to="/">Home</Link>
            </div>
            <main className="w-2/5 self-center rounded shadow-lg">
            {unique.map((category) => (
                <div className="w-full self-center">
                    <button className="text-lg cursor-pointer p-4 text-left w-full hover:bg-gray-300 after:content-['\02795'] after:float-right ml-1" onClick={handleClikCategory} key={category}>{category}</button>
                    <div className="bg-white hidden overflow-hidden py-2 px-4 text-base">
                        {food.map((product) =>
                            product.category === category ?
                                <div className="grid grid-cols-2 p-1" >
                                    <div>
                                        <input className="p-3 mx-2" type="checkbox" onChange={() => { toggleProduct(product.name) }} checked={product.selected} ></input>
                                        <span className="">{product.name}</span>
                                    </div>
                                    <div className="justify-self-end">${product.price}</div>
                                </div>
                                : null
                        )}
                    </div>
                </div>
            ))}
            </main>
            <button className="bg-gray-500 hover:bg-blue-700  text-white font-bold py-2 px-2 rounded w-24" onClick={handleSendOrder}>Enviar</button>
            <div>has sleccionado {JSON.stringify(menu.filter((product) => product.selected))}</div>
        </div>
    )
}

{/* <div className="panel">
<input className="check" type="checkbox" onChange={handleCheck} checked={product.selected}></input>
<span className="product-name">{product.name}</span>
<p>${product.price}</p>
</div> */}
{/* <div className="flex self-center justify-self-center		items-center	justify-center	outline-1 max-w-md mx-auto rounded overflow-hidden shadow-lg" >
<div className=" rounded overflow-hidden shadow-lg"> */}



