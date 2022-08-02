import React, {useState,useEffect}  from 'react'
import {ButtonHome} from '../components/ButtonHome.jsx'
import Clock from '../components/Clock'
import { db } from '../firebase/config'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import {Order} from '../components/Order'
import { Cronometro } from '../components/Cronometro.jsx'


export function Kitchen() {
  const time = new Date();
  console.log(time.getDate())
  //time.setSeconds(time.getSeconds() - 600);

  const [orders,setOrders]=useState([])

  const callback1 = (data) => {
    return setOrders(data.docs.map((order) => 
      { 
        return ({...order.data() }) 
      }))
  }

  useEffect(() => {
    const getOrders1 = async () => {
      const q = query(collection(db, 'orders'), orderBy('date', 'desc'));
      onSnapshot(q, callback1)
    }
    getOrders1()
  }, [])

  return (
    <div>
    <header className="flex justify-between">
      <ButtonHome />
      <Clock />
    </header>
    <main className="flex justify-around m-10 flex-wrap">
       {orders.map((order)=>(
        <Order order={order}/>
      ))} 
    </main>
    <Cronometro expiryTimestamp={time} />
    </div>
  )
}
