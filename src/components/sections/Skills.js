/**
 * 🛠️ Skills Component - Section
 * Sezione competenze con carosello
 */

import { Container , Row , Col } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
// Skill icons
import logo1 from '../../assets/img/icon/phyton.png';
import logo2 from '../../assets/img/icon/github.png';
import logo3 from '../../assets/img/icon/bootstrap.png';
import logo4 from '../../assets/img/icon/chatgbt.png';
import logo5 from '../../assets/img/icon/javascript.png';
import logo6 from '../../assets/img/icon/css.png';
import logo7 from '../../assets/img/icon/react.png';
import logo8 from '../../assets/img/icon/html.png';
import logo9 from '../../assets/img/icon/php.png';
import logo10 from '../../assets/img/icon/laravel.jpg';
import logo11 from '../../assets/img/icon/mysql.png';
import logo12 from '../../assets/img/icon/git.png';
import logo13 from '../../assets/img/icon/nodejs.png';
import logo14 from '../../assets/img/icon/wordpress.png';

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

    const skills = [
        { img: logo8, name: "HTML5", level: 90 },
        { img: logo6, name: "CSS3", level: 85 },
        { img: logo5, name: "JAVASCRIPT", level: 75 },
        { img: logo7, name: "REACT JS", level: 70 },
        { img: logo9, name: "PHP", level: 70 },
        { img: logo10, name: "LARAVEL", level: 65 },
        { img: logo11, name: "MYSQL", level: 70 },
        { img: logo1, name: "PYTHON", level: 50 },
        { img: logo3, name: "BOOTSTRAP", level: 85 },
        { img: logo12, name: "GIT", level: 75 },
        { img: logo2, name: "GITHUB", level: 80 },
        { img: logo13, name: "NODE.JS", level: 40 },
        { img: logo14, name: "WORDPRESS", level: 60 },
        { img: logo4, name: "AI TOOLS", level: 85 },
    ];

    return (
        <section className='skill' id='skills' aria-label="Skills section">
            <Container>
                <Row>
                    <Col>
                        <div className="skill-bx">
                            <h2>Skills</h2>
                            <p>Le mie competenze sono specializzate nel web development nel frontend con HTML, CSS, JavaScript e nel backend con PHP e Python disposto ad imparne dei nuovi. Conoscenza di sistemi operativi Windows 10, Linux e Unix. Utilizzo di strumenti di collaborazione come Discord e Git/GitHub. Familiarità con il framework Bootstrap e l'editor Visual Studio Code. Esperienza anche con WordPress.</p>
                            <Carousel 
                                responsive={responsive} 
                                infinite={true} 
                                className='skill-slider'
                                autoPlay={true}
                                autoPlaySpeed={2000}
                                keyBoardControl={true}
                                transitionDuration={500}
                            >
                                {skills.map((skill, index) => (
                                    <div className="item" key={index}>
                                        <img src={skill.img} className='rounded-5' alt={`${skill.name} icon`} loading="lazy" />
                                        <h5>{skill.name}</h5>
                                        <div className="skill-progress">
                                            <div 
                                                className="skill-progress-bar" 
                                                style={{ width: `${skill.level}%` }}
                                                role="progressbar"
                                                aria-valuenow={skill.level}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                        <span className="skill-percent">{skill.level}%</span>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
