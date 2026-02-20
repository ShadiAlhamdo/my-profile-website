import React from 'react'
import Header from './Header/Header'
import Home from './Home/Home'
import About from './About/About'
import Project from './Project/Project'
import Services from './Services/Services'
import Contact from './Contact/Contact'
import Footer from './Footer/Footer'

function Homepage() {
  return (
    <>
    <Home/>
    <About/>
    <Project/>
    <Services/>
    <Contact/>
    
    </>
  )
}

export default Homepage;