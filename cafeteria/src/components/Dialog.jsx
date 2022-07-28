import React from 'react'


export function Dialog({show, product}) {
    if(!show){
        return <></>
    }
  return (
    <li className="categories"key={product.id} id={product.category}>
      <div className="div-left">
        <input className="check" type="checkbox"></input>
        <span className="product-name">{product.name}</span>
      </div>
      <div className="div-right">
        ${product.price}
      </div>
    </li>
  )}


  

