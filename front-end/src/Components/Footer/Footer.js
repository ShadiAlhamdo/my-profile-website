import React from 'react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lng = "en"; // يمكنك ربطها بـ State اللغة لاحقاً

  return (
    <footer className='footer'>
      <div className='container'>
        <p className='light'>
          {lng === "en" 
            ? "Designed & Developed with Passion by Shadi Alhamdo, B.Eng" 
            : "تم التصميم والبرمجة بواسطة المهندس شادي الحمدو"}
        </p>
        
        <p className='dark'>
          <i className="fa-regular fa-copyright"></i> {currentYear} <strong>Shadi Alhamdo</strong> - 
          {lng === "en" ? " All rights reserved." : " جميع الحقوق محفوظة."}
        </p>

        {/* روابط قانونية تعطي انطباعاً احترافياً في ألمانيا */}
        <div className='footer-legal'>
          <small>
            {lng === "en" ? "Computer Engineer | Full-Stack Developer" : "مهندس حواسيب | مطور ويب متكامل"}
          </small>
        </div>
      </div>
    </footer>
  )
}

export default Footer