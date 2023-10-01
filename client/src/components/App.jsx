import React, { Suspense } from 'react';
const Overview = React.lazy(() => import('./Overview/overview.jsx'));
const Ratings_Reviews = React.lazy(() => import('./Ratings_Reviews/Ratings_Reviews.jsx'));
import axios from 'axios';
import { totalRatingsAndAvgRating } from './helperFunctions.jsx';
const Questions_Answers = React.lazy(() => import('./Questions_Answers/Questions_Answers.jsx'));
const RPList = React.lazy(() => import('./RelatedItems_Comparison/rp-list.jsx'));
const YourOutfit = React.lazy(() => import('./RelatedItems_Comparison/your-outfit.jsx'));
const Carousel = React.lazy(() => import('./RelatedItems_Comparison/Carousel.jsx'));
import TopBar from './TopBar.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentProductId: '',
                  reviewsMeta: {},
                  rating: 0,
                  totalRatings: 0,
                  reviews: [],
                  totalReviews: 0,
                  currentProduct: {}, //contains product name, category
                  defaultStyle: {},//contains price info(original_price, sale_price, thumbnail) //
                  styles: [],
                  background: "white",
                  keys: [...Object.keys(localStorage)],
                  related: [],
                  carousel: ['relatedProd', 'yourOutfit']
                  };
    this.handleProductIdChange.bind(this);
  }

  init(productId) {
    var count = 500;
    var sort = 'relevant';
    var promises = [axios.get(`/reviews/meta/${productId}`),
                    axios.get(`/reviews/${productId}/${count}/${sort}`),
                    axios.get(`/products/${productId}/styles`),
                    axios.get(`/products/${productId}`),
                    axios.get(`/products/${productId}/related`)];
    Promise.all(promises)
      .then(responseArr => {
        var reviewsAndRating = totalRatingsAndAvgRating(responseArr[0].data.ratings);
        this.setState({rating: reviewsAndRating[1],
                       reviewsMeta: responseArr[0].data,
                       ratings: responseArr[0].data.ratings,
                       totalRatings: reviewsAndRating[0],
                       reviews: responseArr[1].data.results,
                       totalReviews: responseArr[1].data.results.length,
                       currentProductId: productId,
                       currentProduct: responseArr[3].data,
                       styles: responseArr[2].data.results,
                       defaultStyle: responseArr[2].data.results.find(style => style["default?"]) || responseArr[2].data.results[0],
                       related: responseArr[4].data
                      });
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  }

  componentDidMount() {
    var prodId = window.location.pathname
    if(prodId.slice(1) !== '') {
      this.init(prodId.slice(1))
    } else {
      this.init('1');
    }
  }

  addProduct(e) {
    e.preventDefault();
    localStorage.setItem(
      this.state.currentProductId,
      JSON.stringify({
        rating: this.state.rating,
        product: this.state.currentProduct,
        defaultStyle: this.state.defaultStyle
      })
    )
    this.setState({keys: [...Object.keys(localStorage)]});
  }

  removeProduct(e) {
    e.preventDefault();
    var id = isNaN(e.target.id) || e.target.id.length === 0 ? this.state.currentProductId : e.target.id;
    console.log('id', id);
    localStorage.removeItem(id);
    this.setState({keys: [...Object.keys(localStorage)]})
  }

  handleProductIdChange(newId) {
    //can be used by all components for product ID change
    location.pathname = ('/' + newId.toString());
    console.log(newId);
    this.init(newId.toString());

  }

  handleOverviewBackground(color) {
    console.log(color);
    this.setState({background: color});
  }

  render() {
    //only render the children components after componentDidMount() is completed fetching data from server
    if (this.state.currentProductId === '') {
      return null;
    }
    return (
      <div style={{"backgroundColor": this.state.background}}>
        <Suspense fallback={<div>Loading...</div>}>
          <TopBar />
          <Overview productId={this.state.currentProductId} currentProduct={this.state.currentProduct} styles={this.state.styles} handleProductIdChange={this.handleProductIdChange} defaultStyle={this.state.defaultStyle} rating={this.state.rating} totalReviews={this.state.totalReviews} handleOverviewBackground={this.handleOverviewBackground.bind(this)} removeO={this.removeProduct.bind(this)} addToOutfit={this.addProduct.bind(this)}/>
          <RPList overview={this.state.currentProduct} productId={this.state.currentProductId} relatedProds={this.state.related} changeProduct={this.handleProductIdChange.bind(this)}/>
          <YourOutfit add={this.addProduct.bind(this)} removeProd={this.removeProduct.bind(this)} list={this.state.keys} changeProduct={this.handleProductIdChange.bind(this)}/>
          <ErrorBoundary>
            <Questions_Answers productId={this.state.currentProductId} productName={this.state.currentProduct.name} />
          </ErrorBoundary>
          <Ratings_Reviews productId={this.state.currentProductId} rating={this.state.rating} totalReviews={this.state.totalReviews} reviews={this.state.reviews} totalRatings={this.state.totalRatings} reviewsMeta={this.state.reviewsMeta} currentProduct={this.state.currentProduct}/>
        </Suspense>
      </div>
    )
  }
}

export default App;