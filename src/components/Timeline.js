import { Container, Row, Col } from 'react-bootstrap';

export default function Timeline() {
  const timelineData = [
    {
      year: "2021",
      title: "Empatia - Tecnico Gestione Siti Web",
      description: "Primo approccio al mondo del web development. Fondamenti di HTML, CSS e gestione siti.",
      icon: "🎓"
    },
    {
      year: "2022",
      title: "Studio Autonomo",
      description: "Approfondimento JavaScript, WordPress e primi progetti personali.",
      icon: "📚"
    },
    {
      year: "2023",
      title: "Aulab - Full Stack Developer Bootcamp",
      description: "Formazione intensiva: PHP, Laravel, React, MySQL, Git. Progetti pratici e lavoro di team.",
      icon: "💻"
    },
    {
      year: "2024",
      title: "Junior Full Stack Developer",
      description: "Inizio carriera professionale. Sviluppo progetti React, Laravel e continuo apprendimento.",
      icon: "🚀"
    },
    {
      year: "2025",
      title: "Crescita Continua",
      description: "Espansione competenze: Node.js, TypeScript, Docker. Sempre alla ricerca di nuove sfide.",
      icon: "⚔️"
    }
  ];

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
            <div className="timeline">
              {timelineData.map((item, index) => (
                <div 
                  className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} 
                  key={index}
                >
                  <div className="timeline-content">
                    <span className="timeline-icon">{item.icon}</span>
                    <span className="timeline-year">{item.year}</span>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
              <div className="timeline-line"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
