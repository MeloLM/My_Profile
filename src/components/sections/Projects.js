/**
 * 📁 Projects Component - Section
 * Sezione progetti con griglia di cards
 */

import { Container , Row , Col } from 'react-bootstrap';
import { ProjectCard } from '../cards/ProjectCard';
import { projects } from '../../data/profileData';

export default function Projects() {
    return (

      <section className='project' id='projects'>
        <Container>
          <Row>
            <Col>
              <h2>Projects</h2>
              <p>Qui sotto alcuni miei progetti: </p>

              <Row className='mt-4'>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    {...project}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

    )
}
