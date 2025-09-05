import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-inner">
        <div className="footer-content">

        <div className="footer-content-left">
            <img src={assets.wlogo} alt="" />
            <p>
                Art & Craft is a platform that showcases unique arts and crafts from various cultures, promoting heritage and creativity. Explore our collection to find one-of-a-kind pieces that tell a story and add a touch of culture to your life.
            </p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
            
        </div>

        <div className="footer-content-right">
            <h2> Contact US</h2>
            <ul>
                <li>+880 179-024-2292</li>
                <li>contact@artcraft.com</li>
            </ul>
        </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © ArtCraft.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer
