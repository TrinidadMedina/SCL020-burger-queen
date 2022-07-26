import {
    collection,
    onSnapshot,
    query,
    orderBy,
    getDocs
  } from 'firebase/firestore';
import { db } from './firebase/config.js';
import React,{useState,useEffect} from 'react';

/*     const readingMenu = (callback) => {
        const q = query(collection(db, 'productos'));
        const productList = onSnapshot(q, callback);
        return productList;
    };

    const getMenu = () =>{
        let arr = [];
        readingMenu((product) => {
           product.forEach(doc=>{
            arr.push(doc.data())
           })
        })
        return arr;
    }

const allProducts = getMenu() //DUDA: SI METEMOS LA FUNCION ADENTRO DEL MENU NO MUESTRA LOS PRODUCTOS, PQ?
const Menu = () =>{
    const [state, setState] = useState('');
    return(
        <div className="dropdown">
            {allProducts.map(product=>(

                <div id={product.name} key={product.name} className="dropdown-content">
                    <a key={product.name}>{product.name}</a>
                </div>
            ))}
        </div>
    ); //DUDA 2: porque renderea solo una vez, cuando modificamos algo en el codigo, pero al actualizar se pone blanco. y se renderea dos veces cada vez que modificamos algo
};

export {Menu}; */

function MenuFirebase() {
    const [products,setProduct]=useState([])
    const fetchBlogs=()=>{
      //const response=collection(db,'productos');
      //const data=await getDocs(response);
      const q = query(collection(db, 'productos'));
      onSnapshot(q, (product)=>{
        product.forEach(item=>{
          setProduct([...products,item.data()])
        })
      });
    }
    useEffect(() => {
        fetchBlogs();
      }, []) 

    return (
      <div className="App">
        {
          products && products.map(product=>{ 
            //DUDA 3: porque no funciona con un foreach y si con un map (igual no funciona bien con el map)
            return(
              <div key={product.price} className="blog-container">
                <h4 key={product.name}>{product.category}</h4>
                <p key={product.category}>{product.name}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
  
  export default MenuFirebase;
