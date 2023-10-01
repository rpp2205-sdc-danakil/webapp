import React from 'react';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}, () => {
      if(this.state.value === '') {
        this.props.search(null);
      } else {
        this.props.search(this.state.value);
      }
    });
  }

  render() {
    return (
      <div className="search_container_reviews">
        <input type="text" className="search_input_reviews" value={this.state.value} placeholder="Search Reviews" onChange={this.handleChange} />
        <i className="fa-solid fa-magnifying-glass search_icon_reviews"></i>
      </div>
    )
  }
}

export default SearchBar;

//<FontAwesomeIcon className="search_icon_reviews" icon={ faSearch } />