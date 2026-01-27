'use client';

/**
 * 🎮 HomePage Component
 * Versione client-side del vecchio App.js
 * Gestisce lazy loading, animazioni scroll e tema globale
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import '../styles/components/loading-screen.css';

// Constants
import {
  LOADING_SCREEN_DURATION,
  PARALLAX_SPEED,
  INTERSECTION_THRESHOLD
} from '../constants';

// Context
import { ThemeProvider } from '../context';

// Layout Components (caricati subito)
import Banner from './layout/Banner';
import NavBar from './layout/Navbar';
import Footer from './layout/Footer';

// Loader Component per Suspense fallback
import Loader from './common/Loader';
import ScrollProgressBar from './common/ScrollProgressBar';
import BackToTop from './common/BackToTop';
import EasterEgg from './common/EasterEgg';
import CursorTrail from './common/CursorTrail';

// Lazy loaded Section Components (caricati on-demand)
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Timeline = lazy(() => import('./sections/Timeline'));
const Contact = lazy(() => import('./sections/Contact'));

/**
 * HomePage Component
 * Componente principale dell'applicazione
 */
export default function HomePage() {
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
        (el as HTMLElement).style.transform = `translateY(${scrolled * PARALLAX_SPEED}px)`;
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
          <p className="loading-subtitle">loading character ...</p>
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
      <EasterEgg />
      <CursorTrail enabled={false} color="#e08821" />
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
