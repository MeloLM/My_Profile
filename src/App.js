
import { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import NavBar from './components/Vnavbar';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula loading time per mostrare la schermata
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (loading) return;
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Reveal on scroll animation
  useEffect(() => {
    if (loading) return;

    const revealElements = document.querySelectorAll('.skill-bx, .proj-imgbx, .contact form, .timeline-content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="bonfire-animation">🔥</div>
          <h1 className="loading-title">CARMELO LA MANTIA</h1>
          <p className="loading-subtitle">Linking to the Portfolio...</p>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
   <>
   
    <NavBar />
    <Banner />
    <Skills />
    <Projects />
    <Timeline />
    <Contact />
    <Footer />

   </>
  );
}

export default App;
