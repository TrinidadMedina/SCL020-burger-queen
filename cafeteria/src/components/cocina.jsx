import React from 'react'
import { Link } from "react-router-dom";

export const Cocina = () => {
    return (<>
        <Link to="/">Home</Link>
        <Link to="/RestaurantMenu">Menú</Link>
        <Link to="/cocina">Cocina</Link>
        <div>cocina</div>
    </>
    )
}
