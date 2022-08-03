import React, { useState, useEffect } from 'react'
import { ButtonHome } from '../components/ButtonHome.jsx'
import Clock from '../components/Clock'
import { db } from '../firebase/config'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { OrderKitchen } from '../components/OrderKitchen'
import { Cronometro } from '../components/Cronometro.jsx'



export function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [condition, setCondition] = useState(false)

  const callback1 = (data) => {
    return setOrders(data.docs.map((order) => {
      return ({ ...order.data() })
    }))
  }

  useEffect(() => {
    console.log('render')

    const getOrders1 = async () => {
      const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
      onSnapshot(q, callback1)
    }
    getOrders1()
  }, [])


  return (
    <div className="bg-zinc-50">
      <header className="flex justify-between">
        <ButtonHome />
        <Clock />
      </header>
      <main className="flex justify-around m-10 flex-wrap">
        {orders.map((order) => (<>
          <OrderKitchen order={order} />
        </>
        ))}
      </main>
    </div>
  )
}
