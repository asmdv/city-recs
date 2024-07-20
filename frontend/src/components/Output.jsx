import React from 'react'

export default function Output(props) {
  return (
    <div>
    <img src={props.image} style={{ width: '100%', maxWidth: '500px', margin: 'auto', marginTop: '10px', padding: '5px', borderWidth: '1px', borderRadius: 'lg' }} />
    Congrats, you will love: 
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{props.city}</h2>
    {props.text}
    <img src={props.landmark} alt={props.city} style={{ width: '100%', maxWidth: '500px', margin: 'auto', marginTop: '10px', padding: '5px', borderWidth: '1px', borderRadius: 'lg' }} />
    </div>
  )
}