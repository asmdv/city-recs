import React from 'react';
import ImageCarousel from './ImageCarousel';

export default function Output(props) {
    const images = [
        {
          url: 'https://wallpaperaccess.com/full/123595.jpg',
          alt: 'Seattle',
          caption: 'Seattle'
        },
        {
          url: 'https://th.bing.com/th/id/OIP.Gckhk5qK1uzzwoS34rfCFwAAAA?rs=1&pid=ImgDetMain',
          alt: 'Space Needle',
          caption: 'Space Needle'
        },
        {
          url: 'https://cdn1.vox-cdn.com/uploads/chorus_image/image/47552879/Pike_Place_Market_Entrance.0.0.jpg',
          alt: 'Pike Place Market',
          caption: 'Pike Place Market'
        }
      ];

  return (
    <div>
    <img src={props.image} style={{ width: '100%', maxWidth: '500px', margin: 'auto', marginTop: '10px', padding: '5px', borderWidth: '1px', borderRadius: 'lg' }} />
    Congrats, you will love: 
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{props.city}</h2>
    {props.text}
    <ImageCarousel images={images} />
    </div>
  )
}