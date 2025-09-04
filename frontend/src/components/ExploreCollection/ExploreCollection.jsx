import React from 'react'
import './ExploreCollection.css'
import { type_list } from '../../assets/assets'

const ExploreCollection = ({category,setCategory}) => {
  return (
    <div className = 'explore-collection' id = 'explore-collection'>
        <h1> Explore our Collection </h1>
        <p className= 'explore-collection-text'> Explore our collection of unique Arts and Crafts representing our heritages </p>
        <div className="explore-collection-list">
            {type_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.type_name?"All":item.type_name)} key={index} className="explore-collection-list-item">
                        <img className={category===item.type_name?"active":""} src={item.type_image} alt="" />
                        <p>{item.type_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreCollection
