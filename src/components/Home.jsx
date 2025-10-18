import React, { useEffect, useRef, useState } from 'react';
import './home.css';

export default function Home() {
  const containerRef = useRef(null);
  const isThrottled = useRef(false); // cooldown for wheel
  const touchStartY = useRef(null);
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // cache sections
    sectionsRef.current = Array.from(container.querySelectorAll('.home-section'));

    // Wheel handler - scroll to next/prev section
    const onWheel = (e) => {
      if (isThrottled.current) return;
      const delta = e.deltaY;
      if (Math.abs(delta) < 10) return;
      const sections = sectionsRef.current;
      const rects = sections.map(s => s.getBoundingClientRect());
      const currentIndex = rects.findIndex(r => r.top >= -10 && r.top < window.innerHeight / 2);
      let targetIndex = currentIndex;
      if (delta > 0) targetIndex = Math.min(sections.length - 1, currentIndex + 1);
      else targetIndex = Math.max(0, currentIndex - 1);
      if (currentIndex === -1) {
        const idx = rects.findIndex(r => r.top >= 0);
        if (idx !== -1) targetIndex = idx;
      }
      if (sections[targetIndex]) {
        isThrottled.current = true;
        sections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => (isThrottled.current = false), 700);
      }
    };

    // Touch handlers
    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - (e.changedTouches[0].clientY || 0);
      if (Math.abs(deltaY) < 50) {
        touchStartY.current = null;
        return;
      }
      const sections = sectionsRef.current;
      const rects = sections.map(s => s.getBoundingClientRect());
      const currentIndex = rects.findIndex(r => r.top >= -10 && r.top < window.innerHeight / 2);
      let targetIndex = currentIndex;
      if (deltaY > 0) targetIndex = Math.min(sections.length - 1, currentIndex + 1);
      else targetIndex = Math.max(0, currentIndex - 1);
      if (currentIndex === -1) {
        const idx = rects.findIndex(r => r.top >= 0);
        if (idx !== -1) targetIndex = idx;
      }
      if (sections[targetIndex]) {
        sections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      touchStartY.current = null;
    };

    const onScroll = () => {
      const sections = sectionsRef.current;
      const index = sections.findIndex(s => s.getBoundingClientRect().top >= -window.innerHeight / 2);
      if (index !== -1) setActiveIndex(index);
    };

    container.addEventListener('wheel', onWheel, { passive: true });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Scroll to section on dot click
  const handleDotClick = (index) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="home-scroll-container" ref={containerRef} tabIndex={0}>
      <section className="home-section about-me">
        <div className="section-inner">
          <h1>Hi! I’m Maddie!</h1>
          <p>Data analyst & web developer. I build data-driven, accessible web experiences.</p>
          <a className="home-link" href="/contact">About →</a>
        </div>
      </section>

      <section className="home-section projects-snippet">
        <div className="section-inner">
          <h2>Projects</h2>
          <p>Analytics and web-based projects. Skilled in Python, JavaScript, and more.</p>
          <a className="home-link" href="/projects">Projects →</a>
        </div>
      </section>

      <section className="home-section contact-snippet">
        <div className="section-inner">
          <h2>Contact</h2>
          <p>Want to reach out? Here's how!</p>
          <a className="home-link" href="/contact">Contact →</a>
        </div>
      </section>

      {/* Scroll indicator dots */}
      <div className="scroll-indicator">
        {sectionsRef.current.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
}
