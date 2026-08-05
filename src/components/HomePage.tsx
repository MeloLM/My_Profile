'use client';

/**
 * 🎮 HomePage Component
 * Versione client-side del vecchio App.js
 * Gestisce lazy loading, animazioni scroll e tema globale
 */

import { useState, useEffect, lazy, Suspense } from 'react';
// NB: loading-screen.css è già caricato globalmente da app/layout.tsx
// (via styles/components/index.css), quindi qui non serve reimportarlo.

// Constants
import {
  LOADING_SCREEN_DURATION,
  PARALLAX_SPEED,
  INTERSECTION_THRESHOLD
} from '../constants';

// Layout Components (caricati subito)
import Banner from './layout/Banner';
import NavBar from './layout/Navbar';
import Footer from './layout/Footer';

// Common Components
import Loader from './common/Loader';
import { SkeletonSection } from './common/Loader';
import ScrollProgressBar from './common/ScrollProgressBar';
import BackToTop from './common/BackToTop';
import WhatsAppFloat from './common/WhatsAppFloat';
// import CursorTrail from './common/CursorTrail'; // Rimosso - troppo pacchiano
import ErrorBoundary from './common/ErrorBoundary';
import SkipToContent from './common/SkipToContent';

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
        <div className="loading-content d-flex flex-column align-items-center justify-content-around text-center">
          <div className="bonfire-animation">🔥</div>
          {/*nome obsoleto si rompe e non si centra */}
          {/* <h1 className="loading-title text-center ">CARMELO LA MANTIA</h1> */}
          <h3 className="loading-subtitle m-3 text-center">loading character ...</h3>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SkipToContent targetId="main-content" />
      <ScrollProgressBar />
      <BackToTop />
      <WhatsAppFloat />
      <NavBar />
      <Banner />
      <main id="main-content" tabIndex={-1}>
        <ErrorBoundary sectionName="Skills Section">
          <Suspense fallback={<SkeletonSection title={true} cards={3} />}>
            <Skills />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Projects Section">
          <Suspense fallback={<SkeletonSection title={true} cards={3} />}>
            <Projects />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Timeline Section">
          <Suspense fallback={<Loader message="Loading timeline..." variant="bonfire" />}>
            <Timeline />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary sectionName="Contact Section">
          <Suspense fallback={<Loader message="Loading contact..." variant="bonfire" />}>
            <Contact />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
