import React from 'react'
import { Menu } from './views/Menu'
import { Diner } from './views/Diner'
import {Home} from './views/Home'
import {Kitchen} from './views/Kitchen';
import { Login } from './views/Login';
import { Route, Routes } from "react-router-dom";
import { SetOrders } from './context/SetOrders';

export function App() {
    return (
        <SetOrders>
            <Routes>
                <Route exact path='/' element={<Login />}/>
                <Route exact path="/Inicio" element={<Home />} />
                <Route exact path="Menu/:tableNumber" element={<Menu />} />
                <Route exact path="Salon" element={<Diner />} />
                <Route exact path="Cocina" element={<Kitchen />} />
            </Routes>
        </SetOrders>
    )
}