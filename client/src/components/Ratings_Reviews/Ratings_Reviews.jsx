import Reviews_List from './Reviews_List.jsx';
import Rating_Breakdown from './Rating_Breakdown.jsx';
import withClickData from '../hoc_click_data.jsx';

class Ratings_Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredReviews: [],
      isToggled: [0,0,0,0,0],
      ratings: this.props.reviewsMeta.ratings
    };

    this.clearFilter = this.clearFilter.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
    this.search = this.search.bind(this);
  }

  search(reviews) {
    this.setState({filteredReviews: reviews});
   }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.setState({
        filteredReviews: [],
        isToggled: [0,0,0,0,0],
        ratings: this.props.reviewsMeta.ratings
      })
    }
  }

  clearFilter() {
    this.setState({
      filteredReviews: [],
      isToggled: [0,0,0,0,0]
    })
  }

  filterReviews(e) {
    const value = parseInt(e.target.innerText[0]);
    const reviews = this.props.reviews;
    let results = reviews.filter(result => {
      if (result.rating === value) {
        return result;
      }
    });

    if (this.state.isToggled[value - 1] === 1) {
      results = this.state.filteredReviews.filter(result => {
        if (result.rating !== value) {
          return result;
        }
      });
      this.state.isToggled[value - 1] = 0;
      this.setState({
        filteredReviews: results
      }, () => {console.log(this.state.filteredReviews)});
    } else if (this.state.filteredReviews.length > 0 ) {
      results = this.state.filteredReviews.concat(results);
      this.state.isToggled[value - 1] = 1;
      this.setState({
        filteredReviews: results
      }, () => {console.log(this.state.filteredReviews)});
    } else {
      this.state.isToggled[value - 1] = 1;
      this.setState({
        filteredReviews: results
      }, () => {console.log(this.state.filteredReviews)});
    }

    this.props.interaction(e.target);
  }

  render() {
    return (
      <div id="review_container">
        <Rating_Breakdown productId={this.props.productId} rating={this.props.rating} reviews={this.props.reviews} ratings={this.state.ratings} totalReviews={this.props.totalReviews} totalRatings={this.props.totalRatings} filterReviews={this.filterReviews} clearFilter={this.clearFilter} reviewsMeta={this.props.reviewsMeta}/>
        <Reviews_List search={this.search} productId={this.props.productId} reviews={this.state.filteredReviews.length > 0 ? this.state.filteredReviews : this.props.reviews} totalReviews={this.state.filteredReviews.length > 0 ? this.state.filteredReviews.length : this.props.totalReviews} currentProduct={this.props.currentProduct} reviewsMeta={this.props.reviewsMeta} filteredReviewRatings={this.state.isToggled}/>
      </div>
    )
  }
}

export default withClickData(Ratings_Reviews, 'ratings_and_reviews');