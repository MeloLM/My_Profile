/**
 * 🛠️ Skills Component - Section
 * Sezione competenze con carosello e filtri
 */

import { useState, useEffect, useRef } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import { skillsData } from '../../data/profileData';

export default function Skills() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);
    
    // Intersection Observer per animare le skill bars quando visibili
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Anima solo la prima volta
                }
            },
            { threshold: 0.3 }
        );
        
        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }
        
        return () => observer.disconnect();
    }, []);
    
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

    const categories = ['All', 'Frontend', 'Backend', 'Tools'];
    
    const filteredSkills = activeFilter === 'All' 
        ? skillsData 
        : skillsData.filter(skill => skill.category === activeFilter);

    return (
        <section className='skill' id='skills' aria-label="Skills section" ref={skillsRef}>
            <Container>
                <Row>
                    <Col>
                        <div className="skill-bx">
                            <h2>Skills</h2>
                            <p>Le mie competenze sono specializzate nel web development nel frontend con HTML, CSS, JavaScript e nel backend con PHP e Python disposto ad imparne dei nuovi. Conoscenza di sistemi operativi Windows 10, Linux e Unix. Utilizzo di strumenti di collaborazione come Discord e Git/GitHub. Familiarità con il framework Bootstrap e l'editor Visual Studio Code. Esperienza anche con WordPress.</p>
                            
                            {/* Filter Buttons */}
                            <div className="skill-filters">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(category)}
                                        aria-pressed={activeFilter === category}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            
                            <Carousel 
                                responsive={responsive} 
                                infinite={true} 
                                className='skill-slider'
                                autoPlay={true}
                                autoPlaySpeed={2000}
                                keyBoardControl={true}
                                transitionDuration={500}
                                key={activeFilter}
                            >
                                {filteredSkills.map((skill, index) => (
                                    <div className="item" key={index}>
                                        <img src={skill.img} className='rounded-5' alt={`${skill.name} icon`} loading="lazy" />
                                        <h5>{skill.name}</h5>
                                        <div className="skill-progress">
                                            <div 
                                                className={`skill-progress-bar ${isVisible ? 'animate' : ''}`}
                                                style={{ width: isVisible ? `${skill.level}%` : '0%' }}
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
