import React, {useEffect, useContext} from 'react'
import { Clock } from '../components/Clock'
import { OrderKitchen } from '../components/OrderKitchen'
import { OrdersContext } from '../context/OrdersContext.jsx'
import { ButtonSignOut } from '../components/ButtonSignOut'

export function Kitchen() {

  const { orders, getOrders, updateOrders } = useContext(OrdersContext);

  useEffect(() => { getOrders() }, [])
    const handleReady = (id) => {
      updateOrders("Listo", id)
  }

  return (
    <div className="bg-zinc-50">
      <header className="flex justify-between">
        <ButtonSignOut />
        <Clock />
      </header>
      <main className="flex mx-auto flex-wrap px-12" >
        {orders.map((order) => (
          order.estado === "Preparando" &&
          <>
          <OrderKitchen key={order.orderId} handleReady={handleReady} order={order} />
          </>
        ))}
      </main>
    </div>
  )
}
