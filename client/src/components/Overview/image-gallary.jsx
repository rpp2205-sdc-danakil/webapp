import React from 'react';
import GallaryEntry from './gallary-entry.jsx';
import MagnifyingArea from './magnifying-area.jsx';
import withClickData from '../hoc_click_data.jsx';

class ImageGallary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { top: 0, bottom: 3};
  }

  handleArrowUp(e) {
    this.setState({top: this.state.top - 1, bottom: this.state.bottom - 1});
    this.props.interaction(e.target);
  }

  handleArrowDown(e) {
    this.setState({top: this.state.top + 1, bottom: this.state.bottom + 1});
    this.props.interaction(e.target);
  }

  handleForward(e) {
    var oldId = this.props.currentPhotoIndex;
    var newId = oldId + 1;
    if (oldId < this.props.photos.length - 1) {
      this.props.handleCurrentPhotoChange(oldId + 1);
      if (newId > this.state.bottom) {
        this.setState({bottom: this.state.bottom + 1, top: this.state.top + 1})
      }
    };
    this.props.interaction(e.target);


  }

  handleBackward(e) {
    var oldId = this.props.currentPhotoIndex;
    var newId = oldId - 1;
    if (oldId > 0) {
      this.props.handleCurrentPhotoChange(newId);
      if (newId < this.state.top) {
        this.setState({top: this.state.top - 1, bottom: this.state.bottom - 1})
      }
    }
    this.props.interaction(e.target);

  }

  handleClick(e) {
    if(this.props.section === 'overview') {
      this.props.handleModalAppear();
      this.props.handleBackground("rgba(192,192,192,0.8)");
      // this.modalInit();
    } else {
      this.props.handleModalDisappear();
      this.props.handleBackground("white");
    }
    this.props.interaction(e.target);
  }

  // changeCurrentPhoto(newIndex) {
  //   this.setState({ currentPhotoIndex: newIndex });
  // }


  render() {
    if (this.props.section === 'modal') {
      var modal_url = this.props.photos[this.props.currentPhotoIndex]?.url || 'img/NoImageThumbnail.png';
      return (
        <div data-testid="test-ImageGallary-modal" className="image-gallary-modal">
          <div className="current-photo-modal">
            <MagnifyingArea url={modal_url}/>
            {this.props.currentPhotoIndex === 0 ? null : <div id="backBtn-modal" onClick={this.handleBackward.bind(this)}>
            </div>}
            {this.props.currentPhotoIndex === this.props.photos.length - 1 ? null : <div id="forwardBtn-modal" onClick={this.handleForward.bind(this)}>
            </div>}
            <div className="defaultBtn" onClick={this.handleClick.bind(this)}>
              <img id="defaultBtn" src="img/exit-full-screen-icon.png" />
            </div>
          </div>
          <div className="gallary-list-modal" >{this.props.photos.map((photo, index) => {
            return (<div key={index}>
              <GallaryEntry id={index} photoInfo={photo} changeCurrentPhoto={this.props.handleCurrentPhotoChange} highlight={this.props.currentPhotoIndex === index} section='modal'/>
            </div>)
          })}
          </div>
        </div>
      )
    }
    var arrowForwardNotNeeded = (this.state.bottom === this.props.photos.length - 1 || this.props.photos.length <= 4);
    var arrowBackNotNeeded = (this.state.top === 0 || this.props.photos.length <= 4);
    var original_url = this.props.photos[this.props.currentPhotoIndex]?.url;
    if (original_url) {
      var current_url = original_url.slice(0, original_url.length - 2) + '40';
    } else {
      var current_url = 'img/NoImageThumbnail.png';
    }
    return (
      <div className="image-gallary" data-testid="test-ImageGallary">
        <div className="gallary-list">
          {/* up arrow will appear when the top image is not index 0, and the number of photos is larger than 4 */}
          {(this.state.top === 0 || this.props.photos.length <= 4) ? null : <div className="arrow-up-container" onMouseOver={this.handleArrowUp.bind(this)}><div className="arrow-up"></div></div>}
          {this.props.photos.map((photo, index) => {
          return (<div key={index}>
            <GallaryEntry id={index} photoInfo={photo} changeCurrentPhoto={this.props.handleCurrentPhotoChange} highlight={this.props.currentPhotoIndex === index} section='overview' top={this.state.top} bottom={this.state.bottom}/>
          </div>)
        })}
        {/* down arrow will appear when the top image is not last image, and the number of photos is larger than 4 */}
        {arrowForwardNotNeeded ? null : <div className="arrow-down-container" onMouseOver={this.handleArrowDown.bind(this)}><div className="arrow-down"></div></div>}
        </div>
        <div className="current-photo">
          <img id="current-photo" alt="current photo" onClick={this.handleClick.bind(this)} style={{"cursor": "zoom-in"}} src={current_url}></img>
            {this.props.currentPhotoIndex === 0 ? null : <div id="backBtn" onClick={this.handleBackward.bind(this)}>
            </div>}
            {this.props.currentPhotoIndex ===  this.props.photos.length - 1 ? null : <div id="forwardBtn" onClick={this.handleForward.bind(this)}>
            </div>}
            <div className="expandBtn" onClick={this.handleClick.bind(this)}>
              <img id="expandBtn" alt="expand button" src="img/fullscreen-icon.jpg" />
            </div>
        </div>
      </div>)

  }
}

export default withClickData(ImageGallary, 'overview');