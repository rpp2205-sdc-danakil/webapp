import React from 'react';

const TopBar = () => {
  return (
    <div>
      <div className="topBar">
      <div className="topBar-text">Atelier</div>
      <div className="searchBar">
        <div className="search-area">
          <input style={{opacity: "0%"}} aria-label="Search"/>
          <div className="searchBar-underline"></div>
        </div>
        <div className="gg-search-container"><i className="gg-search"></i></div>
      </div>
    </div>
    <div className="sidewide-message"> {"site-wide announcement message! - sale / discount offer - new product highlight"}
    </div>

    </div>

  )
}

export default TopBar;