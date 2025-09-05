import React from 'react'
import './ExploreCollection.css'
import { type_list } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

const ExploreCollection = ({ category, setCategory }) => {
    const navigate = useNavigate();
    return (
        <div className="explore-collection" id="explore-collection">
            <h1> Explore our Collection </h1>
            <p className="explore-collection-text"> Explore our collection of unique Arts and Crafts representing our heritages </p>
            <div className="explore-collection-list">
                {type_list.map((item, index) => {
                    return (
                        <div onClick={() => setCategory(prev => prev === item.type_name ? "All" : item.type_name)} key={index} className="explore-collection-list-item">
                            <img className={category === item.type_name ? "active" : ""} src={item.type_image} alt="" />
                            <p>{item.type_name}</p>
                        </div>
                    );
                })}
            </div>
            {/* Removed View Collection button as requested */}
            <hr />
        </div>
    );
};

export default ExploreCollection;
