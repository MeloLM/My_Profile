/**
 * 🎮 App Component
 * Componente principale dell'applicazione portfolio
 * Gestisce lazy loading, animazioni scroll e tema globale
 * 
 * @module App
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';

// Constants
import { 
  LOADING_SCREEN_DURATION, 
  PARALLAX_SPEED, 
  INTERSECTION_THRESHOLD 
} from './constants';

// Context
import { ThemeProvider } from './context';

// Layout Components (caricati subito)
import Banner from './components/layout/Banner';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Loader Component per Suspense fallback
import Loader from './components/common/Loader';
import ScrollProgressBar from './components/common/ScrollProgressBar';
import BackToTop from './components/common/BackToTop';

// Lazy loaded Section Components (caricati on-demand)
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Timeline = lazy(() => import('./components/sections/Timeline'));
const Contact = lazy(() => import('./components/sections/Contact'));

/**
 * App Component
 * Entry point dell'applicazione React
 * @returns {JSX.Element} Applicazione completa
 */
function App() {
  const [loading, setLoading] = useState(true);

  // Loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, LOADING_SCREEN_DURATION);

    return () => clearTimeout(timer);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (loading) return;
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * PARALLAX_SPEED}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    }, { threshold: INTERSECTION_THRESHOLD });

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
   <ThemeProvider>
   <ScrollProgressBar />
   <BackToTop />
    <NavBar />
    <Banner />
    <Suspense fallback={<Loader message="Loading sections..." variant="bonfire" />}>
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
    </Suspense>
    <Footer />

   </ThemeProvider>
  );
}

export default App;
