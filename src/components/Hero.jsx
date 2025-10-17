// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
// Importe seu arquivo CSS para as classes definidas abaixo
import '../Styles/Hero.css' 


// --- 1. Faça as Importações dos Assets ---
import person1 from '../assets/person.jpg'; // Ajuste o caminho '../assets/' conforme a localização real
import person2 from '../assets/smile.jpg';
import business1 from '../assets/business.jpg';
import homescreen1 from '../assets/homescreen.jpg';
import phone1 from '../assets/phone.jpg';
import phone2 from '../assets/ceo.jpg';
import computer1 from '../assets/laptop.jpg';
import computer2 from '../assets/macbook.jpg';

// --- 2. Use as variáveis importadas no Array AVATARS ---
const AVATARS = [
    {
        id: 1,
        // Troca do string '/assets/person-1.jpg' pela variável 'person1'
        src: person1, 
        alt: "Photo of a person", 
    },
    {
        id: 2,
        src: person2,
        alt: "Photo of a person",
    },
    {
        id: 3,
        src: business1,
        alt: "Photo of a business",
    },
    {
        id: 4,
        src: homescreen1,
        alt: "Photo of a phone homescreen",
    },
    {
        id: 5,
        src: phone1,
        alt: "Photo of a phone",
    },
    {
        id: 6,
        src: phone2,
        alt: "Photo of a phone",
    },
    {
        id: 7,
        src: computer1,
        alt: "Photo of a computer",
    },
    {
        id: 8,
        src: computer2,
        alt: "Photo of a computer",
    },
];

// O AVATARS agora contém as URLs finais processadas pelo seu bundler.


function placeOnCircle(i, total) {
    const angle = (i / total) * Math.PI * 2
    const radiusPct = 42 + (i % 3) * 10 // alterna entre 3 raios
    return {
        left: `${50 + Math.cos(angle) * radiusPct}%`,
        top: `${50 + Math.sin(angle) * radiusPct}%`,
    }
}


const Hero = () => {
    const scope = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            
            // Entrada do conteúdo principal
            gsap.from('.hero-content > *', {
                opacity: 0,
                y: 24,
                duration: 0.9,
                stagger: 0.12,
                ease: 'power3.out',
            })

            // Rotação MUITO lenta dos anéis de órbitas (decorativo)
            gsap.to('.orbit-ring', {
                rotate: 360,
                duration: 120,
                ease: 'none',
                repeat: -1,
            })

            // Flutuação independente de cada imagem
            gsap.utils.toArray('.orbit-item').forEach((el, idx) => {
                const d = gsap.utils.random(2.8, 5.2)
                const y = gsap.utils.random(8, 18)
                const x = gsap.utils.random(-6, 6)
                gsap.to(el, { y, x, duration: d, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: idx * 0.05 })
            })

            // Parallax leve do cluster de órbitas
            const wrap = document.querySelector('.orbit-wrap')
            const onMove = (e) => {
                const b = wrap.getBoundingClientRect()
                const cx = b.left + b.width / 2
                const cy = b.top + b.height / 2
                const dx = (e.clientX - cx) / b.width
                const dy = (e.clientY - cy) / b.height
                gsap.to(wrap, { x: dx * 18, y: dy * 18, duration: 0.6, ease: 'power3.out' })
            }
            window.addEventListener('mousemove', onMove, { passive: true })
            window.addEventListener('touchmove', (t) => {
                if (!t.touches?.[0]) return
                onMove({ clientX: t.touches[0].clientX, clientY: t.touches[0].clientY })
            }, { passive: true })

            // Interação: foco/hover/touch em cada avatar (pulsa)
            const addInteract = (el) => {
                el.addEventListener('pointerenter', () => {
                    gsap.to(el, { scale: 1.15, duration: 0.25, ease: 'power3.out' })
                })
                el.addEventListener('pointerleave', () => {
                    gsap.to(el, { scale: 1, duration: 0.25, ease: 'power3.out' })
                })
            }
            document.querySelectorAll('.orbit-item').forEach(addInteract)

            return () => {
                window.removeEventListener('mousemove', onMove)
            }
        }, scope)

        return () => ctx.revert()
    }, [])

    return (
        <section id="home" ref={scope} className="hero-section">
            <div className="hero-container">
                
                <div className="orbit-wrap" aria-hidden>

                    <div className="orbit-items-layer">
                        {AVATARS.map((a, i) => (
                            <div 
                                key={a.id} 
                                className="orbit-item" 
                                style={placeOnCircle(i, AVATARS.length)}
                            >
                                <img src={a.src} alt={a.alt} className="orbit-avatar" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero-content">
                    <span className="hero-pill">Software • Partnership • Outcomes</span>
                    <h1 className="hero-title">Engineered to Grow Your Business.</h1>
                    <p className="hero-lead">
                        <strong>Beyond code.</strong> We forge lasting partnerships and deliver premium software experiences designed to accelerate your growth.
                    </p>
                    <div className="hero-actions">
                        <a href="#contact" className="cta cta--primary">Let's Talk About Your Project</a>
                        <a href="#services" className="cta cta--ghost">See How We Do It</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero