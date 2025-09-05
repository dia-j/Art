import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Payment from './pages/Payment/payment'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import CollectionPage from './pages/CollectionPage/CollectionPage';


const App = () => {

  const [showLogin, setShowLogin] =useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
          <Route path="/cart" element={<><Navbar setShowLogin={setShowLogin} /><Cart /></>} />
          <Route path="/place-order" element={<><Navbar setShowLogin={setShowLogin} /><PlaceOrder /></>} />
          <Route path="/payment" element={<><Navbar setShowLogin={setShowLogin} /><Payment /></>} />
          <Route path="/verify" element={<><Navbar setShowLogin={setShowLogin} /><Verify /></>} />
          <Route path="/myorders" element={<><Navbar setShowLogin={setShowLogin} /><MyOrders /></>} />
          <Route path="/collection" element={<><Navbar setShowLogin={setShowLogin} /><CollectionPage /></>} />
        </Routes>
      </div>
    <Footer/>
    </>

  )
}

export default App
