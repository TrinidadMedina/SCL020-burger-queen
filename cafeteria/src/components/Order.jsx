import React from 'react'

export function Order({ allOrders }) {
  console.log(allOrders)

  return (
    <div> Orden:
      {allOrders.map((item) => {
        item.products.map((product) => {
          console.log(product.name)
          return (
            <p>{product.name}</p>
          )

        })
      })}

    </div>




  )
}
