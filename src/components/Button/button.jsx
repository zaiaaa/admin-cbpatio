import React from 'react'
import "./button.css"

const Button = ({type, variant, text, width, padding, onClick}) => {
  return (
    <div className='ct-btn'>
      <button className={`button ${variant}`} type={type} style={{width, padding}} onClick={onClick}>
          {text}
      </button>
    </div>

  )
}

export {Button}