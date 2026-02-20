import React from 'react'
import Title from '../Title/Title'
import ServicesCard from './ServicesCard'
import './Services.css'

const Services = () => {
    const lng = "en"

    return (
        <section className='services' id='services'>
            <div className='container'>
                <Title 
                    title={lng === 'en' ? `My Services` : `خدماتي`}
                    subtitle={lng === 'en' ? 
                        `Specialized engineering and software solutions tailored to your needs` : 
                        `حلول هندسية وبرمجية متخصصة مصممة لتلبية احتياجاتك`}
                />
                
                <div className='content'>
                    {/* الخدمة 1: تطوير الويب - التركيز على MERN Stack */}
                    <ServicesCard 
                        icon={<i className="fa-brands fa-react"></i>} 
                        title={lng === 'en' ? `Full-Stack Web Development` : `تطوير الويب المتكامل`}
                        subtitle={lng === 'en' ? 
                            `Developing scalable web applications using the MERN stack (React, Node.js, MongoDB). Focusing on high performance and clean code.` : 
                            `تطوير تطبيقات ويب قابلة للتوسع باستخدام تقنيات MERN. التركيز على الأداء العالي وكتابة كود نظيف واحترافي.`}
                    />

                    {/* الخدمة 2: الأتمتة الصناعية - نقطة قوتك كمهندس */}
                    <ServicesCard 
                        icon={<i className="fa-solid fa-microchip"></i>} 
                        title={lng === 'en' ? `Industrial Automation (SPS/PLC)` : `الأتمتة الصناعية (PLC)`}
                        subtitle={lng === 'en' ? 
                            `Programming and implementing SPS/PLC systems and industrial control panels. Integrating hardware with smart software.` : 
                            `برمجة وتنفيذ أنظمة PLC ولوحات التحكم الصناعية. دمج العتاد الصلب مع الحلول البرمجية الذكية.`}
                    />

                    {/* الخدمة 3: التدريب التقني - بناءً على شهادة TOT */}
                    <ServicesCard 
                        icon={<i className="fa-solid fa-chalkboard-user"></i>} 
                        title={lng === 'en' ? `Technical Training & Mentorship` : `التدريب التقني والإرشاد`}
                        subtitle={lng === 'en' ? 
                            `Certified TOT trainer providing professional courses in C++, Web Design, and Programming logic with proven success rates.` : 
                            `مدرب معتمد (TOT) لتقديم دورات احترافية في C++، تصميم الويب، ومنطق البرمجة مع نسب نجاح مثبتة.`}
                    />

                    {/* الخدمة 4: واجهات المستخدم - استخدام مهارات الفوتوشوب */}
                    <ServicesCard 
                        icon={<i className="fa-solid fa-pen-nib"></i>} 
                        title={lng === 'en' ? `Modern UI/UX Implementation` : `تنفيذ واجهات المستخدم الحديثة`}
                        subtitle={lng === 'en' ? 
                            `Transforming designs (Figma/Photoshop) into responsive frontends using Tailwind CSS and Bootstrap with a focus on UX.` : 
                            `تحويل التصاميم إلى واجهات أمامية مستجيبة باستخدام Tailwind CSS مع التركيز الكامل على تجربة المستخدم.`}
                    />
                </div>

                {/* قسم لماذا تختارني - تم تعديله ليكون "حارقاً" */}
                <div className='flex why-choose-me-section'>
                    <div className='row left'>
                        <h3>{lng === 'en' ? `Why Choose Me?` : `لماذا تختارني؟`}</h3>
                        <p>
                        </p>
                        <span className="highlight">{lng === 'en' ? 
                            `Combining engineering precision with software creativity to deliver exceptional results.` : 
                            `أجمع بين الدقة الهندسية والإبداع البرمجي لتقديم نتائج استثنائية.`}</span>
                    </div>
                    <div className='row right'>
                        <ul>
                            <li>
                                <span><i className="fa-solid fa-check-double"></i></span>
                                {lng === 'en' ? 
                                    `Engineering Mindset: A Bachelor's degree in Computer Engineering ensures robust and logical solutions.` : 
                                    `عقلية هندسية: شهادة البكالوريوس في هندسة الكمبيوتر تضمن حلولاً برمجية قوية ومنطقية.`}
                            </li>
                            <li>
                                <span><i className="fa-solid fa-check-double"></i></span>
                                {lng === 'en' ? 
                                    `Proven Reliability: Experience with international organizations (UNDP) under challenging conditions.` : 
                                    `موثوقية مثبتة: خبرة في العمل مع منظمات دولية (UNDP) في ظروف عمل صعبة ودقيقة.`}
                            </li>
                            <li>
                                <span><i className="fa-solid fa-check-double"></i></span>
                                {lng === 'en' ? 
                                    `Fast Integration & Learning: Achieved 100/100 in German B1, demonstrating high adaptability.` : 
                                    `سرعة الاندماج والتعلم: الحصول على 100/100 في اللغة الألمانية B1 يثبت قدرتي العالية على التكيف.`}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services