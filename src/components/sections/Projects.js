/**
 * 📁 Projects Component - Section
 * Sezione progetti con griglia di cards e filtri
 */

import { useState } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import { ProjectCard } from '../cards/ProjectCard';
import colorSharp2 from "../../assets/img/color-sharp2.png";
import { projects } from '../../data/profileData';



export default function Projects() {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Filtra progetti in base alla ricerca
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tech && project.tech.some(tech => 
            tech.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );

    return (
        
      <section className='project' id='projects'>
        <Container>
          <Row>
            <Col>
              <h2>Projects</h2>
              <p>Qui sotto alcuni miei progetti: </p>
              
              {/* Search Bar */}
              <div className="project-search">
                <input
                  type="text"
                  placeholder="Cerca progetti per tecnologia (React, Laravel, JavaScript...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  aria-label="Search projects"
                />
                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <Row className='mt-4'>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project , index) => {
                    return (
                      <ProjectCard 
                      key={index}
                      {...project}
                      />
                    )
                  })
                ) : (
                  <Col className="text-center">
                    <p className="no-results">Nessun progetto trovato per "{searchTerm}"</p>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
        <img src={colorSharp2} alt="" className="background-image-right" loading="lazy" />
      </section>

    )
}
