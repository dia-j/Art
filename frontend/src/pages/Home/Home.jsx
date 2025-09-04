import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreCollection from '../../components/ExploreCollection/ExploreCollection'
import ArtDisplay from '../../components/ArtDisplay/ArtDisplay'

const Home = () => {

    const [category,setCategory] = useState("All");



  return (
    <div>
      <Header />
      <ExploreCollection category={category} setCategory={setCategory} />
      <ArtDisplay category= {category}/>
    </div>
  )
}

export default Home
