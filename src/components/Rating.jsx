import React from 'react'
import { ratingInfo } from "../ratingInfo";
import Stars from './Stars';


function Rating() {
  
  return (
    <div className='ratings-container'>
      {ratingInfo.map((rating, idx) => (
        <div key={idx} className='rating'>
          <h3>{rating.author}</h3>
          <div className="star-container">
            {rating.stars && <Stars />}
          </div>
          <p>"{rating.review}"</p>
        </div>
      ))}
    </div>
  )
}

export default Rating