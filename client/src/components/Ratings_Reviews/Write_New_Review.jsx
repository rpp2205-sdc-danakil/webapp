import React from 'react';
import { RiCloseLine } from "react-icons/ri";
import Stars from '../FiveStars.jsx';
import axios from 'axios';
import withClickData from '../hoc_click_data.jsx';
import StarRating from './Star_Rating.jsx';
import config from './config_rr.js';
const data = require("./data.json");

class Write_New_Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: parseInt(this.props.productId),
      productName: this.props.currentProduct.name,
      starRating: 1,
      recommend: true,
      characteristics: {},
      reviewSummary: '',
      reviewBody: '',
      reviewBodyCount: 50,
      photos: [],
      assets: [],
      nickname: '',
      email: ''
    };

    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      thise.setState({
        productId: this.props.productId,
        productName: this.props.currentProduct.name,
        starRating: '',
        recommend: '',
        characteristics: {},
        reviewSummary: '',
        reviewBody: '',
        photos: [],
        assets: [],
        nickname: '',
        email: ''
      })
    }
  }

  closeModal() {
    this.props.handleClick('closed');
  }

  handleChange(event) {
    event.preventDefault();
    if (event.target.className === "review_summary"){
      this.setState({reviewSummary: event.target.value});
    } else if (event.target.className === "review_body"){
      let length = 50 - event.target.value.length;
      this.setState({
        reviewBody: event.target.value,
        reviewBodyCount: length
      });
    } else if (event.target.className === "review_name"){
      this.setState({nickname: event.target.value});
    } else if (event.target.className === "review_email"){
      this.setState({email: event.target.value});
    }
  }

  handleClick(e, rating) {

    console.log(e);
    if(e.target.className === "rating") {
      this.setState({
        starRating: rating
        }, () => { console.log(this.state.starRating) }
      )
    } else if (e.target.id === "yes" || e.target.id === "no") {
      console.log('hello, this is a test');
      let value = e.target.value === "yes" ? true : false;
      this.setState({recommend: value}, () => {console.log(this.state.recommend)});
    } else if (e.target.className === "characteristic_rating"){
      let id = e.target.id;
      let value = e.target.value;
      this.state.characteristics[id] = parseInt(value);
      this.setState({characteristics: this.state.characteristics}, () => {console.log(this.state.characteristics)});
    }

    this.props.interaction(e.target);
  }

  uploadImage(files) {
    console.log(files);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", `${config.cloudinary_preset}`);

    axios.post(`https://api.cloudinary.com/v1_1/${config.cloudinary_name}/image/upload`, formData)
      .then(response => {
        let url = response.data.url;
        this.state.photos.push(url)
        this.state.assets.push(response.data);
        console.log('response data', response);
        console.log(this.state.photos);
        this.setState({
          photos: this.state.photos,
          assets: this.state.assets
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    var object = {
      product_id: this.state.productId,
      rating: this.state.starRating,
      summary: this.state.reviewSummary,
      body: this.state.reviewBody,
      recommend: this.state.recommend,
      name: this.state.nickname,
      email: this.state.email,
      photos: this.state.photos,
      characteristics: this.state.characteristics
    };

    console.log(object);

    axios.post('/reviews', object)
    .then((response) => {
      console.log(response);
      this.closeModal();
    })
    .catch((error) => { console.error(error); });

    this.props.interaction(e.target);
  }

  render() {
    return (
      <div className="darkBG">
        <div className="modal_centered">
          <div className="modal_new_review">
            <button className="modal_closeBtn" onClick={() => this.closeModal()}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <h2 className="review_form_header">Write Your Review</h2>
            <h3 className="review_form_sub_header">About {this.state.productName}</h3>
            <form className="new_review_form" onSubmit={this.handleSubmit}>
              <label className="review_form_label">
                <h4 className="review_form_label_text">Overall Rating</h4>
                <StarRating click={this.handleClick}/>
              </label>
              <label className="review_form_label">
                <fieldset className="rf_fieldset">
                  <legend className="rf_legend_header">Recommend</legend>
                  <div>
                    <div>
                      <input type="radio" id="yes" name="input" value="yes" onClick={this.handleClick}/>
                      <label htmlFor="yes">Yes</label>
                    </div>
                    <div>
                      <input type="radio" id="no" name="input" value="no" onClick={this.handleClick}/>
                      <label htmlFor="no">No</label>
                    </div>
                  </div>
                </fieldset>
              </label>
              <label className="review_form_label">
                {
                  Object.entries(this.props.reviewsMeta.characteristics).map(([key, val]) =>
                    <fieldset className="rf_fieldset_characteristics" key={val.id}>
                      <legend className="rf_legend_header">{key}</legend>
                      <div className="characteristics_review_form">
                        <div>
                          <input type="radio" id={val.id} name={key} value={1} className="characteristic_rating" onClick={this.handleClick}/>
                          <label htmlFor={val.id}>1</label>
                          <div className="characteristic_meaning">{data.characteristics[key][1]}</div>
                        </div>
                        <div>
                          <input type="radio" id={val.id} name={key} value={2} className="characteristic_rating" onClick={this.handleClick}/>
                          <label htmlFor={val.id}>2</label>
                          <div className="characteristic_meaning">{data.characteristics[key][2]}</div>
                        </div>
                        <div>
                          <input type="radio" id={val.id} name={key} value={3} className="characteristic_rating" onClick={this.handleClick}/>
                          <label htmlFor={val.id}>3</label>
                          <div className="characteristic_meaning">{data.characteristics[key][3]}</div>
                        </div>
                        <div>
                          <input type="radio" id={val.id} name={key} value={4} className="characteristic_rating" onClick={this.handleClick}/>
                          <label htmlFor={val.id}>4</label>
                          <div className="characteristic_meaning">{data.characteristics[key][4]}</div>
                        </div>
                        <div>
                          <input type="radio" id={val.id} name={key} value={5} className="characteristic_rating" onClick={this.handleClick}/>
                          <label htmlFor={val.id}>5</label>
                          <div className="characteristic_meaning">{data.characteristics[key][5]}</div>
                        </div>
                      </div>
                    </fieldset>
                  )
                }
              <label className="review_form_label">
                <fieldset>
                  <legend className="rf_header">Photos</legend>
                    <div className="rf_photos">
                      {this.state.assets.length < 5 ?
                        <div>
                          <input type="file" className="photos" onChange={(e) => {this.uploadImage(e.target.files)}}/>
                        </div> :
                        null
                      }
                      {this.state.assets.map(asset => {
                          return (
                            <div className="review_photo" key={asset.asset_id}>
                              <img className="review_photo" alt="review photo" src={asset.url}/>
                            </div>
                          )
                        })
                      }
                    </div>
                </fieldset>
              </label>
              </label>
              <label className="review_form_label">
                <h4 className="rf_header">Add a headline</h4>
                <input type="text" value={this.state.reviewSummary} className="review_summary" required maxLength="60" placeholder="Example: Best purchase ever!" onChange={this.handleChange}/>
              </label>
              <label className="review_form_label">
                <h4 className="rf_header">Add a written review</h4>
                <textarea value={this.state.reviewBody} onKeyDown={this.__handleKeyDown} className="review_body" required minLength="50" maxLength="1000" placeholder="Why did you like the product or not?" onChange={this.handleChange}/>
                {this.state.reviewBodyCount > 0 ?
                  <div>Minimum required characters left: [{this.state.reviewBodyCount}]</div> :
                  <div>Minimum reached</div>
                }
              </label>
              <label className="review_form_label">
                <h4 className="rf_header">Choose your nickname</h4>
                <input type="text" value={this.state.nickname} className="review_name" required maxLength="60" placeholder="Example: jackson11!" onChange={this.handleChange}/>
                <div>For privacy reasons, do not use your full name or email address</div>
              </label>
              <label className="review_form_label">
                <h4 className="rf_header">Email</h4>
                <input type="email" value={this.state.email} className="review_email" required maxLength="60" placeholder="Example: jackson11@email.com" onChange={this.handleChange}/>
                <div>For authentication reasons, you will not be emailed</div>
              </label>
              <input className="review_form_submit" type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withClickData(Write_New_Review, 'ratings_and_reviews');