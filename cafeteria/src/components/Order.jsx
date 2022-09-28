import React, { useState } from 'react'
import { Cronometro } from './Cronometro'
import { ModalConfirm } from './Confirm'

export function Order({ order, handleDelivery }) {

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    if (order.estado == "Listo") {
      setModal(!modal)
    }
  }

  const toggleConfirm = (status) => {
    if (status) {
      handleDelivery(order.docId)
    } else {
      toggleModal()
    }
  }

  return (
    <div className="bg-orange-60  font-bold shadow-lg text-xl rounded m-2 h-[90%] flex-col  text-dark-green" >
      <header className='flex text-base font-bold justify-between m-1 mr-2 h-10'>
        <div className="text-center border-8 border-x-gray-100 h-10 w-10 bg-white shadow-lg rounded-lg">{order.table}</div>
        <p className='self-center text-sm'> N° {order.orderId.slice(8, 12)}</p>
        <Cronometro order={order} />
        <ModalConfirm modal={modal} toggleConfirm={toggleConfirm} message={"¿Entregado?"} />
      </header>
      <div className="w-52 h-[60%] flex-col bg-white overflow-auto rounded pt-1">
        {order.products.map((product) => (
          <li key={order.orderId} className="flex justify-between font-normal text-[18px] px-2">
            <p className='leading-snug'> {product.name}</p>
            <p className='leading-snug'>{product.quantity}</p>
          </li>
        ))}
      </div>
      <div className='flex justify-center '>
        <button onClick={toggleModal} className={order.estado == "Preparando" ? 'bg-orange-40 mt-2 text-white font-bold p-1 rounded w-2/3' : 'bg-orange-1 mt-2 hover:bg-dark-green text-white font-bold p-1 rounded w-2/3'} >{order.estado}</button>
      </div>
    </div >
  )
}
