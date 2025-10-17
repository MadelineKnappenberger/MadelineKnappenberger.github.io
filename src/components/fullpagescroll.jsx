import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FullPageScroll() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 0,
      content: (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Hi, I'm Maddie</h1>
          <p className="text-lg mb-8">Web Developer & Data Analyst</p>
          <button onClick={() => navigate("/contact")}>About Me</button>
        </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4">Projects</h2>
          <p className="mb-8 text-lg">Explore my web and data projects.</p>
          <button onClick={() => navigate("/projects")}>See Projects</button>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-4">Let’s Connect</h2>
          <p className="mb-8 text-lg">Reach out to collaborate or say hi!</p>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </div>
      ),
    },
  ];

  const handleScroll = (e) => {
    if (e.deltaY > 0 && activeSection < sections.length - 1) {
      setActiveSection((prev) => prev + 1);
    } else if (e.deltaY < 0 && activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }
  };

  return (
    <div
      className="relative h-screen overflow-hidden"
      onWheel={handleScroll}
      style={{ scrollSnapType: "y mandatory" }}
    >
      {sections.map((section, index) => (
        <section
          key={section.id}
          style={{
            transform: `translateY(${(index - activeSection) * 100}vh)`,
            background: "linear-gradient(135deg, #E37383, #DA485D)",
          }}
          className="transition-transform duration-700 ease-in-out flex items-center justify-center h-screen"
        >
          {section.content}
        </section>
      ))}
      <div className="dot-container">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === activeSection ? "active" : ""}`}
            onClick={() => {
              if (index === 2) navigate("/contact");
              setActiveSection(index);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default FullPageScroll;
