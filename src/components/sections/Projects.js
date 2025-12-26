/**
 * 📁 Projects Component - Section
 * Sezione progetti con griglia di cards
 */

import { Container , Row , Col } from 'react-bootstrap';
import { ProjectCard } from '../cards/ProjectCard';
import colorSharp2 from "../../assets/img/color-sharp2.png";
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
                {
                  projects.map((project , index) => {
                    return (
                      <ProjectCard 
                      key={index}
                      {...project}
                      />
                    )
                  })
                }
              </Row>
            </Col>
          </Row>
        </Container>
        <img src={colorSharp2} alt="" className="background-image-right" />
      </section>

    )
}
