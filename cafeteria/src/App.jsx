import React from 'react'
import { RestaurantMenu } from './views/RestaurantMenu'
import { Diner } from './views/Diner'
import {Home} from './views/Home'
import {Kitchen} from './views/Kitchen';
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