import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreCollection from '../../components/ExploreCollection/ExploreCollection'
import ArtDisplay from '../../components/ArtDisplay/ArtDisplay'

const Home = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} setShowLogin={setShowLogin} />
      <Header />
      <ExploreCollection category={category} setCategory={setCategory} />
      <ArtDisplay category={category} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
