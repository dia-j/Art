import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)
import axios from "axios";

const StoreContexPorvider = (props) => {

    
    const [cartItems,setCartItems] = useState({});
    const url ="http://localhost:4000"
    const [token,setToken] = useState(localStorage.getItem("token") || "");
    const [art_list,setArtList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        }
        else{
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token){
            await axios.post(url+"/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } })
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]-1}))
        if (token) {
            await axios.delete(url+"/api/cart/remove", {
                headers: { Authorization: `Bearer ${token}` },
                data: { itemId }
            })
        }
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

    const fetchArtList = async () => {
        const response = await axios.get(url+"/api/art/list");
        setArtList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.get(url+"/api/cart/get",{
            headers: { Authorization: `Bearer ${token}` }
        })
        setCartItems(response.data.cartData || {});

    }

    useEffect(() => {
        async function loadData() {
            await fetchArtList();
            if (localStorage.getItem("token")) {
                 setToken(localStorage.getItem("token"));
                 await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        art_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken: (t) => {
            setToken(t);
            if (!t) setCartItems({});
        }
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    

    )
 }

export default StoreContexPorvider;