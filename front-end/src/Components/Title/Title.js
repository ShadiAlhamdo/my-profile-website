import React from 'react'
import './Title.css'

const Title=({title,subtitle})=> {
  return (
    <div className='heading'>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <div className='border-down'>
           <p className='rounded-full'></p>
        </div>
    </div>
  )
}

export default Title