import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ArtItem from '../../components/ArtItem/ArtItem';
import './CollectionPage.css';

import SearchBar from '../../components/SearchBar/SearchBar';

const CollectionPage = () => {
  const { art_list } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredList = art_list.filter((item) => {
    const matchesName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = (item.genre || item.type || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesName || matchesGenre;
  });

  return (
    <div className="collection-page">
      <h1>All Art Items</h1>
      <SearchBar onSearch={handleSearch} />
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
