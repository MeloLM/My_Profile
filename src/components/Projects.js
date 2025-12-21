import {React} from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg1 from '../assets/img/project_soul.jpeg';
import projImg2 from '../assets/img/project_moon.jpeg';
import projImg3 from '../assets/img/project_sushi.jpeg';
import projImg4 from '../assets/img/presto_it.jpg';



export default function Projects() {
    const projects = [
        {
          title: "Souls Space",
          description: "SoulsLike Blog",
          imgUrl: projImg1,
          imgAncor:"https://github.com/MeloLM/Carmelo_GamesSpace"
        },
        {
          title: "Project color:Black",
          description: "Aulab Project",
          imgUrl: projImg2,
          imgAncor:"https://github.com/MeloLM/Black_template_Carmelo_LM"
        },
        {
          title: "Project React-sushi",
          description: "React project",
          imgUrl: projImg3,
          imgAncor:"https://sushi-project-cml.vercel.app/"
        },
        {
          title: "E-commerce Presto.it",
          description: "Laravel Project",
          imgUrl: projImg4,
          imgAncor:"https://github.com/Hackademy66/Presto.it_Gruppo_04"
        },
      ];

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