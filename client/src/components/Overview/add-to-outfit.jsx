//import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//const regularHeart = require('@fortawesome/free-regular-svg-icons').faHeart;
//const solidHeart = require('@fortawesome/free-solid-svg-icons').faHeart;
import withClickData from '../hoc_click_data.jsx';

const AddToOutfit = (props) => {
  const initialState = localStorage.getItem(props.productId) ? true : false;
  const [clicked, toggleClicked] = useState(initialState);

  return (
    <div className="add-to-outfit" onClick={(e) => {
      toggleClicked(!clicked);
      props.interaction(e.currentTarget);
      if (clicked) {
        console.log('removeo', props.removeO)
        props.removeO(e)
      } else {
        props.addToOutfit(e)
      }
    }}>
     {clicked ? <i className="fa-solid fa-heart" id="solidHeart"></i> : <i className="fa-regular fa-heart" id="regularHeart"></i>}
    </div>
  )
}



export default withClickData(AddToOutfit, 'overview');

//{clicked ? <FontAwesomeIcon icon={solidHeart} id="solidHeart"/> : <FontAwesomeIcon icon={regularHeart} id="regularHeart"/>}