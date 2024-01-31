import React from 'react'
import { Controller } from 'react-hook-form'
import "./input.css"

const Input = ({name, control, disabled, readOnly, ...rest}) => {
  return (
    <>        
        <Controller name={name}
        control={control}
        defaultValue={""}
        rules={{required: true}}
        render={({field: {value, onChange}}) => <input className='input' value={value} onChange={onChange} disabled={disabled} readOnly={readOnly} {...rest}/>}
        />
    </>
  )
}


export {Input}