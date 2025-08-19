import { createContext, useEffect, useState } from "react";
import {art_list} from '../assets/assets';

export const StoreContext = createContext(null)

const StoreContexPorvider = (props) => {

    const [cartItems,setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        }
        else{
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount =0;
        for (const item in cartItems) 
        {
            if(cartItems[item]>0) {
                let  itemInfo = art_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }         
        }
        return totalAmount;
    }

    const contextValue = {
        art_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    

    )
 }

export default StoreContexPorvider;