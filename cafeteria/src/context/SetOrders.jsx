import { useState } from 'react';
import { OrdersContext } from './ordersContext';
import { db } from '../firebase/config'
import { collection, query, onSnapshot, orderBy, updateDoc, getDocs, doc } from 'firebase/firestore'
import { useEffect } from 'react';


export const SetOrders = ({ children }) => {

    const [orders, setOrders] = useState([]);

/*     const getOrders = async () => {
        const ordersCol = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersCol);
        const orderList = ordersSnapshot.docs.map(docu => {
            const rObj = { ...docu.data(), docId: docu.id };
            return rObj;
        });
        setOrders(orderList)
    }; */
    const getOrders = () => {
         const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
         onSnapshot(q, (data) => {
             return setOrders(data.docs.map((order) => {
                 return ({ ...order.data() })
             }))
         })
     };

/*     useEffect(() => { 
        console.log('context')
        const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
        //const unsubscribe = 
        onSnapshot(q, snap => {
          const data = snap.docs.map(doc => doc.data())
          setOrders(data)
        });
        //return () => unsubscribe()
    }, []); */

/*      useEffect(() => {
        const unsubscribe = onSnapShot(q, (currentUser) => {
          console.log(currentUser);
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []); */


    return (
        <OrdersContext.Provider value={{
            orders,
            getOrders
        }}>
            {children}
        </OrdersContext.Provider>
    )
}
