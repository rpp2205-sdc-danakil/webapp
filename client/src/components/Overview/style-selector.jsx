import React from 'react';
import StyleEntry from './style-entry.jsx';
import axios from 'axios';

const StyleSelector = (props) => {
  return (
    <div className="style-selector"  data-testid="test-StyleSelector">
      <p>{'Style > ' + props.styleObj.name}</p>
      <div className="styles">
      {props.styles.map((style, index) => {
        return (
          <div className="styleEntries" key={index}>
          <StyleEntry id={style.id} styleObj={style} changeStyle={props.changeStyle} highlight={props.styleId === style.id}/></div>
          //<StyleEntry id={style.style_id} styleObj={style} changeStyle={props.changeStyle} highlight={props.styleId === style.style_id}/>
        )
      })}
      </div>
    </div>
  )
}

export default StyleSelector;