import React from 'react'


export function Product({show, product, toggleProduct}) {
  const handleCheck = () =>{
    toggleProduct(product.name)
  }
    if(!show){
        return <></>
    }
  return (
    <li className="categories"key={product.id} id={product.category}>
      <div className="div-left">
        <input className="check" type="checkbox" onChange={handleCheck} checked={product.selected}></input>
        <span className="product-name">{product.name}</span>
      </div>
      <div className="div-right">
        ${product.price}
      </div>
    </li>
  )}


  

