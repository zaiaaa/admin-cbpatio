import React from 'react'
import "./card.css"


const Card = ({ children, variant, width, height, bgImage }) => {
  const bgImageStyle = {
    backgroundImage: `url(${bgImage})`,
    filter: `blur(4px)`,
    zIndex: '-1',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    borderRadius: '10px',
  }

  return (
    <div className={`card-${variant}`} style={{width, height}}>
      <div style={{ ...bgImageStyle}}></div>
      <div>
        {children}
      </div>
    </div>
  )
}

export { Card }
