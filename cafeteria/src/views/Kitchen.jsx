import React, { useEffect, useContext } from 'react'
import {Clock} from '../components/Clock'
import { OrderKitchen } from '../components/OrderKitchen'
import { OrdersContext } from '../context/ordersContext.jsx'
import { ButtonSignOut } from '../components/ButtonSignOut'

export function Kitchen() {

  const { orders, getOrders, updateOrders } = useContext(OrdersContext)

  useEffect(() => { getOrders() }, [])

  const handleReady = (id) => {
    const confirmAlert = confirm('¿Enviar a salón?');
    if (confirmAlert === true) {
      updateOrders("Listo", id)
    }
  }

  return (
    <div className="bg-zinc-50 h-screen w-screen">
      <header className="flex justify-between">
        <ButtonSignOut />
        <Clock />
      </header>
      <main className="flex justify-around m-10 flex-wrap">
        {orders.map((order) => (
          order.estado === "Preparando" &&
          <OrderKitchen key={order.orderId} handleReady={handleReady} order={order} />
        ))}
      </main>
    </div>
  )
}
