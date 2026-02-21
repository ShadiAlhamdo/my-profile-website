import React from 'react'
import './About.css'
import Title from '../Title/Title'
import ScrollAnimation from 'react-animate-on-scroll';

const About = () => {
  // نصيحة: في المستقبل يمكنك استخدام useContext أو i18next لتغيير اللغة
  const lng = "en" 

  return (
    <section className='about' id='about'>
      <div className='container'>
        <Title 
          title={lng === "en" ? `About Me` : `لمحة عني`} 
          subtitle={lng === "en" ? 
            `Computer Engineer & Full-Stack Developer based in Germany` : 
            `مهندس حواسيب ومطور ويب متكامل مقيم في ألمانيا`}
        />
        
        <div className='content'>
          <div className='row left'>
            <ScrollAnimation 
              animateIn='fadeIn'
              animateOut='fadeOut'
              className='img'>
              {/* SEO: تأكد من أن alt تصف الصورة بوضوح */}
              <img src='../../images/about.png' alt='Shadi Alhamdo - Computer Engineer' />
            </ScrollAnimation>
          </div>

          <div className='row right'>
            <article>
              <h1>{lng === "en" ? `Shadi Alhamdo` : `شادي الحمدو`}</h1>
              <p className='about-p'>
                {lng === 'en' ? (
                  <>
                    I am a <strong>Computer Engineer</strong> with a passion for building scalable web applications and industrial automation systems. 
                    With professional experience at international organizations like the <strong>UNDP</strong> and a solid background in <strong>SPS/PLC Programming</strong>, 
                    I bridge the gap between hardware precision and modern software creativity. 
                    I specialize in the <strong>MERN Stack</strong> and I am a certified technical trainer (TOT). 
                    Recently, I achieved a perfect score of <strong>100/100 in the German B1 exam</strong>, reflecting my dedication and fast learning ability.
                  </>
                ) : (
                  <>
                    أنا <strong>مهندس حواسيب</strong> شغوف ببناء تطبيقات الويب وحلول الأتمتة الصناعية. 
                    من خلال خبرتي المهنية مع منظمات دولية مثل <strong>UNDP</strong> وخلفيتي القوية في برمجة الـ <strong>PLC</strong>، 
                    أعمل على الربط بين دقة الأنظمة الهندسية وإبداع البرمجيات الحديثة. 
                    متخصص في تقنيات <strong>MERN Stack</strong> ومدرب تقني معتمد (TOT). 
                    مؤخراً، حصلت على الدرجة الكاملة <strong>100/100 في امتحان اللغة الألمانية B1</strong>، مما يعكس جديتي وقدرتي على التعلم السريع.
                  </>
                )}
              </p>
            </article>

            <div className='skills'>
              <h2>{lng === 'en' ? `Technical Skills` : `المهارات التقنية`}</h2>
              <div className='flex'>
                {/* تم ترتيب المهارات لتبدأ بالأهم برمجياً وهندسياً */}
                {[
                  { name: 'React.js', img: 'react.svg', active: true },
                  { name: 'Node.js', img: 'nodejs.svg', active: true },
                  { name: 'JavaScript', img: 'javascript.svg', active: true },
                  { name: 'Tailwind CSS', img: 'tailwindcss.svg', active: true },
                  { name: 'SPS / PLC', img: 'algorithms.svg', active: true }, // يمكنك تغيير الأيقونة لاحقاً
                  { name: 'C# / C++', img: 'algorithms.svg', active: true },
                  { name: 'MongoDB', img: 'mongodb.svg', active: true },
                  { name: 'Express.js', img: 'nodejs.svg', active: false },
                  { name: 'Next.js', img: 'vuejs.svg', active: false },
                  { name: 'Figma', img: 'figma.svg', active: false },
                  { name: 'Photoshop', img: 'photoshop.svg', active: false },
                  { name: 'Linux/Ubuntu', img: 'ubuntu.svg', active: false },
                  { name: 'Excel Data Analysis', img: 'algorithms.svg', active: false },
                ].map((skill, index) => (
                  <span key={index} className={skill.active ? 'active' : ''}>
                    <img src={`../../images/skills/${skill.img}`} alt={`${skill.name} icon`} />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About