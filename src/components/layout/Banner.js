/**
 * 🏠 Banner Component - Layout
 * Hero section con effetto typewriter
 */

import { useState , useEffect, useCallback, useMemo } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import headerImg from '../../assets/img/solaire.svg';

export default function Banner () {
  const [loopNum , setLoopNum] = useState(0);
  const [isDeleting , setIsDeleting] = useState(false);
  const toRotate = useMemo(() => ["Web Dev", "Front-End Dev", "Back-End Dev"], []);
  const [text , setText] = useState('');
  const [delta , setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  const tick = useCallback(() => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updateText = isDeleting ? fullText.substring(0, text.length -1) : fullText.substring(0, text.length + 1);
    setText(updateText);
    if (isDeleting) {
        setDelta(prevDelta => prevDelta /2)
    }
    if (!isDeleting && updateText === fullText){
        setIsDeleting(true);
        setDelta(period);
    } else if (isDeleting && updateText === ''){
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
    }
  }, [loopNum, isDeleting, text.length, toRotate, period]);
  
  useEffect(() => {
    let ticker = setInterval(() => {
        tick();
    }, delta)
    return () => { clearInterval(ticker)};
  }, [delta, tick]);

  return (
    <section className='banner' id='home' role="banner">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
              <span className="tagline text-white">Welcome to my Portfolio</span>
              <h1>{`Hi, I'm Carmelo La Mantia a `}<span className='wrap' aria-live="polite">{text || '\u00A0'}</span></h1>
              <p className='bg-banner rounded p-2'>Sono un Junior full stack developer con sede ad Agrigento, in Sicilia. Ho frequentato il corso di Tecnico gestione siti web presso Empatia e ho successivamente proseguito la mia formazione come Full Stack Developer presso Aulab srl a Bari. Durante il bootcamp, ho acquisito competenze tecniche su entrambi i lati del front-end e back-end utilizzando linguaggi come HTML, CSS, JavaScript, PHP e framework come Laravel e Bootstrap. Ho anche sviluppato abilità pratiche utilizzando strumenti come Git, GitHub, Visual Studio Code e WordPress.</p>
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
