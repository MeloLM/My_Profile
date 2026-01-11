/**
 * 🏠 Banner Component - Layout
 * Hero section con effetto typewriter
 * REFACTORED: Usa useTypewriter hook e profileData come da PSEUDOCODE.md
 */

import { Container , Row , Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useTypewriter } from '../../hooks';
import { personalInfo, summary } from '../../data/profileData';
import headerImg from '../../assets/img/solaire.svg';

export default function Banner () {
  // REFACTORED: Uso dell'hook useTypewriter invece della logica inline
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
                  Contact Me <ArrowRightCircle size={25}/>
                </button>
                <a href="/CV_Carmelo_la_mantia_2025.pdf" download className="cv-download-btn" aria-label="Download CV">
                  Download CV <ArrowRightCircle size={25}/>
                </a>
              </div>
          </Col>
          <Col xs={12} md={6} xl={5}>
              <img src={headerImg} alt='Solaire of Astora - Dark Souls themed illustration' />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
