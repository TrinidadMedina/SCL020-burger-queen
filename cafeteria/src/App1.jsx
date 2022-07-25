import React from 'react'
// import Outlet from 'react-router-dom'

const st = "CACA"
const st2 = "PIPI"

const fn1 = (algo) => {
  return (<h1>{algo}</h1>)
}

export const App = () => {
  return (
    <div>
      <button style={{ color: 'red' }} onClick={function () { fn1(st) }} >Botoncito</button>
      <button style={{ color: 'red' }} onClick={function () { fn1(st2) }} >Botoncito</button>
    </div>
  )
}



