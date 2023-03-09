import { useState, createContext } from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    // put our state

    const [user, setUser] = useState(false);
    const [task, setTask] = useState([]);
    const [completedTask, setCompletedTask] = useState([])
    // const [activeCat, setActiveCat] = useState('Sandwiches');
    // const [cart, setCart] = useState(
    //     {
    //         orderId: "",
    //         checkoutDone: false,
    //         updatedAt: "",
    //         orderItems: [],
    //         totalQty: 0,
    //         orderTotal: 0,
    //     }
    // );

    return (
        <AppContext.Provider value={{
            user, setUser,

            task, setTask,

            completedTask, setCompletedTask

        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;