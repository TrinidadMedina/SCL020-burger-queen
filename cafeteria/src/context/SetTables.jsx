import { useState } from 'react';
import { TablesContext } from './TablesContext';
import { db } from '../firebase/config'
import { collection, query, onSnapshot, orderBy, updateDoc, getDocs, doc } from 'firebase/firestore'

export const SetTables = ({ children }) => {

    const [allTables, setTables] = useState([]);

    const getTables = () => {
        const q = query(collection(db, 'tables'));
        onSnapshot(q, (data) => {
            return setTables(data.docs.map((table) => {
                return ({ ...table.data() })
            }))
        })
    };

    const updateTables = async (estado, id) => {
        updateDoc(doc(db, 'tables', id), {
            active: estado
        })
    }

    return (
        <TablesContext.Provider value={{
            allTables,
            getTables,
            updateTables
        }}>
            {children}
        </TablesContext.Provider>
    )
}

// const q = query(collection(db, 'tables'), orderBy('number', 'desc'));

