import React, {useState} from 'react'
import { Cronometro } from './Cronometro'
import { ModalConfirm } from './Confirm'

export function Order({ order, handleDelivery }) {

  const[modal, setModal] = useState(false)

  const toggleModal = () =>{
    if(order.estado == "Listo"){
      setModal(!modal)
    }
  }

  const toggleConfirm = (status) => {
    if(status){
      handleDelivery(order.docId)
    }else{
      toggleModal()
    }
  }

  return (
    <div className="bg-gray-100 h-20 font-bold shadow-lg text-xl rounded  m-2" > {/*bg-gray-100*/}
      <header className='flex text-base justify-between p-2'>
        <h3 className="text-center text-xl border-8 border-x-gray-100 h-10 w-10 bg-white shadow-lg rounded-lg"> {order.table}</h3>
        <Cronometro order={order} />
        <ModalConfirm modal={modal} toggleConfirm={toggleConfirm} message={"¿Entregado?"} />
      </header>
      <div className=" w-60 flex bg-white flex-col rounded shadow-lg">
        <p className='font-bold   self-center mb-3 text-sm '> {order.orderId.slice(8, 12)}</p>
        {order.products.map((product) => (
          <li key={order.orderId} className="flex justify-between font-normal list-none  px-2">
            <p> {product.name}</p>
            <p>{product.quantity}</p>
          </li>
        ))}
        <button onClick={toggleModal} className={order.estado == "Preparando" ? ' bg-gray-400  text-white font-bold m-4 p-2 rounded ' : "hover:bg-blue-400 bg-blue-700 text-white font-bold m-4 p-2 rounded"} >{order.estado}</button>
      </div>
    </div >
  )
}
