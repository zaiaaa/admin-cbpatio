import React from 'react'
import "./card.css"


const Card = ({children, variant, width, height, bgImage}) => {
  const bgImageStyle = {
    backgroundImage: `url(${bgImage})`,
    
  }

  return (
    <div className={`card-${variant}`} style={{width, height, ...bgImageStyle}}>
        {children}
    </div>
  )
}

export {Card}
