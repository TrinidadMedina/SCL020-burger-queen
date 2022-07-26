import React from 'react'

export function Products({productos}) {
    const {name, price, category, status} = productos;
  return (
    <li>{category}
        <p>{name}</p>
        <p>{price}</p>
    </li>
  )
}
