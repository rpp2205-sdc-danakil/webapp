import React from 'react';
import axios from 'axios';

const withCarousel = (WrappedComponent, widget) => {
  class Carousel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        start: 0,
        prev: '',
        next: ''
      }
    }


    render() {
      return (
      <WrappedComponent {...this.props} />)
    }

  }
  return Carousel;
}

export default withCarousel;