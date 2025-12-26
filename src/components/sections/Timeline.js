/**
 * 📅 Timeline Component - Section
 * Sezione percorso formativo/lavorativo
 */

import { Container, Row, Col } from 'react-bootstrap';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { timelineData } from '../../data/profileData';

export default function Timeline() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="timeline-section" id="timeline">
      <Container>
        <Row>
          <Col>
            <h2>Il Mio Percorso</h2>
            <p className="timeline-subtitle">Dal Diploma al Full Stack - La mia avventura nel coding</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="timeline-wrapper">
              <button 
                className="timeline-nav timeline-nav-left" 
                onClick={() => scroll('left')}
                aria-label="Scroll left"
              >
                <ChevronLeft size={30} />
              </button>
              
              <div className="timeline-scroll" ref={scrollRef}>
                <div className="timeline-horizontal">
                  {timelineData.map((item, index) => (
                    <div className="timeline-card" key={index}>
                      <div className="timeline-content">
                        <span className="timeline-icon">{item.icon}</span>
                        <span className="timeline-year">{item.year}</span>
                        <h4>{item.title}</h4>
                        {item.subtitle && <span className="timeline-location">{item.subtitle}</span>}
                        <p>{item.description}</p>
                      </div>
                      {index < timelineData.length - 1 && (
                        <div className="timeline-connector"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                className="timeline-nav timeline-nav-right" 
                onClick={() => scroll('right')}
                aria-label="Scroll right"
              >
                <ChevronRight size={30} />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
