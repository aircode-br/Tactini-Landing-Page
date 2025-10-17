import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import "../Styles/About.css"

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const ref = useRef(null)
  const bentoRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.fromTo('.section-title', 
        {
          y: 50,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: '.section-title',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      )

      // Animação do subtítulo
      gsap.fromTo('.section-sub', 
        {
          y: 30,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: '.section-sub',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out'
        }
      )

      // Animação dos bento boxes com stagger
      bentoRefs.current.forEach((box, index) => {
        gsap.fromTo(box,
          {
            y: 60,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: box,
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
          }
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el) => {
    if (el && !bentoRefs.current.includes(el)) {
      bentoRefs.current.push(el)
    }
  }

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <h2 className="section-title">Beyond Software: Your Growth Partner</h2>
        <p className="section-sub">
          Founded in 2023, Tactini is a global digital studio dedicated to helping organizations grow through design, technology, and strategic thinking.
        </p>

        <div className="about-grid">
          <div className="bento-box bento-large" ref={addToRefs}>
            <span className="icon">🎯</span>
            <h4>Our Mission</h4>
            <p>
              We don't just write code — <strong>we build long-term partnerships</strong> that drive real business results. 
              Your success is our success, and we're committed to being there every step of the way.
            </p>
          </div>

          <div className="bento-box bento-large" ref={addToRefs}>
            <span className="icon">🚀</span>
            <h4>Outcome-Oriented</h4>
            <p>
              We measure success by your growth and impact, not just by project delivery. 
              Every decision we make is guided by tangible business outcomes and long-term value creation.
            </p>
          </div>

          <div className="bento-box bento-feature" ref={addToRefs}>
            <span className="icon">🤝</span>
            <h4>Collaborative Partnership</h4>
            <p>
              Your goals define our path. We value transparency and clear communication at every step.
            </p>
          </div>

          <div className="bento-box bento-feature" ref={addToRefs}>
            <span className="icon">✨</span>
            <h4>Exceptional Design & UX</h4>
            <p>
              Every product we create combines aesthetics with usability for a world-class experience.
            </p>
          </div>

          <div className="bento-box bento-feature" ref={addToRefs}>
            <span className="icon">🧑‍💻</span>
            <h4>Expert Teams</h4>
            <p>
              Our agile and multidisciplinary professionals ensure focus, speed, and high-quality delivery.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About