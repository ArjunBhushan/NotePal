import React from 'react'
import ImageUpload from '../ImageUpload';

const Home = () => (
  <div>
    <p className="App-intro">
      Upload an image of your notes to get started.
    </p>
    <div>
      <ImageUpload /> 
    </div>
  </div>
)

export default Home
