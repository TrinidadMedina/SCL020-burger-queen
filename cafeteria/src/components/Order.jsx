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
    <div className="bg-gray-100 font-bold shadow-lg text-xl rounded m-2 max-h-64 h-48" > {/*bg-gray-100*/}
      <header className='flex text-base font-bold justify-between m-1 mr-2 h-10'>
        <div className="text-center border-8 border-x-gray-100 h-10 w-10 bg-white shadow-lg rounded-lg">{order.table}</div>
        <p className='self-center text-sm'> N° {order.orderId.slice(8, 12)}</p>
        <Cronometro order={order} />
        <ModalConfirm modal={modal} toggleConfirm={toggleConfirm} message={"¿Entregado?"}/>
      </header>
      <div className="w-52 h-36 flex flex-col h-38 justify-between bg-white overflow-auto rounded">  
        {order.products.map((product) => (
          <li key={order.orderId} className="flex justify-between font-normal text-[15px] px-2">
            <p> {product.name}</p>
            <p>{product.quantity}</p>
          </li>
        ))}
        <button onClick={toggleModal} className={order.estado == "Preparando"? 'bg-gray-400 text-white font-bold m-4 p-2 rounded' : 'hover:bg-blue-400 bg-blue-700 text-white font-bold m-4 p-2 rounded'} >{order.estado}</button>
      </div>
    </div >
  )
}
