import React from 'react';

class SizeSelector extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <div className="size-selector">
        <label htmlFor="size"></label>
        <select name="size" id="size" onChange={this.props.handleSizeSelect} style={this.props.borderStyle}>
          <option key="defaultSizeOption" id="defaultSizeOption">Select Size</option>
          {Object.keys(this.props.sizeAndQuantityObj).map((element, index) => {
            return (<option key={index} value={element}>{element}</option>)
          })}
        </select>
      </div>
    )

  }
}

export default SizeSelector;