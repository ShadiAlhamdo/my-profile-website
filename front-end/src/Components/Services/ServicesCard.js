import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

const ServicesCard=({icon,title,subtitle})=> {
  return (
    <ScrollAnimation
    animateIn='flipInY'
  animateOut='flipOutY'  className='service-card'>
        {icon}
        <h3>{title}</h3>
        <p>{subtitle}</p>
    </ScrollAnimation >
  )
}

export default ServicesCard