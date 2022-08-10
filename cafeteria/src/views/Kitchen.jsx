import React, { useEffect, useContext } from 'react'
import { ButtonHome } from '../components/ButtonHome.jsx'
import Clock from '../components/Clock'

import { OrderKitchen } from '../components/OrderKitchen'
import { OrdersContext } from '../context/ordersContext.jsx'

export function Kitchen() {

  const {orders, getOrders}= useContext(OrdersContext)

  useEffect(()=>{
    getOrders()
  },[])

  console.log(orders)
  //const [orders, setOrders] = useState([]);

/*   const callback1 = (data) => {
    return setOrders(data.docs.map((order) => {
      return ({ ...order.data() })
    }))
  }

  useEffect(() => {
    const getOrders1 = async () => {
      const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
      onSnapshot(q, callback1)
    }
    getOrders1()
  }, [])

  const handleReady = async (id) => {
    const confirmAlert = confirm('¿Enviar a salón?');
    if (confirmAlert === true) {
      const newOrders = [...orders];
      const order = newOrders.find((order) => order.orderId === id);
      order.estado = "Listo"
      const allOrders = await getDocs(collection(db, "orders"));
      allOrders.forEach((item) => {
        if (item.data().orderId == id) {
          updateDoc(doc(db, "orders", item.id), {
            estado: order.estado
          })
        }
      })
      setOrders(newOrders)
    }
  } */

  return (
    <div className="bg-zinc-50 h-screen w-screen">
      <header className="flex justify-between">
        <ButtonHome />
        <Clock />
      </header>
      <main className="flex justify-around m-10 flex-wrap">
         {orders.map((order) => (
          order.estado === "Preparando" &&
          <OrderKitchen /* handleReady={handleReady} */ order={order} />
        ))}
      </main>
    </div>
  )
}
