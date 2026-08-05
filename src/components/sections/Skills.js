/**
 * 🛠️ Skills Component - Section
 * Sezione competenze con carosello (senza filtri per categoria)
 * ✅ Migrato a next/image per ottimizzazione automatica
 */

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Container , Row , Col } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import { skillsData } from '../../data/profileData';

export default function Skills() {
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

    return (
        <section className='skill' id='skills' aria-label="Skills section" ref={skillsRef}>
            <Container>
                <Row>
                    <Col>
                        <div className="skill-bx">
                            <h2>Skills</h2>
                            <p>Sviluppatore Full Stack Junior specializzato negli ecosistemi React (Next.js, TypeScript) e PHP (Laravel). Costruisco architetture web complete, gestendo database relazionali e infrastrutture cloud (PostgreSQL, MySQL, Supabase) e curando il deployment tramite Docker e Vercel. Ottimizzo il flusso di lavoro e l&apos;analisi architetturale integrando attivamente tecniche di AI-Augmented Development (Prompt Engineering e Code Review) per accelerare il problem-solving, mantenendo sempre il totale controllo critico sulle scelte architetturali.</p>

                            <Carousel
                                responsive={responsive} 
                                infinite={true} 
                                className='skill-slider'
                                autoPlay={true}
                                autoPlaySpeed={2000}
                                keyBoardControl={true}
                                transitionDuration={500}
                            >
                                {skillsData.map((skill) => {
                                    return (
                                    <div className="item" key={skill.name}>
                                        <Image 
                                          src={skill.img} 
                                          className='rounded-5' 
                                          alt={`${skill.name} icon`} 
                                          width={80}
                                          height={80}
                                          style={{ objectFit: 'contain' }}
                                        />
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
                                    );
                                })}
                            </Carousel>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
