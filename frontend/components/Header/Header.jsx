import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Welcome to ArtCraft</h2>
        <p>Explore our collection of unique Arts and Crafts representing our heritages</p>
        <button onClick={() => navigate('/collection')}>View Collection</button>
      </div>
    </div>
  );
};

export default Header;
