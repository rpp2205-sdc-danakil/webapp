import Individual_Review_Tile from './Individual_Review_Tile.jsx';
import Write_New_Review from './Write_New_Review.jsx';
import axios from 'axios';
import withClickData from '../hoc_click_data.jsx';
import SearchBar from './SearchBar.jsx';

class Reviews_List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      limitReached: false,
      sortOption: 'relevance',
      reviews: this.props.reviews,
      modalOpen: false,
      searchedTerm: null,
      sortedReviews: [],
      tiles: 2
    };

    this.handleClick = this.handleClick.bind(this);
    this.sort = this.sort.bind(this);
    this.search = this.search.bind(this);
  }

  search(word) {
    if (word === null && this.state.searchedTerm !== null) {
      console.log('testing 1 2 3');
      if (this.state.sortedReviews.length === 0) {
        this.setState({
          productId: this.props.productId,
          limitReached: false,
          reviews: this.props.reviews,
          sortOption: this.state.sortOption,
          searchedTerm: word,
          tiles: 2
        }, () => { console.log('new reviews'); })
      } else {
        this.setState({
          productId: this.props.productId,
          limitReached: false,
          reviews: this.state.sortedReviews,
          sortOption: this.state.sortOption,
          searchedTerm: word,
          tiles: 2
        }, () => { console.log('new reviews'); })
      }
    }

    else if (word !== null) {
      let newReviews = this.state.reviews.filter(review => {
        if (review.body.toLowerCase().includes(word.toLowerCase())) {
          return review;
        } else if (review.summary.toLowerCase().includes(word.toLowerCase())) {
          return review;
        } else if (review.reviewer_name.toLowerCase().includes(word.toLowerCase())) {
          return review;
        }
      });
      console.log(newReviews);
      this.setState({
        productId: this.props.productId,
        limitReached: false,
        reviews: newReviews,
        searchedTerm: word,
        //searchedReviews: newReviews
        tiles: 2
      }, () => { console.log('new reviews'); })
    } else {
      this.setState({searchedTerm: word}, () => { console.log('testing search'); });
    }
   }

  componentDidUpdate(prevState) {

    if (prevState.productId !== this.props.productId) {
      this.setState({
        productId: this.props.productId,
        limitReached: false,
        sortOption: 'relevance',
        reviews: this.props.reviews,
        tiles: 2
      })
    }


    else if (prevState.totalReviews !== this.props.totalReviews) {
      console.log(this.props.reviews);
      console.log(this.state.reviews);
      console.log(this.props.filteredReviewRatings);
      let array = this.props.filteredReviewRatings;
      let values = [];
      let newReviews = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i] === 1) {
          values.push(i + 1);
        }
      }

      if (values.length === 0) {
        this.setState({
          productId: this.props.productId,
          limitReached: false,
          sortOption: 'relevance',
          reviews: this.props.reviews,
          tiles: 2
        })
      } else {
        console.log('test 1 2 3');

        for (var j = 0; j < this.props.reviews.length; j++) {
          for (var k = 0; k < values.length; k++) {
            if (values[k] === this.props.reviews[j].rating) {
              newReviews.push(this.props.reviews[j]);
            }
          }
        }

        this.setState({
          productId: this.props.productId,
          limitReached: false,
          reviews: newReviews,
          tiles: 2
        })
      }
    }
  }

  handleClick(e) {
    if (e === 'closed') {
      this.setState({
        modalOpen: false
      })
    } else {
    e.preventDefault();
    if (e.target.className === "add_review") {
      this.setState({
        modalOpen: true
      })
    }
    else {
      this.setState({
        tiles: this.state.tiles+=2
      }, () => {
        if (this.state.tiles >= this.props.totalReviews) {
          console.log('limit reached');
          this.setState({
            limitReached: true
          })
        }
      })
    }
    this.props.interaction(e.target);
  }
  }

  sort(option) {
    var sort = option;
    var count = 500;
    if (sort === this.state.sortOption) {
      return null
    } else {
      axios.get(`/reviews/${this.state.productId}/${count}/${sort}`)
        .then((results) => {
          if(this.props.filteredReviewRatings.includes(1)) {
            let array = this.props.filteredReviewRatings;
            let values = [];
            let newReviews = [];

            for (var i = 0; i < array.length; i++) {
              if (array[i] === 1) {
                values.push(i + 1);
              }
            }

            for (var j = 0; j < results.data.results.length; j++) {
              for (var k = 0; k < values.length; k++) {
                if (values[k] === results.data.results[j].rating) {
                  newReviews.push(results.data.results[j]);
                }
              }
            }

            this.setState({
              reviews: newReviews,
              sortedReviews: newReviews,
              sortOption: sort,
              limitReached: false,
              tiles: 2
            })

          } else {
            this.setState({
              reviews: results.data.results,
              sortedReviews: results.data.results,
              sortOption: sort,
              limitReached: false,
              tiles: 2
            })
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    if (this.state.limitReached || (this.props.totalReviews > 0 && this.props.totalReviews <= 2)) {
      return (
        <div className="reviews_list">
        <SearchBar search={this.search}/>
        <div className="sort_options">
          <strong>{this.props.totalReviews} reviews, sorted by</strong>
          <select id="review_list_select" value={this.state.sortOption} onChange={(e) => {this.sort(e, false)}}>
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
            <option value="helpful">helpful</option>
          </select>
        </div>
        <div className={`reviews${this.state.tiles > 4 ? '_expand_mode' : ''}`}>
          <div>
            {this.state.reviews.slice(0, this.state.tiles).map(review => {
              return (
                <Individual_Review_Tile review={review} key={review.review_id}/>
              )
            })}
          </div>
          {this.state.modalOpen ? <Write_New_Review handleClick={this.handleClick} productId={this.props.productId} currentProduct={this.props.currentProduct} reviewsMeta={this.props.reviewsMeta}/> : <div></div>}
          <button onClick={this.handleClick} data-testid="add_review_button" className="add_review">Add Review</button>
        </div>
      </div>
      );
    }

    return (
      <div className="reviews_list">
        <SearchBar search={this.search}/>
        <div className="sort_options">
          <strong>{this.props.totalReviews} reviews, sorted by</strong>
          <select id="review_list_select" value={this.state.sortOption} onChange={(e) => {this.sort(e.target.value)}}>
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
            <option value="helpful">helpful</option>
          </select>
        </div>
        <div className={`reviews${this.state.tiles > 4 ? '_expand_mode' : ''}`}>
          <div data-testid="tiles">
            {this.state.reviews.slice(0, this.state.tiles).map(review => {
              return (
                <Individual_Review_Tile review={review} key={review.review_id}/>
              )
            })}
          </div>
        </div>
        {this.state.modalOpen ? <Write_New_Review handleClick={this.handleClick} productId={this.props.productId} currentProduct={this.props.currentProduct} reviewsMeta={this.props.reviewsMeta}/> : <div></div>}
        <button onClick={this.handleClick} data-testid="more_button" className="more_reviews">More Reviews</button>
        <button onClick={this.handleClick} data-testid="add_review_button" className="add_review">Add Review</button>
      </div>
    );
  }
}

export default withClickData(Reviews_List, 'ratings_and_reviews');