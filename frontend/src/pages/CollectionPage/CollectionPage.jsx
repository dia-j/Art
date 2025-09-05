import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ArtItem from '../../components/ArtItem/ArtItem';
import './CollectionPage.css';

import SearchBar from '../../components/SearchBar/SearchBar';

const CollectionPage = () => {
  const { art_list } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredList = art_list.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = (item.genre || item.type || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMin = minPrice === "" || item.price >= Number(minPrice);
    const matchesMax = maxPrice === "" || item.price <= Number(maxPrice);
    return (matchesName || matchesGenre) && matchesMin && matchesMax;
  });

  return (
    <div className="collection-page">
      <h1>All Art Items</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="price-range-filter" style={{margin: '20px 0', display: 'flex', gap: '16px', alignItems: 'center'}}>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            placeholder="0"
            style={{marginLeft: '8px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', width: '80px'}}
            min="0"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="Any"
            style={{marginLeft: '8px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc', width: '80px'}}
            min="0"
          />
        </label>
      </div>
      <div className="collection-list">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <div key={index} className="collection-art-item">
              <ArtItem
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                genre={item.genre || item.type || 'N/A'}
              />
            </div>
          ))
        ) : (
          <p>No art items found.</p>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
