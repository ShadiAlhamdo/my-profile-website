import './Home.css'
import ScrollAnimation from 'react-animate-on-scroll';
import { useDispatch, useSelector } from "react-redux";
import { downloadCv } from "../../redux/ApiCalls/cvFileApiCall";

const Home = () => {
    const { loading } = useSelector((state) => state.cvFile);
    const dispatch = useDispatch();
    const lng = "en"; // يمكنك جعلها ديناميكية لاحقاً

    return (
        <section className='home' id='home'>
            <div className='container'>
                <div className='row left'>
                    {/* SEO: العنوان الرئيسي يجب أن يحتوي على اسمك وصفتك المهنية */}
                    <h1 className='first'>
                        {lng === "en" 
                            ? `Hi, I'm Shadi Alhamdo | Computer Engineer & Full-Stack Developer` 
                            : `مرحباً، أنا شادي الحمدو | مهندس حواسيب ومطور ويب متكامل`}
                    </h1>

                    <h2 className='gradient-text-color'>
                        {lng === "en" 
                            ? "Crafting Scalable Web Solutions & Industrial Automation" 
                            : "بناء حلول الويب المتكاملة والأتمتة الصناعية"}
                    </h2>

                    <p className='text'>
                        {lng === "en" ? (
                            <>
                                I am a <strong>Computer Engineer</strong> and <strong>Full-Stack Web Developer</strong> with a proven track record in building high-performance applications. 
                                I specialize in the <strong>MERN Stack</strong> (MongoDB, Express, React, Node.js) and <strong>Next.js</strong>. 
                                My expertise spans from developing responsive, user-centric frontends to architecting secure, scalable backend servers. 
                                With experience in <strong>SPS/PLC Programming</strong>, I bring a unique engineering perspective to every digital project.
                            </>
                        ) : (
                            <>
                                أنا <strong>مهندس حواسيب</strong> ومطور ويب (Full-Stack) متخصص في بناء تطبيقات الويب عالية الأداء. 
                                أمتلك خبرة واسعة في استخدام <strong>React.js, Next.js, و Node.js</strong>. 
                                أركز على تطوير واجهات مستخدم متجاوبة وجذابة مع بناء مخدمات وقواعد بيانات آمنة وسلسة. 
                                بفضل خلفيتي في <strong>الأتمتة الصناعية (SPS)</strong>، أقدم حلولاً برمجية تتسم بالدقة الهندسية والاحترافية.
                            </>
                        )}
                    </p>

                    <div className="buttons">
                        {/* SEO: إضافة العنوان (title) يحسن الأرشفة */}
                        <a href="https://www.linkedin.com/in/shadi-alhamdo-89b6273b2" className='primary-btn animation-1' title="Contact Shadi Alhamdo">
                            {lng === 'en' ? `Contact me` : `تواصل معي`} 
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        
                        <button 
                            className='secondary-btn updating' 
                            onClick={() => dispatch(downloadCv())}
                            disabled={loading}
                            title="Download my professional CV"
                        >
                            {lng === 'en' ? 'Download CV' : 'تحميل السيرة الذاتية'}
                        </button>
                    </div>
                </div>
                
                <ScrollAnimation 
                    animateIn='bounce'
                    initiallyVisible={true}
                    animateOnce={true} 
                    className='row right'
                >
                    <div className='img'>
                        {/* SEO: الـ alt text ضروري جداً للأرشفة في جوجل صور */}
                        <img 
                            src='../../images/home.svg' 
                            alt="Shadi Alhamdo - Computer Engineer and Full Stack Developer Portfolio Illustration"
                        />
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    )
}

export default Home;