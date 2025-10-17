import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Styles/Contact.css"

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const ref = useRef(null);
    const email = "tactini.developer@gmail.com";
    const socialMedia = [
        { 
            name: "LinkedIn", 
            username: "@tactini", 
            url: "https://www.linkedin.com/company/tactini",
            iconClass: "fi fi-brands-linkedin"
        },
        { 
            name: "Facebook", 
            username: "@tactini", 
            url: "https://www.facebook.com/tactini.official",
            iconClass: "fi fi-brands-facebook"
        },
        { 
            name: "Instagram", 
            username: "@tactini", 
            url: "https://www.instagram.com/tactini/",
            iconClass: "fi fi-brands-instagram"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.section-title, .section-sub', {
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power3.out',
            });

            gsap.from('.contact-info > div', {
                scrollTrigger: {
                    trigger: '.contact-info',
                    start: 'top 80%',
                },
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out',
            });

            gsap.from('.social-item', {
                scrollTrigger: {
                    trigger: '.social-links',
                    start: 'top 85%',
                },
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                immediateRender: false,
            });
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={ref}>
            <div className="about-container">
                <h2 className="section-title">Get in Touch</h2>
                <p className="section-sub">We'd love to hear about your project. Let's connect!</p>
                
                <div className="contact-info">
                    {/* E-mail */}
                    <div className="contact-item">
                        <h3>E-mail</h3>
                        <a href={`mailto:${email}`} className="contact-link">
                            {email}
                        </a>
                    </div>

                    {/* Redes Sociais */}
                    <div className="contact-item">
                        <h3>Follow us!</h3>
                        <div className="social-links">
                            {socialMedia.map((media) => (
                                <a 
                                    key={media.name} 
                                    href={media.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="social-item"
                                    title={media.name}
                                >
                                    <i className={media.iconClass}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;