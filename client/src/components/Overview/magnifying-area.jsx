import React from 'react';

const MagnifyingArea = (props) => {
  return (<>
    <figure id="magnifying-area" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <img id="current-photo-modal" src={props.url} style={{"cursor": "crosshair"}}/>
    </figure>
  </>)
}

const handleMouseMove = (e) => {
  var magnifyingArea = document.getElementById('magnifying-area');
  var image = document.getElementById('current-photo-modal');
  const rect = magnifyingArea.getBoundingClientRect();
  var clientX = e.clientX - rect.left;
  var clientY = e.clientY - rect.top;
  var mWidth = rect.right - rect.left;
  var mHeight = rect.bottom - rect.top;
  clientX = clientX / mWidth * 100;
  clientY = clientY / mHeight * 100;
  //map: (0, 0) => (75, 75), (100, 100) => (-75, -75)
  var x = 75 - clientX * 1.5;
  var y = 75 - clientY * 1.5;
  image.style.transform = 'translate(' + x + '%, ' + y + '%) scale(2.5)';
}

const handleMouseLeave = () => {
  var image = document.getElementById('current-photo-modal');
  image.style.transform = 'scale(1)';
}

export default MagnifyingArea;