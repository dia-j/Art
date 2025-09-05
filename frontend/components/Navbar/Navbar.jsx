
import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Navbar = ({ setShowLogin, onSearch }) => {

   const [menu,setMenu] = useState("home");

  const{getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  useEffect(() => {
    // Fetch user info if logged in
    const fetchUserInfo = async () => {
      if (token) {
        try {
          const res = await fetch(url + '/api/user/list');
          const data = await res.json();
          if (data.success && Array.isArray(data.data)) {
            // Find user by token (decode token to get id, or match by email in localStorage if available)
            // For demo, just pick first user with token
            // Ideally, backend should have /api/user/me endpoint
            const user = data.data.find(u => u._id === JSON.parse(atob(token.split('.')[1])).id);
            if (user) setUserInfo({ name: user.name, email: user.email });
          }
        } catch (e) {}
      }
    };
    fetchUserInfo();
  }, [token]);
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
        <li>
          <Link
            to='/'
            onClick={e => {
              setMenu("home");
              if (location.pathname === '/') {
                e.preventDefault();
                window.location.reload();
              }
            }}
            className={menu==="home"?"active":""}
          >home</Link>
        </li>
        {location.pathname === '/' && (
          <>
            <li><a href='#explore-collection' onClick={()=>setMenu("collection")} className={menu==="collection"?"active":""}>collection</a></li>
            <li><a href='#art-display' onClick={()=>setMenu("top-arts")} className={menu==="top-arts"?"active":""}>top-arts</a></li>
          </>
        )}
        <li><a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a></li>
      </ul>
      <div className="navbar-right">
        {location.pathname !== "/collection" && <SearchBar onSearch={onSearch} />}
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=> setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile' style={{position:'relative'}}>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate("/myorders")}> <img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            <hr />
            <li
              onMouseEnter={()=>setProfileDropdown(true)}
              onMouseLeave={()=>setProfileDropdown(false)}
              onClick={()=>setProfileDropdown(v=>!v)}
              style={{position:'relative'}}
            >
              <img src={assets.profile_icon} alt="" /><p>Profile</p>
              {profileDropdown && (
                <div className="profile-dropdown" style={{position:'absolute',top:'100%',right:0,background:'#fff',border:'1px solid #ccc',borderRadius:'6px',padding:'12px',minWidth:'180px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
                  <div style={{marginBottom:'8px',fontWeight:'bold'}}>Name: {userInfo.name}</div>
                  <div>Email: {userInfo.email}</div>
                </div>
              )}
            </li>
          </ul>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar