// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import './App.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      {/* Hamburger button: only opens menu */}
      {!menuOpen && (
        <button
          aria-label="Open menu"
          className="hamburger"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      )}

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <nav className={`overlay-menu visible`} aria-hidden={!menuOpen}>
          <div className="overlay-inner">
            {/* Only this close button */}
            <button
              className="overlay-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <ul>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link></li>
              <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            </ul>
          </div>
        </nav>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}
