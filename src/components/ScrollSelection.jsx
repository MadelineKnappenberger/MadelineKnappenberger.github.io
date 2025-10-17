import React, { useRef, useState, useEffect } from 'react';
import './ScrollSection.css';

export default function ScrollSection({ children, bgColor, textColor }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`scroll-section ${isVisible ? 'visible' : ''}`}
      style={{
        background: bgColor || 'transparent',
        color: textColor || '#000',
      }}
    >
      {children}
    </section>
  );
}
