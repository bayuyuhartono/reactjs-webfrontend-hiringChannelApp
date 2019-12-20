import React from 'react'

export default function ImageBox(props) {
  return (
    <div className="containerImage">
      <img src={props.list} className="imageGrid" alt="imageBox" />
    </div>
  )
}
