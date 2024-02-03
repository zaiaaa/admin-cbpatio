import React from 'react'
import "./button.css"

const Button = ({type, variant, text, width, padding, margin, onClick}) => {
  return (
    <div className='ct-btn'>
      <button className={`button ${variant}`} type={type} style={{width, padding, margin}} onClick={onClick}>
          {text}
      </button>
    </div>

  )
}

export {Button}