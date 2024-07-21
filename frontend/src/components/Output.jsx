import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCarousel from './ImageCarousel';

export default function Output(props) {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

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
        
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
          }, 10000);

          return () => clearTimeout(loadingTimeout);
    }, [props.city]);

  return (
    <div>
      {loading ? (
        <div>
          <video
            autoPlay
            loop
            muted
            style={{ width: '100%', maxWidth: '500px', margin: 'auto', marginTop: '10px', padding: '5px', borderWidth: '1px', borderRadius: 'lg' }}
            src="/timelapse.mp4"
        />
          <p>Loading results...</p>
        </div>
      ) : (
        image && (
        <div>
          <img 
            src={image.url} 
            alt={image.description || props.city} 
            style={{ width: '100%', maxWidth: '500px', margin: 'auto', marginTop: '10px', padding: '5px', borderWidth: '1px', borderRadius: 'lg' }} 
          />
          <h1>Congrats, you will love:</h1>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{props.city}</h2>
        <p>{props.text}</p>
        <ImageCarousel images={images} style={{marginTop: '5px'}} />
          </div>
        )
      )}
    </div>
  )
}