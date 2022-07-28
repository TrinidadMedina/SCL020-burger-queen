import React from 'react'
import { RestaurantMenu } from './components/RestaurantMenu'
import { Diner } from './components/Diner'
import { Kitchen } from './components/Kitchen'
import { getProducts } from './components/allProducts'
import { Route, Routes } from "react-router-dom";

const allProducts = getProducts();
export function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Kitchen />} />
                <Route exact path="RestaurantMenu" element={<RestaurantMenu />} />
                <Route exact path="Kitchen" element={<Kitchen />} />
                <Route exact path="Diner" element={<Diner />} />
            </Routes>
        </>
    )
}