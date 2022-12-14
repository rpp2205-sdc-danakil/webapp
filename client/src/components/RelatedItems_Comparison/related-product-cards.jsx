import React, { useState, useEffect } from 'react';
import Stars from '../FiveStars.jsx';
import Action from './action.jsx';
import withClickData from '../hoc_click_data.jsx';

function RPC (props) {

  if(props.info.length === 0) {
    return ('')
  } else {
    if(props.info.defaultStyle.sale_price === null) {
      var price = props.info.defaultStyle.original_price;
    } else {
      var price = props.info.defaultStyle.sale_price;
    }
    if(props.info.defaultStyle.photos[0].thumbnail_url === null) {
      var photo = './img/NoImageThumbnail.png';
    } else {
      var photo = props.info.defaultStyle.photos[0].thumbnail_url;
    }
    return(
      <div className="card">
        <Action info={props.info.product} prodName={props.info.product.name} actionButton={props.action} showModal={props.show} removeProd={props.remove}/>
        <div id={props.info.product.id} onClick={ (e) => {props.redirect(props.info.product.id); console.log(e.target.nodeName); props.interaction(e.target)}}>
          <p>
            <img className="rpcThumbnails" alt="rpc thumbnails" src={photo}></img>
          </p>
          <p>{props.info.product.category}</p>
          <p>{props.info.product.name}</p>
          <p>{price}</p>
          <Stars rating={props.info.rating}/>
        </div>
      </div>
    )
  }
}

export default withClickData(RPC, 'Related Items & Comparison');