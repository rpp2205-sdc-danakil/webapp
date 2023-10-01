import React from 'react';
import Stars from '../FiveStars.jsx';
import axios from 'axios';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      var category = this.props.currentProduct.category;
      var name = this.props.currentProduct.name;
      var description = this.props.currentProduct.description;
      var sale_price = this.props.styleObj.sale_price;
      var original_price = this.props.styleObj.original_price;
      return (<div className="product-info" data-testid="test-ProductInfo">
        <div className="product-info-line1">
          <Stars rating={this.props.rating}/>
          <a href="#review_container" id="readAllReviews">{this.props.totalReviews > 0 ? 'Read All ' + this.props.totalReviews + ' Reviews' : null}</a>
        </div>
        {/* <div id="ratingScore"><p>{this.props.rating}</p></div> */}
        <div id="category"><p>{'Category > ' + category}</p></div>
        <div id="title"><p>{name}</p></div>
        {/* <div id="description"><p>{'Description: ' + description}</p></div> */}
        <div className="price">
          <p id="originalprice">{sale_price ? <strike style={{"color": "red"}}>{'$' + String(original_price)}</strike> : '$' + original_price}</p>
          {sale_price ? <p id="saleprice">{'$' + sale_price}</p> : null}
        </div>
      </div>)
    }
}

export default ProductInfo;