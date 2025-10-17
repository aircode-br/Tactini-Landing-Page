import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from '../assets/tactini-logo.png';
import "../Styles/Header.css"

const Header = () => {
    const headerRef = useRef(null);
    const brandRef = useRef(null);
    const linksRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set([headerRef.current, brandRef.current, linksRef.current.children], {
                opacity: 1
            });

            gsap.from(headerRef.current, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from(brandRef.current, {
                opacity: 0,
                x: -20,
                duration: 0.6,
                delay: 0.3,
                ease: 'power3.out',
                clearProps: 'all'
            });

            gsap.from(linksRef.current.children, {
                opacity: 0,
                y: -10,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.5,
                ease: 'power3.out',
                clearProps: 'all'
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <header className="site-header" ref={headerRef}>
            <div className="container nav">
                <a href="#home" className="brand" ref={brandRef}>
                    <img src={logo} alt="Tactini logo" />
                </a>
                <nav className="links" ref={linksRef}>
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;