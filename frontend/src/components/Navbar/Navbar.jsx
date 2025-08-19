
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setShowLogin}) => {

   const [menu,setMenu] = useState("home");

   const{getTotalCartAmount} = useContext(StoreContext);
    


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-collection">
        <li><Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link></li>
        <li><a href='#explore-collection' onClick={()=>setMenu("collection")} className={menu==="collection"?"active":""}>collection</a></li>
        <li><a href='#art-display' onClick={()=>setMenu("top-arts")} className={menu==="top-arts"?"active":""}>top-arts</a></li>
        <li><a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a></li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> {/* important howto link page */} 
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={()=> setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar