import React, { useContext, useEffect, useState } from 'react'
import './Payment.css'
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

const Payment = () => {
  const { token, url } = useContext(StoreContext);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Get orderId from localStorage or query params
    const orderId = localStorage.getItem('orderId');
    if (orderId && token) {
      axios.post(url + '/api/order/verify', { orderId, success: "true" }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.data.success) {
          setStatus('Payment status updated in database!');
        } else {
          setStatus('Payment update failed.');
        }
      })
      .catch(err => {
        setStatus('Error updating payment status.');
        console.log(err);
      });
    } else {
      setStatus('Order ID or token missing.');
    }
  }, [token, url]);

  return (
    <div>
      <b>Order added successfully</b>
      <div>{status}</div>
    </div>
  )
}

export default Payment
