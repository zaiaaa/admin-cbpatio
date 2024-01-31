import React from 'react'
import "./card.css"

const Card = ({children, variant, width}) => {
  return (
    <div className={`card-${variant}`} style={{width}}>
        {children}
    </div>
  )
}

export {Card}
