import { React } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import logo1 from '../assets/img/icon/phyton.png';
import logo2 from '../assets/img/icon/github.png';
import logo3 from '../assets/img/icon/bootstrap.png';
import logo4 from '../assets/img/icon/chatgbt.png';
import logo5 from '../assets/img/icon/javascript.png';
import logo6 from '../assets/img/icon/css.png';
import logo7 from '../assets/img/icon/react.png';
import logo8 from '../assets/img/icon/html.png';


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
                            <p>Le mie competenze sono specializzate nel web development nel frontend con HTML, CSS, JavaScript e nel backend con PHP e Python disposto ad imparne dei nuovi. Conoscenza di sistemi operativi Windows 10, Linux e Unix. Utilizzo di strumenti di collaborazione come Discord e Git/GitHub. Familiarità con il framework Bootstrap e l'editor Visual Studio Code. Esperienza anche con WordPress. </p>
                            <Carousel responsive={responsive} infinite='true' className='skill-slider'>
                                <div className="item">
                                    <img src={logo1} className='rounded-5' alt="ico-python" />
                                    <h5>PYTHON</h5>
                                </div>
                                <div className="item">
                                    <img src={logo2} className='rounded-5' alt="ico-gitHub" />
                                    <h5>GITHUB</h5>
                                </div>
                                <div className="item">
                                    <img src={logo3} className='rounded-5' alt="ico-bootstrap" />
                                    <h5 className='mt-4 pt-2'>BOOTSTRAP</h5>
                                </div>
                                <div className="item">
                                    <img src={logo4} className='rounded-5' alt="ico-chatgpt" />
                                    <h5>CHAT GPT 3.5</h5>
                                </div>
                                <div className="item">
                                    <img src={logo5} className='rounded-5' alt="ico-js" />
                                    <h5>JAVASCRIPT</h5>
                                </div>
                                <div className="item">
                                    <img src={logo6} className='rounded-5' alt="ico-css" />
                                    <h5>CSS</h5>
                                </div>
                                <div className="item">
                                    <img src={logo7} className='rounded-5' alt="ico-react" />
                                    <h5>REACT JS</h5>
                                </div>
                                <div className="item">
                                    <img src={logo8} className='rounded-5' alt="ico-html5" />
                                    <h5>HTML5</h5>
                                </div>
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
                    
        </section>
    
    )
}