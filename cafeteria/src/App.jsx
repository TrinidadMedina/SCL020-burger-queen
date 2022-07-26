import React, {useState} from 'react'
import {Menu} from './components/menu'
import {getProducts} from './components/data'

const products = getProducts();
export function App() {
    return (
        <>
        <Menu productos={products}/>
        </> 
    )
}
