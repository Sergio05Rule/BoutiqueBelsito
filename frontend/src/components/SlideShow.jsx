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
    >
        <img src="../../../uploads/shop_image_1.png" />
        <img src="../../../uploads/shop_image_2.png" />
        <img src="../../../uploads/shop_image_3.png" />

      </Carousel>
  );
};

export default SlideShow;
