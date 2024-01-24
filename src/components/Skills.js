import { React } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import meter1 from '../assets/img/meter1.svg';
import meter2 from '../assets/img/meter2.svg';
import meter3 from '../assets/img/meter3.svg';
import colorSharp from '../assets/img/color-sharp.png'


export default function Skills() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


    return (

        <section className='skill' id='skills'>
            <Container>
                <Row>
                    <Col>
                        <div className="skill-bx">
                            <h2>
                                Skills
                            </h2>
                            <p>Le mie competenze sono specializzate nel web development con focus su frontend (HTML, CSS, JavaScript, React.js) e backend (PHP, Laravel). Conoscenza di sistemi operativi Windows 10, Linux e Unix. Utilizzo di strumenti di collaborazione come Discord e Git/GitHub. Familiarità con il framework Bootstrap e l'editor Visual Studio Code. Esperienza anche con WordPress. </p>
                            <Carousel responsive={responsive} infinite='true' className='skill-slider'>
                                <div className="item">
                                    <img src={meter1} alt="" />
                                    <h5>PYTHON SKILL</h5>
                                </div>
                                <div className="item">
                                    <img src={meter1} alt="" />
                                    <h5>PHP SKILL</h5>
                                </div>
                                <div className="item">
                                    <img src={meter2} alt="" />
                                    <h5>JAVASCRIPT SKILL</h5>
                                </div>
                                <div className="item">
                                    <img src={meter3} alt="" />
                                    <h5>HTML SKILL</h5>
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
            <img className='background-image-left' src={colorSharp} alt="color Sharp" />
        </section>
    
    )
}