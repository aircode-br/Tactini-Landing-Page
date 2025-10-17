import React from 'react';
import logo from '../assets/tactini-logo.png';
import "../Styles/Footer.css"


const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-row">
        <div className="footer-left">
          <img src={logo} alt="Tactini" className="footer-logo" />
          <span>© {new Date().getFullYear()} Tactini. All rights reserved.</span>
        </div>

        <nav className="footer-links" aria-label="Links do rodapé">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
