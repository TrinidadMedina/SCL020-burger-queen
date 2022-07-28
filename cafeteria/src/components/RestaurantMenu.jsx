import React, { useState } from 'react'
import { Product } from './Product'
import { menu } from '../data'
import { Link } from 'react-router-dom';
//actualizar arreglo segun horario
//categorias, mostrar una vez las que estan activas #b5b5b5;

export function RestaurantMenu() {
    const [showDialog, setShowDialog] = useState(false);
    const [food, setFood] = useState(menu);

    const unique = Array.from(new Set(menu.map(item => item.category)));

    const handleShowItems = (category) => {
        const newMenu = [...menu];
        const products = newMenu.filter((product) => product.category === category);
        setFood(products)
        setShowDialog(true)
    }

    const toggleProduct = (name) => {
        const newMenu = [...food];
        const product = newMenu.find((product) => product.name === name);
        product.selected = !product.selected;
        setFood(newMenu);
    };

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
                                {food.map((product) =>
                                    product.category === category ?
                                        <Product show={showDialog} product={product} toggleProduct={toggleProduct} />
                                        : null
                                )}
                            </ul>
                        </div>
                    ))}
                    {<div>has sleccionado {JSON.stringify(menu.filter((product) => product.selected))}</div>}
                </nav>
            </div>
        </div >
    )
}

