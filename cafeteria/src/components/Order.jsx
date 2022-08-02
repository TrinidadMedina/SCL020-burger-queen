import React from 'react'
import { Cronometro } from './Cronometro'


export function Order({ order }) {

  return (
    <div className="flex flex-col p-4 w-1/6 h-60 items-center outline-1 rounded overflow-hidden shadow-lg font-bold">
        Orden: {order.orderId}
        <div>
            {order.products.map((product) => (
                <li className="p-4 font-normal">
                    {product.name}
                </li>
            ))}
        </div>
    </div>
  )
}
