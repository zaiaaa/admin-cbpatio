import React from 'react'
import "./button.css"

const Button = ({type, variant, text, width}) => {
  return (
    <div className='ct-btn'>
      <button className={`button ${variant}`} type={type} style={{width}}>
          {text}
      </button>
    </div>

  )
}

export {Button}