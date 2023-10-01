import React from 'react';
import { QuantitySelectArr } from '../helperFunctions.jsx';

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="quantity-selector">
        <label htmlFor="quantity"></label>
        <select name="quantity" id="quantity" style={this.props.borderStyle} onChange={this.props.handleQuantitySelect}>
       {/* {this.props.quantity === 0 ? (<option key="defaultQuantityOption">Select Quantity</option>) : null} */}
        <option key="defaultQuantityOption" id="defaultQuantityOption">Select Quantity</option>
          {QuantitySelectArr(this.props.quantity).map((element, index) => {
            return (<option key={index} value={element}>{element}</option>)
          }) }
        </select>
      </div>
    )

  }
}

export default QuantitySelector;