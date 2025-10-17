// src/components/Services.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import "../Styles/Services.css"

const SERVICES_DATA = [
  { 
    tag: 'Product Strategy', 
    title: 'Discovery, UX & Design', 
    description: 'Transforming ideas into elegant, intuitive, and conversion-focused products. We conduct research, wireframing and prototyping to deliver a clear, risk-free roadmap.' 
  },
  { 
    tag: 'Software Engineering', 
    title: 'Custom Web & Mobile Solutions', 
    description: 'We build beautiful, highly-performant digital products using modern stacks. Our consultative partnership ensures the technology perfectly aligns with your growth strategy.' 
  },
  { 
    tag: 'Quality Assurance', 
    title: 'Security, Testing & QA', 
    description: 'Guaranteeing your software is robust and reliable. We implement comprehensive testing, security best practices, and performance tests for long-term stability.' 
  },
  { 
    tag: 'Product Growth', 
    title: 'Optimization & Scaling', 
    description: 'Driving business success post-launch through data analysis, feature iteration, and continuous optimization. We help you scale performance and identify key growth opportunities.' 
  },
]

const Services = () => {
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef([])
  const indexRef = useRef(SERVICES_DATA.length)
  const stepRef = useRef(0)
  const gapRef = useRef(24)
  const animRef = useRef(null)
  const wheelLock = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const allCards = [...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA]

  const goTo = (i, opts = {}) => {
    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return
    const totalCards = cards.length
    const realCardsCount = SERVICES_DATA.length
    const viewport = viewportRef.current

    indexRef.current = i
    const realIndex = ((i - realCardsCount) % realCardsCount + realCardsCount) % realCardsCount
    setActiveIndex(realIndex)

    const viewportCenter = viewport.offsetWidth / 2
    const cardCenter = cards[0].offsetWidth / 2
    const offset = viewportCenter - cardCenter
    const x = -i * stepRef.current + offset

    animRef.current && animRef.current.kill()
    animRef.current = gsap.to(trackRef.current, {
      x,
      duration: opts.duration ?? 0.6,
      ease: opts.ease ?? 'power3.inOut',
      onComplete: () => {
        if (i < realCardsCount) {
          indexRef.current = i + realCardsCount
          const newX = -indexRef.current * stepRef.current + offset
          gsap.set(trackRef.current, { x: newX })
        } else if (i >= realCardsCount * 2) {
          indexRef.current = i - realCardsCount
          const newX = -indexRef.current * stepRef.current + offset
          gsap.set(trackRef.current, { x: newX })
        }
      },
    })

    updateCardStyles(i)
  }

  const updateCardStyles = (activeIdx) => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return
      const isActive = i === activeIdx
      gsap.to(el, {
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? 0 : 14,
        duration: 0.4,
        ease: 'power2.out',
      })
    })
  }

  useLayoutEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return

    const measure = () => {
      const viewport = viewportRef.current
      const g = Math.round(Math.min(32, Math.max(16, viewport.offsetWidth * 0.04)))
      gapRef.current = g
      trackRef.current.style.gap = `${g}px`
      const cardW = cards[0].offsetWidth
      stepRef.current = cardW + g
      const viewportCenter = viewport.offsetWidth / 2
      const cardCenter = cardW / 2
      const offset = viewportCenter - cardCenter
      const x = -indexRef.current * stepRef.current + offset
      gsap.set(trackRef.current, { x })
    }

    measure()
    updateCardStyles(indexRef.current)
    const ro = new ResizeObserver(measure)
    ro.observe(viewportRef.current)
    cards.forEach((c) => ro.observe(c))
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const prev = () => goTo(indexRef.current - 1)
    const next = () => goTo(indexRef.current + 1)

    // Keyboard navigation
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }

    // Mouse wheel
    const onWheel = (e) => {
      if (wheelLock.current) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (Math.abs(delta) < 20) return
      wheelLock.current = true
      delta > 0 ? next() : prev()
      setTimeout(() => (wheelLock.current = false), 420)
    }

    // ✅ Touch & Mouse handling com Pointer Events
    let isDown = false
    let startX = 0
    let currentX = 0
    let moved = false
    let pointerId = null

    const onPointerDown = (e) => {
      // Ignora cliques nos botões de navegação
      if (e.target.closest('.nav') || e.target.closest('.dot')) return
      
      isDown = true
      moved = false
      pointerId = e.pointerId
      startX = e.clientX
      currentX = startX
      
      // Captura o ponteiro para continuar recebendo eventos
      viewport.setPointerCapture(e.pointerId)
      viewport.style.cursor = 'grabbing'
    }

    const onPointerMove = (e) => {
      if (!isDown || e.pointerId !== pointerId) return
      
      currentX = e.clientX
      const deltaX = currentX - startX
      
      // Marca como movido se passou do threshold
      if (!moved && Math.abs(deltaX) > 5) {
        moved = true
      }
      
      // Feedback visual durante o drag
      if (moved && trackRef.current) {
        const cards = cardsRef.current.filter(Boolean)
        if (cards.length) {
          const viewportCenter = viewport.offsetWidth / 2
          const cardCenter = cards[0].offsetWidth / 2
          const offset = viewportCenter - cardCenter
          const currentPos = -indexRef.current * stepRef.current + offset
          gsap.set(trackRef.current, { x: currentPos + deltaX * 0.5 })
        }
      }
    }

    const onPointerUp = (e) => {
      if (!isDown || e.pointerId !== pointerId) return
      
      isDown = false
      viewport.style.cursor = 'grab'
      
      try {
        viewport.releasePointerCapture(e.pointerId)
      } catch {}
      
      const deltaX = currentX - startX
      
      // Determina se deve mudar de slide baseado no movimento
      if (moved && Math.abs(deltaX) > 50) {
        deltaX < 0 ? next() : prev()
      } else {
        // Retorna para a posição atual se não moveu o suficiente
        const cards = cardsRef.current.filter(Boolean)
        if (cards.length) {
          const viewportCenter = viewport.offsetWidth / 2
          const cardCenter = cards[0].offsetWidth / 2
          const offset = viewportCenter - cardCenter
          const x = -indexRef.current * stepRef.current + offset
          gsap.to(trackRef.current, {
            x,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      }
      
      pointerId = null
    }

    const onPointerCancel = (e) => {
      if (e.pointerId === pointerId) {
        onPointerUp(e)
      }
    }

    // Event listeners
    viewport.addEventListener('keydown', onKey)
    viewport.addEventListener('wheel', onWheel, { passive: true })
    viewport.addEventListener('pointerdown', onPointerDown)
    viewport.addEventListener('pointermove', onPointerMove)
    viewport.addEventListener('pointerup', onPointerUp)
    viewport.addEventListener('pointercancel', onPointerCancel)

    return () => {
      viewport.removeEventListener('keydown', onKey)
      viewport.removeEventListener('wheel', onWheel)
      viewport.removeEventListener('pointerdown', onPointerDown)
      viewport.removeEventListener('pointermove', onPointerMove)
      viewport.removeEventListener('pointerup', onPointerUp)
      viewport.removeEventListener('pointercancel', onPointerCancel)
    }
  }, [])

  return (
    <section id="services" className="section services" ref={sectionRef}>
      <div className="container">
        <h2 className="h2">Services</h2>

        <div className="services-carousel">
          <button 
            type="button" 
            aria-label="Previous" 
            onClick={() => goTo(indexRef.current - 1)} 
            className="nav prev"
          >
            ←
          </button>

          <div 
            className="viewport" 
            ref={viewportRef} 
            tabIndex={0} 
            aria-roledescription="carousel" 
            aria-label="Service List"
          >
            <div className="track" ref={trackRef}>
              {allCards.map((service, index) => {
                const realIndex = index % SERVICES_DATA.length
                const isClone = index < SERVICES_DATA.length || index >= SERVICES_DATA.length * 2
                return (
                  <article
                    key={`${index}-${service.title}`}
                    className={`card ${isClone ? 'clone' : ''}`}
                    ref={(el) => (cardsRef.current[index] = el)}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${realIndex + 1} de ${SERVICES_DATA.length} — ${service.title}`}
                    aria-hidden={isClone ? 'true' : 'false'}
                  >
                    <span className="tag">{service.tag}</span>
                    <h3 className="card-title">{service.title}</h3>
                    <p className="card-text">{service.description}</p>
                  </article>
                )
              })}
            </div>
          </div>

          <button 
            type="button" 
            aria-label="Next" 
            onClick={() => goTo(indexRef.current + 1)} 
            className="nav next"
          >
            →
          </button>

          <div className="dots-wrap" aria-hidden="true">
            {SERVICES_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i + SERVICES_DATA.length)}
                aria-label={`Go to slide ${i + 1}`}
                className={`dot ${i === activeIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services