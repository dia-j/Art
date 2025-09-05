import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'


const PlaceOrder = () => {

  const { getTotalCartAmount, token, art_list, cartItems, url, setCartItems } = useContext(StoreContext)

     const navigate = useNavigate();

     const [data,setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      houseNo:"",
      street:"",
      city:"",
      state:"",
      zip:"",
      country:"",
      phone:""
     })

     const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData((data) => ({...data, [name]: value}));
     }

     const placeOrder = async (event) => {
      event.preventDefault();
      let orderItems = [];
      art_list.forEach((item) => {
        if(cartItems[item._id] > 0){
          orderItems.push({
            _id: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: cartItems[item._id]
          });
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2
      };
      console.log('Sending orderData:', orderData);
      try {
        let response = await axios.post(url + "/api/order/place", orderData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Order placement response:', response);
        if(response.data.success){
          alert("Order placed successfully!");
          setCartItems({});
          // Save orderId to localStorage for Payment page
          localStorage.setItem('orderId', response.data.orderId);
          navigate("/payment");
        } else {
          alert("Error placing order");
        }
      } catch (error) {
        console.log('Order placement error:', error);
        alert("Error placing order (network or server error)");
      }
  }


  useEffect(()=>{
    if (!token) {
      navigate("/cart");
    }
    else if (getTotalCartAmount()===0){
      navigate("/cart");
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'> Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='houseNo' onChange={onChangeHandler} value={data.houseNo} type="text" placeholder='House No.' />

        <div className="multi-fields">
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        </div>
        <div className="multi-fields">
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          <input required name='zip' onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip-Code' />
        </div>
        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"> 
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit' > PROCEED TO PAYMENT </button>
        </div>


      </div>

    </form>
  )
}

export default PlaceOrder
