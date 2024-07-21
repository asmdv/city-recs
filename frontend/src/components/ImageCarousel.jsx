import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Box, Image } from '@chakra-ui/react';

export default function ImageCarousel(props) {
  return (
    <Box width="100%" maxWidth="500px" margin="auto" marginTop="10px" padding="5px" borderWidth="1px" borderRadius="lg">
      <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
        {props.images.map((image, index) => (
          <Box key={index} height="300px">
            <Image 
              src={image.url} 
              alt={image.alt} 
              objectFit="cover" 
              width="100%" 
              height="100%"
              borderRadius="lg"
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}