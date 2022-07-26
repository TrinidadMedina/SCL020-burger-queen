import React from 'react'
import { RestaurantMenu } from './components/RestaurantMenu'
import { Cocina } from './components/cocina'
import { getProducts } from './components/allProducts'
import { Route, Routes } from "react-router-dom";

const allProducts = getProducts();
export function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Cocina />} />
                <Route exact path="RestaurantMenu" element={<RestaurantMenu />} />
                <Route exact path="cocina" element={<Cocina />} />
            </Routes>
        </>
    )
}