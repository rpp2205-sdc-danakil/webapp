import Modal from './Modal.jsx';
import Stars from '../FiveStars.jsx';
//import { FiCheck } from "react-icons/fi";
import axios from 'axios';
import withClickData from '../hoc_click_data.jsx';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class Individual_Review_Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyTextLength: 250,
      expanded: false,
      isOpen: false,
      helpfulness: props.review.helpfulness,
      isYesClicked: false,
      isReported: false,
      imgSrc: null
    };

    this.changeDateFormat = this.changeDateFormat.bind(this);
    this.setIsOpen = this.setIsOpen.bind(this);
    this.handleIncreaseCounts = this.handleIncreaseCounts.bind(this);
    this.show = this.show.bind(this);
  }

  componentDidUpdate() {
    if (this.state.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow= 'unset';
    }
  }

  changeDateFormat(date) {
    var myDate = new Date(date);
    var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    return month[myDate.getMonth()] + ' ' + (myDate.getDate() + 1).toString() + ', ' + myDate.getFullYear().toString();
  }

  setIsOpen(boolean, imgUrl) {
    this.setState({
      isOpen: boolean,
      imgSrc: imgUrl
    })

    //document.getElementsByClassName('reviews_expand_mode').style.overflow = "hidden";

    // if (imgUrl) {
    //   document.getElementsByClassName('reviews_expand_mode').style.overflow = "hidden";
    // } else {
    //   document.getElementsByClassName('reviews_expand_mode').style.overflow = "scroll";
    // }
  }

  handleIncreaseCounts(e, review_id) {
    let text = e.target.innerText;
    if (text === "Yes") {

      this.setState({
        isYesClicked: true,
        helpfulness: this.state.helpfulness + 1
      });

      axios.put(`/reviews/${review_id}/helpful`)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        })
    } else {

      this.setState({
        isReported: true,
      });

      axios.put(`/reviews/${review_id}/report`)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        })
    }

    this.props.interaction(e.target);
  }

  show() {
    if (this.state.bodyTextLength === this.props.review.body.length) {
      this.setState({
        bodyTextLength: 250,
        expanded: false
      })
    } else if (this.state.bodyTextLength < this.props.review.body.length) {
      this.setState({
        bodyTextLength: this.props.review.body.length,
        expanded: true
      })
    }
  }

  render() {
    return (
      <div className="tile">
        <div><Stars rating={this.props.review.rating}/></div>
        <div><strong>{this.props.review.summary}</strong></div>
        <div className="tile-user">{this.changeDateFormat(this.props.review.date)}, {this.props.review.reviewer_name}</div>
        <div>{this.props.review.body.slice(0, this.state.bodyTextLength)}</div>
        <div>
          {this.props.review.body.length < this.state.bodyTextLength ? (
            <div></div>
          ) : (
            <p>
              <a className="show_more" onClick={this.show}>
                {this.state.expanded ? (
                   <span>Show less</span>
                 ) : (
                   <span>Show more</span>
                 )
                }
              </a>
            </p>
          )}
        </div>
        <div>
          {this.props.review.photos.map(photo => {
            console.log('testing review photos map');
            const imageAttributes = photo.url.split("/");
            //const getPublicId = imageAttributes.pop();
            const publicId = imageAttributes.pop();
            const cloudName = imageAttributes[3];
            const isTrue = photo.url.includes('cloudinary');
            console.log('true or false', isTrue);
            //const version = imageAttributes[6].split("v")[1];
            //console.log('testing split on photo', photo.url.split("/"));
            //console.log(publicId);
            //const image = cloudinary.image(publicId, {width: 70, height: 53, crop: "scale"});
            //const image = cloudinary.image(publicId, {width: 100, height: 150, crop: "fill", fetch_format: "auto"});
            if (isTrue) {
              return (
                <a key={photo.id} >
                  <div className="review_photo" width="70px" height="50px" onClick={() => {this.setIsOpen(true, photo.url)}}>
                    <Image cloudName={cloudName} publicId={publicId} width="70" height="50" alt="an image uploaded by the reviewer">
                      <Transformation width="70" height="50" crop="fill" alt="an image uploaded by the reviewer" />
                    </Image>
                  </div>
                </a>
              )
            } else {
              return (
                <a key={photo.id} >
                <div className="review_photo" width="70px" height="50px" onClick={() => {this.setIsOpen(true, photo.url)}}>
                  <img className="review_photo" width="70px" height="50px" alt="an image uploaded by the reviewer" src={photo.url}/>
                </div>
                </a>
              )
            }
           })
          }
        </div>
        {this.props.review.recommend === true ?
          <div className="review_recommend">
             <i className="fa-solid fa-check"></i>
            <p className="review_recommend">I recommend this product</p>
          </div> :
          null
        }
        {this.props.review.reponse == null ?
          <div></div> :
          <div className="review_response">
            <strong>Response</strong>
            <div>{this.props.review.reponse}</div>
          </div>
        }
        <div>
          <p>
            Helpful?
            <button
              className="review_yes_button"
              disabled={this.state.isYesClicked}
              onClick={(e) => {this.handleIncreaseCounts(e, this.props.review.review_id)}}>
              Yes
            </button>
            ({this.state.helpfulness})
            |
            <button
              className="review_report_button"
              disabled={this.state.isReported}
              onClick={(e) => {this.handleIncreaseCounts(e, this.props.review.review_id)}}>
              Report
            </button>
          </p>
        </div>
        <div><hr /></div>
        {this.state.isOpen ?
        <Modal setIsOpen={this.setIsOpen} imgSrc={this.state.imgSrc}/> : null}
      </div>
    )
  }
}

export default withClickData(Individual_Review_Tile, 'ratings_and_reviews');

//<img className="review_photo" width="70px" height="50px" alt="an image uploaded by the reviewer" src={photo.url}/>
//<i className="fa-solid fa-magnifying-glass search_icon"></i>
//<FiCheck fontSize=".85em"/>