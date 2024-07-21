import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function ImageCarousel(props) {
  return (
    <Carousel>
      {props.images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={image.alt} style={{ width: '100%', maxWidth: '500px', margin: 'auto', marginTop: '1px', padding: '1px', borderWidth: '1px', borderRadius: 'lg' }} />
        </div>
      ))}
    </Carousel>
  );
}