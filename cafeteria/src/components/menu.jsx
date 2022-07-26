import React from 'react'
import {Products} from './products'

export function Menu({productos}) {
    return (
        <ul>
            {productos.map((producto)=>(
                <Products productos={producto}/>
            ))}

        </ul>
    )
}
