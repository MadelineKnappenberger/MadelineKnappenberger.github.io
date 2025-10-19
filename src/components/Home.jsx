import React, { useEffect, useRef, useState } from "react";
import "./home.css";

// Custom Particles Component
function Particles() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.x = Math.random() * canvas.width;
        if (this.y < 0 || this.y > canvas.height) this.y = Math.random() * canvas.height;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        
        // Draw sparkle shape (4-pointed star)
        const size = this.radius * 2;
        ctx.beginPath();
        // Vertical line
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        // Horizontal line
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        // Diagonal lines
        ctx.moveTo(-size * 0.7, -size * 0.7);
        ctx.lineTo(size * 0.7, size * 0.7);
        ctx.moveTo(size * 0.7, -size * 0.7);
        ctx.lineTo(-size * 0.7, size * 0.7);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Add center glow
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Initialize particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle());
    }

    const drawLines = () => {
      // Remove connecting lines for cleaner sparkle effect
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Repulse from mouse
        if (mouseRef.current.x !== null) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.x += (dx / distance) * force * 2;
            particle.y += (dy / distance) * force * 2;
          }
        }
        
        particle.update();
        particle.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const isThrottled = useRef(false);
  const touchStartY = useRef(null);
  const sectionsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    sectionsRef.current = Array.from(
      container.querySelectorAll(".home-section")
    );

    const onWheel = (e) => {
      if (isThrottled.current) return;
      const delta = e.deltaY;
      if (Math.abs(delta) < 10) return;
      const sections = sectionsRef.current;
      const rects = sections.map((s) => s.getBoundingClientRect());
      const currentIndex = rects.findIndex(
        (r) => r.top >= -10 && r.top < window.innerHeight / 2
      );
      let targetIndex = currentIndex;
      if (delta > 0)
        targetIndex = Math.min(sections.length - 1, currentIndex + 1);
      else targetIndex = Math.max(0, currentIndex - 1);
      if (currentIndex === -1) {
        const idx = rects.findIndex((r) => r.top >= 0);
        if (idx !== -1) targetIndex = idx;
      }
      if (sections[targetIndex]) {
        isThrottled.current = true;
        sections[targetIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setTimeout(() => (isThrottled.current = false), 700);
      }
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return;
      const deltaY = touchStartY.current - (e.changedTouches[0].clientY || 0);
      if (Math.abs(deltaY) < 50) {
        touchStartY.current = null;
        return;
      }
      const sections = sectionsRef.current;
      const rects = sections.map((s) => s.getBoundingClientRect());
      const currentIndex = rects.findIndex(
        (r) => r.top >= -10 && r.top < window.innerHeight / 2
      );
      let targetIndex = currentIndex;
      if (deltaY > 0)
        targetIndex = Math.min(sections.length - 1, currentIndex + 1);
      else targetIndex = Math.max(0, currentIndex - 1);
      if (currentIndex === -1) {
        const idx = rects.findIndex((r) => r.top >= 0);
        if (idx !== -1) targetIndex = idx;
      }
      if (sections[targetIndex]) {
        sections[targetIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      touchStartY.current = null;
    };

    const onScroll = () => {
      const sections = sectionsRef.current;
      const index = sections.findIndex(
        (s) => s.getBoundingClientRect().top >= -window.innerHeight / 2
      );
      if (index !== -1) setActiveIndex(index);
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleDotClick = (index) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="home-scroll-container" ref={containerRef} tabIndex={0}>
      <Particles />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <section className="home-section about-me">
          <div className="section-inner">
            <h1>Hi! I'm Maddie!</h1>
            <p>Web developer & data analyst. I build data-driven, accessible web experiences.</p>
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

        <div className="scroll-indicator">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`dot ${i === activeIndex ? "active" : ""}`}
              onClick={() => handleDotClick(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}