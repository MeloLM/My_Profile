/**
 * 🎴 ProjectCard Component - Card
 * Card singolo progetto con TechStack badges
 * REFACTORED: Aggiunto supporto per tech array come da PSEUDOCODE.md
 */

import { Col } from 'react-bootstrap';
import './ProjectCard.css';

/**
 * TechStack Component - Mostra i badge delle tecnologie
 */
const TechStack = ({ techs = [] }) => {
    if (!techs || techs.length === 0) return null;
    
    return (
        <div className="tech-stack">
            {techs.map((tech, index) => (
                <span key={index} className="tech-badge">
                    {tech}
                </span>
            ))}
        </div>
    );
};

/**
 * CardActions Component - Link al progetto
 */
const CardActions = ({ links }) => {
    if (!links) return null;
    
    return (
        <div className="card-actions">
            {links.demo && (
                <a href={links.demo} target="_blank" rel="noopener noreferrer" className="action-btn">
                    <i className="bi bi-eye"></i> Demo
                </a>
            )}
            {links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="action-btn">
                    <i className="bi bi-github"></i> Code
                </a>
            )}
        </div>
    );
};

export const ProjectCard = ({ title, description, imgUrl, imgAncor, tech, links }) => {
    return (
        <Col sm={6} md={4}>
            <a href={imgAncor} target='_blank' rel="noopener noreferrer" className='text-white project-link' aria-label={`View project: ${title}`}>
                <div className="proj-imgbx">
                    <img src={imgUrl} alt={title} loading="lazy"/>
                    <div className="proj-txtx">
                        <h4>{title}</h4>
                        <span>{description}</span>
                        <TechStack techs={tech} />
                    </div>
                </div>
            </a>
        </Col>
    );
};

export default ProjectCard;
