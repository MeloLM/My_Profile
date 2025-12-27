
import { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';

// Context
import { ThemeProvider } from './context';

// Layout Components (caricati subito)
import Banner from './components/layout/Banner';
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy loaded Section Components (caricati on-demand)
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Timeline = lazy(() => import('./components/sections/Timeline'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loader Component per Suspense fallback
import Loader from './components/common/Loader';

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
   <ThemeProvider>
   
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
