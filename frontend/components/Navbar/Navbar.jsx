
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({ setShowLogin, onSearch }) => {

   const [menu,setMenu] = useState("home");

  const{getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const location = useLocation();
  console.log('Navbar token value:', token);
   const navigate = useNavigate();

   const { setCartItems, url } = useContext(StoreContext);

   const logout = async () => {
    try {
      await fetch(url + "/api/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({})
      });
    } catch (e) {}
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/");
   }
    


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
        {location.pathname !== "/collection" && <SearchBar onSearch={onSearch} />}
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=> setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar