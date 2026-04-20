/**
 * 📁 Projects Component - Section
 * Sezione progetti con griglia di cards e filtri
 */

import { useState, useEffect, useRef } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import { ProjectCard } from '../cards/ProjectCard';
import { projects } from '../../data/profileData';
import LottieEmpty from '../common/LottieEmpty';

/** Debounce delay per il filtro di ricerca (ms) */
const DEBOUNCE_DELAY = 300;

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const timerRef = useRef(null);

    // Debounce: aggiorna il termine di ricerca effettivo dopo 300ms
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timerRef.current);
    }, [searchTerm]);
    
    // Filtra progetti in base alla ricerca debounced
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
        (project.tech && project.tech.some(tech => 
            tech.toLowerCase().includes(debouncedTerm.toLowerCase())
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
                  <Col xs={12} className="text-center">
                    <LottieEmpty message={`Nessun progetto trovato per "${searchTerm}"`} />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

    )
}
