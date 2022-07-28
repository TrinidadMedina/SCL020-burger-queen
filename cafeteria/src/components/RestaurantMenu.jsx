import React, {useState} from 'react'
import {Dialog} from './Dialog'
import menu from './data.json'

//actualizar arreglo segun horario
//categorias, mostrar una vez las que estan activas #b5b5b5;

export function RestaurantMenu(){
    const [showDialog, setShowDialog] = useState(false);
    const [food, setFood] = useState([]);

    const handleShowItems = (category) =>{
        setFood(menu[category]);
        setShowDialog(true)        
    }
    const handleCloseItems = ()=>{
            setShowDialog(false)  
    }
    return (
        <>
        <div id="header">   
			<nav className="nav"> 
                    {Object.keys(menu).map((category) => ( //porque no se puede usar el forEach
                        <div className="container">
                        <ul key={category} onClick={()=>{handleShowItems(category)}} >
                            <a>{category}</a>
                            {food.map((product)=>
                                product.category===category?
                                    <Dialog show={showDialog} product={product}/>:null
                            )}
                        </ul>
                        </div>
                    ))}    
            </nav>
        </div>
        </>
    )
} 

//const unique = Array.from(new Set(allProducts.map(item => item.category)));
/* {food.map((product)=>(
    <Dialog show={showDialog} product={product}/>
))} */
