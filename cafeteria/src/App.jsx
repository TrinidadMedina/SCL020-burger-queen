import React from 'react'
import { Diner } from './views/Diner'
import { Kitchen } from './views/Kitchen';
import { Login } from './views/Login';
import { Route, Routes } from "react-router-dom";
import { SetOrders } from './context/SetOrders';
import { Menu2 } from './views/Menu2';
import { TableInfo } from './views/TableInfo';

export function App() {
    return (
        <SetOrders>
            <Routes>
                <Route exact path="Menu2" element={<Menu2 />} />
                <Route exact path='/' element={<Login />} />
                <Route exact path="Salon" element={<Diner />} />
                <Route exact path="Cocina" element={<Kitchen />} />
                <Route exact path="TableInfo/:tableNumber" element={<TableInfo />} />
            </Routes>
        </SetOrders>
    )
}