import React from 'react'
import { RestaurantMenu } from './components/RestaurantMenu'
import { Diner } from './components/Diner'
import {Home} from './components/Home'
import {Kitchen} from './components/Kitchen';
import { Route, Routes } from "react-router-dom";

export function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="RestaurantMenu" element={<RestaurantMenu />} />
                <Route exact path="Diner" element={<Diner />} />
                <Route exact path="Kitchen" element={<Kitchen />} />
            </Routes>
        </>
    )
}