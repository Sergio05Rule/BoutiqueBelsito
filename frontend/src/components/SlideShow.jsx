import React from 'react';
import Carousel from 'nuka-carousel';

const SlideShow = (props) => {
  return (
      //https://reactjsexample.com/a-pure-reactjs-carousel-component/
    <Carousel
    autoplay="true"
    speed="1500"
    wrapAround="true"
    width="100%"
    height="400px"
    >
        <img src="../../../uploads/1607652007605.jpg" />
        <img src="../../../uploads/1607652014239.jpg" />
      </Carousel>
  );
};

export default SlideShow;
