import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

  const [currState, setCurrState] = useState("Sign Up")

  const handleClose = () => {
    if (typeof setShowLogin === 'function') setShowLogin(false)
  }

  return (
  <div className='login-popup' onClick={handleClose}>
    <form className="login-popup-container" onClick={(e)=>e.stopPropagation()}>
      <div className="login-popup-title">
        <h2>{currState}</h2>
        <img onClick={handleClose} src={assets.cross_icon} alt="close" />
      </div>
      <div className="login-popup-inputs">
        {currState==="Login"?<></>:<input type="text" placeholder='Your Name' required/>}
        <input type="email" placeholder='Your Email' required/>
        <input type="password" placeholder='Password' required/>
      </div>
      <button>{currState==="Sign Up"?"Create Account":"Login"}</button>
      <div className="login-popup-condition">
        <input type="checkbox" required/>
        <p>By continuing, I agree to the terms of use & Privacy Policy</p>
      </div>
      {currState==="Login"
      ?
      <p>Don't have an account? <span onClick={()=>setCurrState("Sign Up")}>Sign Up Here</span></p>
      :
      <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
      }


    </form>
      
  </div>
  )
}

export default LoginPopup
