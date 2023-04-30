import {React} from 'react';
import { Container , Row , Col , Nav , Tab} from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';
import colorSharp2 from "../assets/img/color-sharp2.png";
import projImg1 from '../assets/img/bg_card.jpeg'


export default function Projects() {
    const projects = [
        {
          title: "Souls Space",
          description: "SoulsLike Blog",
          imgUrl: projImg1,
        },
        {
          title: "Project 00 Real Estate",
          description: "Laravel Project",
          imgUrl: projImg1,
        },
        {
          title: "Project color:Black",
          description: "Aulab Project",
          imgUrl: projImg1,
        },
        {
          title: "Business Startup1",
          description: "Design & Development",
          imgUrl: projImg1,
        },
        {
          title: "Business Startup2",
          description: "Design & Development",
          imgUrl: projImg1,
        },
        {
          title: "Business Startup3",
          description: "Design & Development",
          imgUrl: projImg1,
        },
      ];

    return (
        
        <section className='project' id='projects'>
            <Container>
                <Row>
                    <Col>
                        <h2>Projects</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis natus non dicta fugit laboriosam. Laboriosam, quisquam in. Itaque ullam consequuntur natus obcaecati delectus iste</p>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Nav variant="pills" className='nav-pills mb-5 justify-content-center align-item-center' id='pills-tab'>
                          <Nav.Item>
                            <Nav.Link eventKey="first">Tab One</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Tab Two</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="third">
                              Tab Three
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
                            <Tab.Pane eventKey="third">Lorem ipsum</Tab.Pane>
                        </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <img src={colorSharp2} alt="" className="background-image-right" />
        </section>

    )
}