/**
 * 📅 Timeline Component - Section
 * Sezione percorso formativo/lavorativo
 * Con supporto drag & drop per navigazione mouse e indicatori carousel
 */

import { Container, Row, Col } from 'react-bootstrap';
import { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { timelineData } from '../../data/profileData';

export default function Timeline() {
  const scrollRef = useRef(null);
  
  // State per drag
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // State per carousel indicators
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index based on scroll position
  const updateActiveIndex = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollContainer = scrollRef.current;
    const cardWidth = 300; // Approximate card width + gap
    const newIndex = Math.round(scrollContainer.scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, timelineData.length - 1));
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    scrollContainer.addEventListener('scroll', updateActiveIndex);
    return () => scrollContainer.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Navigate to specific card
  const scrollToCard = (index) => {
    if (scrollRef.current) {
      const cardWidth = 300;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = '';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollRef.current) {
        scrollRef.current.style.cursor = 'grab';
        scrollRef.current.style.userSelect = '';
      }
    }
  }, [isDragging]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocità scroll (2x)
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // Touch handlers per mobile
  const handleTouchStart = useCallback((e) => {
    if (!scrollRef.current) return;
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [startX, scrollLeft]);

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
              
              <div 
                className={`timeline-scroll ${isDragging ? 'dragging' : ''}`}
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                style={{ cursor: 'grab' }}
              >
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
            
            {/* Carousel Indicators */}
            <div className="timeline-indicators">
              {timelineData.map((_, index) => (
                <button
                  key={index}
                  className={`timeline-indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => scrollToCard(index)}
                  aria-label={`Vai al punto ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
