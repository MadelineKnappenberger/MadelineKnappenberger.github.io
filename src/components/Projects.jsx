// src/components/Projects.jsx
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import './projects.css';

export default function Projects() {
  const [openIndex, setOpenIndex] = useState(null);

  const analyticsProjects = [
    {
      title: 'Women In Headlines',
      description: (
        <>
          <p>
            Final Project for Data 311 - Fundamentals of Data Science. A Python-based project working with a dataset containing headlines from top news sources (2010-2020) from USA, India, UK, and South Africa — all centered around women. We analyzed bias, gendered language, and common themes, and trained a model to predict themes.
          </p>
          <p>
            Technologies used: Pandas, BERTopic, Vader sentiment analysis, and Seaborn for visualizations.
          </p>
          <p>
            <a href="https://github.com/maddieknappenberger/Women-In-Headlines" target="_blank" rel="noreferrer">
              <FaGithub color="white" size={24} style={{ verticalAlign: 'middle' }} />
            </a>
          </p>
          <iframe
            src="/Women In Headlines Overview.html"
            width="100%"
            height="600px"
            title="Women In Headlines Notebook"
            style={{ border: '1px solid #ccc', borderRadius: '12px', marginTop: '1rem' }}
          ></iframe>
        </>
      )
    },
    {
      title: 'Diversity in Arts',
      description: (
        <>
          <p>
            Part of a data science team analyzing inclusivity in major art institutions post-pandemic, using advanced Python techniques. My work involved web scraping, contacting museums via social media and email, data cleaning, and visualizations.
          </p>
          <p>
            The project showcases trends in artist representation and mission statements. Project website: <a href="https://wwudiversityinthearts.streamlit.app/" target="_blank" rel="noreferrer">Diversity in the Arts</a>
          </p>
        </>
      )
    }
  ];

  const devProjects = [
    {
      title: 'Pillease',
      description: (
        <>
          <p>
            Pillease is an accessible Android and iOS app designed to help individuals with Autism and other neurodivergent disorders manage their medication effectively. This project was created as part of the CSCI436: Technology for Social Good course at Western Washington University by the collaborative efforts of Maddie Knappenberger, Takira Boltman, Kiel Selapack, and Ryan Greenwalt.
          </p>
          <p>
            My parts involved a Figma UI mockup, as well as some of the mobile development using React Native and testing via Expo Go.
          </p>
          <p>
            <a href="https://github.com/Ryan-Greenwalt/Pillease2" target="_blank" rel="noreferrer">
              <FaGithub color="white" size={24} style={{ verticalAlign: 'middle' }} />
            </a>
          </p>
          <img
            src="/Pillease-figma-mockup.png"
            alt="Pillease Figma Mockup"
            style={{
              width: '100%',
              borderRadius: '12px',
              marginTop: '1rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
            }}
          />
        </>
      )
    },
    {
      title: 'Portfolio Site',
      description: (
        <>
          <p>
            You're looking at it! Built with HTML, CSS, React and Vite.
          </p>
      
        </>
      )
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderAccordion = (projects, groupOffset) =>
    projects.map((project, i) => (
      <div
        key={i}
        className={`project-bucket ${openIndex === i + groupOffset ? 'open' : ''}`}
        onClick={() => toggleAccordion(i + groupOffset)}
      >
        <h3>{project.title}</h3>
        {openIndex === i + groupOffset && <div>{project.description}</div>}
      </div>
    ));

  return (
    <div className="projects-page">
      <h1>Projects</h1>

      <section className="project-group">
        <h2>Analytics Projects</h2>
        {renderAccordion(analyticsProjects, 0)}
      </section>

      <section className="project-group">
        <h2>Development Projects</h2>
        {renderAccordion(devProjects, analyticsProjects.length)}
      </section>
    </div>
  );
}
