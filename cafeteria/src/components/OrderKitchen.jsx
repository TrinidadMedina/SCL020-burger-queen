import React, {useState} from 'react'
import { Cronometro } from './Cronometro'
import { ModalConfirm } from './Confirm'

export function OrderKitchen({ order, handleReady }) {
  const[modal, setModal] = useState(false)

  const toggleModal = () =>{
    setModal(!modal)
  }

  const toggleConfirm = (status) => {
    if(status){
      handleReady(order.docId)
    }else{
      toggleModal()
    }
  }

  return (
    <div className="bg-gray-100 flex flex-col m-4 shadow-lg">
      <header className='flex text-base font-bold justify-between m-3 mb-2'>
        <div className="text-center border-8 border-x-gray-100 h-10 w-10 bg-white shadow-lg rounded-lg">{order.table}</div>
        <h1 className="font-bold self-center mb-3">N° {order.orderId.slice(8, 12)}</h1>
        <Cronometro order={order} />
        <ModalConfirm modal={modal} toggleConfirm={toggleConfirm} message={"¿Enviar a salón?"}/>
      </header>
      <div className=" w-60 flex flex-col h-40 pt-2 justify-between rounded bg-white overflow-auto">
        <div className='flex flex-col'>
          {order.products.map((product) => (
            product.name==="Promo almuerzo" || product.name==="Brunch"?
            <>
            <div key={order.docId} className="flex justify-between px-3">
              <div >{product.name}</div>
              <div >{product.quantity}</div>
            </div>
            <div className='flex mx-4'>
              <div>
                {product.comestible.map((p)=>(
                  <li className="text-sm mr-1">{p}</li>
                ))}
              </div>
              <div>
                {product.bebestible.map((p)=>(
                  <p className="text-sm">- {p}</p>
                ))}
              </div>
            </div>
           
            </>
            : 
            <div key={order.docId} className="flex justify-between px-3">
              <div >{product.name}</div>
              <div >{product.quantity}</div>
            </div>
          ))}
        </div>
        <div className="justify-self-end content-end self-center">{order.observaciones}</div>
      </div>

      <button onClick={toggleModal} className=' bg-gray-500 hover:bg-blue-700  place-content-center text-white font-bold py-2 px-4 m-4 mt-3 rounded justify-self-end'>Listo</button>
    </div >
  )
}
