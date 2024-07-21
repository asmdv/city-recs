import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';
import { Box, Image, Text, Heading } from '@chakra-ui/react';

export default function Output(props) {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
        try {
            const response = await axios.get(`https://t-amammadov-internhacks-backend.azurewebsites.net/city-images?city=${props.city}`);
            if (response.data.length > 0) {
            setImage(response.data[0]);
            setImages(response.data.slice(1));
        }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
        };

        fetchImage();
        
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
          }, 10000);

          return () => clearTimeout(loadingTimeout);
    }, [props.city]);

  return (
    <Box>
      {loading ? (
        <div>
          <video
            autoPlay
            loop
            muted
            style={{ width: '100%', maxWidth: '100vh', margin: 'auto', marginTop: '10px', padding: '5px', borderWidth: '1px', borderRadius: 'lg' }}
            src="/timelapse2.mp4"
        />
          <Text
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            color="white"
            fontSize="3xl"
            fontWeight="bold"
            mt="30px"
          >
            Asking City Experts...
          </Text>
        </div>
      ) : (
        image && (
          <Box>
            <Image 
              src={image.url} 
              alt={image.description || props.city} 
              width="100%" 
              maxWidth="500px" 
              maxHeight="500px" 
              margin="auto" 
              marginTop="10px" 
              padding="5px" 
              borderWidth="1px" 
              borderRadius="lg" 
            />
            <Heading as="h1">Congrats, you will love:</Heading>
            <Heading as="h2" fontSize="2rem" fontWeight="bold">{props.city}</Heading>
            <Text>{props.text}</Text>
            <Box marginTop="5px">
              <ImageCarousel images={images} />
            </Box>
          </Box>
        )
      )}
    </Box>
  )
}