import { useState } from 'react';
import { ProductsContext } from './ProductsContext';
import { db } from '../firebase/config'
import { collection, query, onSnapshot} from 'firebase/firestore'

export const SetProducts = ({ children }) => {

    const [allProducts, setProducts] = useState([]);

    const getProducts = () => {
        const q = query(collection(db, 'tables'));
        onSnapshot(q, (data) => {
            return setProducts(data.docs.map((product) => {
                return ({ ...product.data() })
            }))
        })
    };

    return (
        <TablesContext.Provider value={{
            allProducts,
            getProducts
        }}>
            {children}
        </TablesContext.Provider>
    )
}