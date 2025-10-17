// src/components/Contact.jsx
import React from 'react';
import './Contact.css';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-inner">
        <h1>About & Contact</h1>
        <p>
          Hi! I’m Maddie — a data analyst and junior web developer based in Bellingham, Washington.  
          I have a BS in Data Science from Western Washington University, alongside years of web development/admin and data analytics experience!
        </p>
        <p>
          Please feel free to reach out for my resume, collaborations, or just to chat!
        </p>
        <div className="contact-icons">
          <a href="mailto:madelineknappenberger@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
          <a href="https://www.linkedin.com/in/maddie-knappenberger/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/MadelineKnappenberger" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
}
