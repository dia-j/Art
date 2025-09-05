import React, { useContext } from 'react'
import './ArtDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import ArtItem from '../ArtItem/ArtItem'


const ArtDisplay = ({ category, searchQuery }) => {
  const { art_list } = useContext(StoreContext);

  const filteredList = art_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.genre && item.genre.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="art-display" id="art-display">
      <h2> Top Arts </h2>
      <div className="art-display-list">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <ArtItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No art items found.</p>
        )}
      </div>
    </div>
  );
};

export default ArtDisplay;
