import { useState } from 'react';
import { OrdersContext } from './OrdersContext';
import { db } from '../firebase/config'
import { collection, query, onSnapshot, orderBy, updateDoc, getDoc, doc } from 'firebase/firestore'

export const SetOrders = ({ children }) => {

    const [orders, setOrders] = useState([]);

    const getOrders = () => {
        const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
        onSnapshot(q, (data) => {
            return setOrders(data.docs.map((order) => {
                return ({ ...order.data(), docId: order.id })
            }))
        })
    };

    const updateOrders = async (estado, id) => {
        updateDoc(doc(db, "orders", id), {
            estado: estado
        })
    }

    return (
        <OrdersContext.Provider value={{
            orders,
            getOrders,
            updateOrders
        }}>
            {children}
        </OrdersContext.Provider>
    )
}
