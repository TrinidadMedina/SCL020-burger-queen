import React from 'react'
import { Diner } from './views/Diner'
import { Kitchen } from './views/Kitchen';
import { Login } from './views/Login';
import { Route, Routes } from "react-router-dom";
import { SetOrders } from './context/SetOrders';
import { SetTables } from './context/SetTables';
import { Table } from './views/Table';
import { AuthContextProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

export function App() {
    return (
        <AuthContextProvider>
            <SetOrders>
                <SetTables>
                    <Routes>
                        <Route exact path='/' element={<Login />} />
                        <Route exact path="Cocina" element={<ProtectedRoute><Kitchen /></ProtectedRoute>} />
                        <Route exact path="Salon" element={<ProtectedRoute><Diner /></ProtectedRoute>} />
                        <Route exact path="Mesa/:tableNumber" element={<ProtectedRoute><Table /></ProtectedRoute>} />
                    </Routes>
                </SetTables>
            </SetOrders>
        </AuthContextProvider>
    )
}