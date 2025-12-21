import { Container, Row, Col } from 'react-bootstrap';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export default function Timeline() {
  const scrollRef = useRef(null);

  const timelineData = [
    {
      year: "2020",
      title: "Diploma - Ragioniere e Perito Commerciale",
      description: "Conclusione degli studi superiori. Prime basi di informatica e gestione aziendale.",
      icon: "🎓"
    },
    {
      year: "2021",
      title: "Empatia - Tecnico Gestione Siti Web",
      description: "Corso professionale: HTML, CSS, WordPress. Primo approccio al web development.",
      icon: "💡"
    },
    {
      year: "2022",
      title: "Studio Autonomo & Progetti",
      description: "Approfondimento JavaScript, Git/GitHub. Creazione primi progetti personali e portfolio.",
      icon: "📚"
    },
    {
      year: "2023",
      title: "Aulab Hackademy - Full Stack Developer",
      description: "Bootcamp intensivo a Bari: PHP, Laravel, React, MySQL. Progetti di team e metodologie Agile.",
      icon: "💻"
    },
    {
      year: "2024",
      title: "Junior Full Stack Developer",
      description: "Sviluppo professionale: React, Laravel, API REST. Collaborazione su progetti reali.",
      icon: "🚀"
    },
    {
      year: "2025",
      title: "Crescita & Nuove Sfide",
      description: "Espansione competenze: Node.js, TypeScript, Docker. Open to work e nuove opportunità!",
      icon: "⚔️"
    }
  ];

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
            <p className="timeline-subtitle">Da Empatia ad oggi - La mia avventura nel coding</p>
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
