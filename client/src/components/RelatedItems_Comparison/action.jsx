//import React from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faStar, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
//import { faX } from '@fortawesome/free-solid-svg-icons';
import withClickData from '../hoc_click_data.jsx';



function Action (props) {

  return(
    props.actionButton ? (
      <div id="action">
        <i className="fa-regular fa-star star" onClick={ (e) => {props.showModal(props.info); props.interaction(e.currentTarget)}}></i>
      </div>
    ) : (
      <div id="action">
        <i id={props.info.id} className="fa-regular fa-circle-xmark" onClick={(e) => {props.removeProd(e); props.interaction(e.currentTarget)}}></i>
      </div>
    )
  )
}

export default withClickData(Action, 'Related Items & Comparison');


{/* <FontAwesomeIcon className="star" icon={faStar} onClick={ (e) => {props.showModal(props.info); props.interaction(e.currentTarget)}}/> */}
{/* <FontAwesomeIcon id={props.info.id} className="remove" icon={faXmarkCircle} onClick={(e) => {props.removeProd(e); props.interaction(e.currentTarget)}}/> */}
{/* <i className="fa-regular fa-star star" onClick={ (e) => {props.showModal(props.info); props.interaction(e.currentTarget)}}></i> */}
{/* <i id={props.info.id} className="fa-regular fa-star remove" onClick={(e) => {props.removeProd(e); props.interaction(e.currentTarget)}}></i> */}
