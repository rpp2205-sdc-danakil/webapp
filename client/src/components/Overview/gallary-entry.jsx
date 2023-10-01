import React from 'react';

const highlightStyle = {"borderStyle": "solid", "color": "orange", "borderWidth": "2.5px"};
const nonHighlightStyle = {"borderStyle": "none"};

class GallaryEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  handleMouseOver(e) {
    var newId = this.props.id;
    this.props.changeCurrentPhoto(newId);
  }

  render() {
    if (this.props.section === 'overview') {
      if (this.props.id < this.props.top || this.props.id > this.props.bottom) {
        return null;
      } else {
        var original_url = this.props.photoInfo.thumbnail_url;
        if (original_url) {
          var thumbnail_url = original_url.slice(0, original_url.length - 2) + '10';
        } else {
          var thumbnail_url = 'img/NoImageThumbnail.png';
        }
        return (<div className="gallary-entry-container" style={this.props.highlight ? highlightStyle : nonHighlightStyle}>
          <img className="gallary-entry" alt="gallary entry" src={thumbnail_url} onMouseOver={this.handleMouseOver.bind(this)} width="50px"></img>
        </div>)
      }
    } else {
      return (
        <div>
          <span className="dot" onMouseOver={this.handleMouseOver.bind(this)} style={this.props.highlight ? highlightStyle : nonHighlightStyle}></span>
        </div>
      )
    }
  }
}

export default GallaryEntry;