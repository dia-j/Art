import React, { useContext } from 'react'
import './ArtItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ArtItem = ({id,name,price,description,image}) => {

    const{cartItems,addToCart,removeFromCart} = useContext(StoreContext);


  return (
    <div className='art-item'>
        <div className="art-item-img-container">
            <img className='art-item-image' src={image} alt="" />
            {!cartItems[id] 
              ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
              :<div className='art-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />

              </div>
            }
        </div>
        <div className="art-item-info">
            <div className="art-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="art-item-desc">{description}</p>
            <p className="art-item-price">${price}</p>
        </div>
    </div>
  )
}

export default ArtItem
