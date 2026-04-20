/**
 * 🏠 Banner Component - Layout
 * Hero section con effetto typewriter
 * REFACTORED: Usa useTypewriter hook e profileData come da PSEUDOCODE.md
 * ✅ Migrato a next/image per ottimizzazione automatica
 */

import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useTypewriter } from '../../hooks';
import { personalInfo, summary } from '../../data/profileData';
import headerImg from '../../assets/img/solaire.svg';
import { useRef, useCallback } from 'react';

export default function Banner() {
  const tiltRef = useRef(null);

  // 3D tilt effect on hero image
  const handleMouseMove = useCallback((e) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    tiltRef.current.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg) scale(1.04)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    }
  }, []);
  // REFACTORED: Uso dell'hook useTypewriter invece della logica inline
  // useMemo per evitare re-render loop con useTypewriter
  const roles = ["Web Dev", "Front-End Dev", "Back-End Dev"];
  const { displayedText } = useTypewriter(roles, {
    speed: 100,
    deleteSpeed: 50,
    delayBetween: 2000,
    loop: true,
    cursor: true,
  });

  return (
    <section className='banner' id='home' role="banner">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline text-white">Welcome to my Portfolio</span>
            <h1>{`Hi, I'm ${personalInfo.name} a `}<span className='wrap' aria-live="polite">{displayedText || '\u00A0'}</span></h1>
            <p className='bg-banner rounded p-2'>{summary}</p>
            <div className="banner-buttons">
              <button onClick={() => document.getElementById('connect').scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to contact section">
                Contact Me <ArrowRightCircle size={25} />
              </button>
              <a href="/CV_Carmelo_la_mantia_2026.pdf" download className="cv-download-btn" aria-label="Download CV">
                Download CV <ArrowRightCircle size={25} />
              </a>
            </div>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <div
              ref={tiltRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}
            >
              <Image 
                src={headerImg} 
                alt='Solaire of Astora - Dark Souls themed illustration'
                priority
                width={500}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
