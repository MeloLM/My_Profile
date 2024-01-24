import {React} from 'react';
import { Container , Row , Col , Nav , Tab} from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg1 from '../assets/img/project_soul.jpeg';
import projImg2 from '../assets/img/project_moon.jpeg';
import projImg3 from '../assets/img/project_sushi.jpeg';



export default function Projects() {
    const projects = [
        {
          title: "Souls Space",
          description: "SoulsLike Blog",
          imgUrl: projImg1,
          imgAncor:"https://github.com/MeloLM/Carmelo_GamesSpace"
        },
        {
          title: "Project 00 Real Estate",
          description: "Laravel Project",
          imgUrl: projImg1,
          imgAncor:"https://github.com/MeloLM/Project_00_Carmelo__LM"
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
          imgAncor:"https://github.com/MeloLM/Sushi_Project_Carmelo_LM"
        },
        {
          title: "Business Startup2",
          description: "Design & Development",
          imgUrl: projImg1,
          imgAncor:"/"
        },
        {
          title: "Business Startup3",
          description: "Design & Development",
          imgUrl: projImg1,
          imgAncor:"/"
        },
      ];

    return (
        
        <section className='project' id='projects'>
            <Container>
                <Row>
                    <Col>
                        <h2>Projects</h2>
                        <p>Qui sotto alcuni miei progetti: </p>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Nav variant="pills" className='nav-pills mb-5 justify-content-center align-item-center' id='pills-tab'>
                          <Nav.Item>
                            <Nav.Link eventKey="first">Page One</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Page Two</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="third">
                              Page Three
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
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
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">Lorem ipsum</Tab.Pane>
                            <Tab.Pane eventKey="third" className='text-danger'>Lorem ipsum</Tab.Pane>
                        </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <img src={colorSharp2} alt="" className="background-image-right" />
        </section>

    )
}