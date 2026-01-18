/**
 * 🎴 ProjectCard Component - Card
 * Card singolo progetto con TechStack badges
 * REFACTORED: Aggiunto supporto per tech array come da PSEUDOCODE.md
 * 
 * @module components/cards/ProjectCard
 */

import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import './ProjectCard.css';

/**
 * TechStack Component - Mostra i badge delle tecnologie
 * @param {Object} props - Component props
 * @param {string[]} props.techs - Array di nomi tecnologie
 * @returns {JSX.Element|null} Badge tecnologie o null se vuoto
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

TechStack.propTypes = {
    techs: PropTypes.arrayOf(PropTypes.string),
};

/**
 * ProjectCard Component - Card singolo progetto
 * @param {Object} props - Component props
 * @param {string} props.title - Titolo del progetto
 * @param {string} props.description - Descrizione del progetto
 * @param {string} props.imgUrl - URL immagine preview
 * @param {string} props.imgAncor - URL link al progetto
 * @param {string[]} [props.tech] - Array tecnologie usate
 * @returns {JSX.Element} Card progetto
 */
export const ProjectCard = ({ title, description, imgUrl, imgAncor, tech }) => {
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

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
    imgAncor: PropTypes.string,
    tech: PropTypes.arrayOf(PropTypes.string),
};

ProjectCard.defaultProps = {
    imgAncor: '#',
    tech: [],
};

export default ProjectCard;
