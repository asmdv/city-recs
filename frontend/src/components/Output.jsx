import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';

export default function Output(props) {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImage = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/city-images?city=${props.city}`);
            if (response.data.length > 0) {
            setImage(response.data[0]);
            setImages(response.data);
        }
        } catch (error) {
            console.error('Error fetching image:', error);
        }
        };

        fetchImage();
    }, [props.city]);

  return (
    <div>
    {image ? (
        <img 
          src={image.url} 
          alt={image.description || props.city} 
          style={{ width: '100%', maxWidth: '500px', margin: 'auto', marginTop: '10px', padding: '5px', borderWidth: '1px', borderRadius: 'lg' }} 
        />
      ) : (
        <p>Loading image...</p>
      )}
    Congrats, you will love: 
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{props.city}</h2>
    {props.text}
    <ImageCarousel images={images} />
    </div>
  )
}