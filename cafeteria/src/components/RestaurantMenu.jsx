import React, { useState, useEffect } from 'react'
import { Product } from './Product'
import { menu } from '../data'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';

//actualizar arreglo segun horario
//Enviar orden a diner y a kitchen
//setear la orden a cero aqui

export function RestaurantMenu() {
    const [showDialog, setShowDialog] = useState(false);
    const [food, setFood] = useState(menu);
    const [productCategory, setProductCategory] = useState(menu);
    const [order, setOrder] = useState();

    const unique = Array.from(new Set(menu.map(item => item.category)));

    console.log(typeof uuidv4())

    const handleShowItems = (category) => {
        const newMenu = [...menu];
        const products = newMenu.filter((product) => product.category === category);
        setProductCategory(products)
        setShowDialog(true)
    }

    const toggleProduct = (name) => {
        const newMenu = [...food];
        const product = newMenu.find((product) => product.name === name);
        product.selected = !product.selected;
        setFood(newMenu);
    };

    const handleSendOrder = () => {
        const confirmAlert = confirm('¿Enviar a cocina?');
        if (confirmAlert === true) {
            const newOrder = menu.filter((product) => product.selected);
            newOrder.id = uuidv4();
            newOrder.date = Timestamp.fromDate(new Date())
            setOrder(newOrder);
        }
    }

    useEffect(() => {
        console.log(order)
        localStorage.setItem('key', JSON.stringify(order))
    }, [order])

    // useEffect(() => {
    //const storedOrder = JSON.parse(localStorage.getItem('key'));
    /*  if (storedTodos) {
       setTodos(storedTodos);
     } */
    //}, []);

    return (
        <div className="w-full flex flex-col	" >
            <nav>
                <div className="bg-gray-500 hover:bg-blue-700  text-white font-bold py-2 px-2 rounded">
                    <Link to="/">Home</Link>
                </div>
            </nav>
            <div className="" id="header">
                <nav className="nav">
                    {unique.map((category) => (
                        <div className="container">
                            <ul key={category} onClick={() => { handleShowItems(category) }} >
                                <a>{category}</a>
                                {productCategory.map((product) =>
                                    product.category === category ?
                                        <Product show={showDialog} product={product} toggleProduct={toggleProduct} />
                                        : null
                                )}
                            </ul>
                        </div>
                    ))}
                    <Link to="/Diner" onClick={handleSendOrder}>Enviar</Link>
                    <div>has sleccionado {JSON.stringify(menu.filter((product) => product.selected))}</div>
                </nav>
            </div>
        </div >
    )
}



