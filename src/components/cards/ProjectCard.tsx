/**
 * 🎴 ProjectCard Component - Card
 * Card singolo progetto con TechStack badges
 * ✅ Migrato a next/image per ottimizzazione automatica
 * ✅ TypeScript con interfacce tipizzate
 * 
 * @module components/cards/ProjectCard
 */

import Image, { StaticImageData } from 'next/image';
import { Col } from 'react-bootstrap';
import './ProjectCard.css';

// ============================================
// 📝 TYPE DEFINITIONS
// ============================================

/** Props per TechStack component */
interface TechStackProps {
  techs?: string[];
}

/** Props per ProjectCard component */
interface ProjectCardProps {
  /** Titolo del progetto */
  title: string;
  /** Descrizione del progetto */
  description: string;
  /** URL immagine preview (string o StaticImageData per next/image) */
  imgUrl: string | StaticImageData;
  /** URL link al progetto (opzionale, default '#') */
  imgAncor?: string;
  /** Array tecnologie usate (opzionale) */
  tech?: string[];
}

// ============================================
// 🎨 SUBCOMPONENTS
// ============================================

/**
 * TechStack Component - Mostra i badge delle tecnologie
 */
const TechStack = ({ techs = [] }: TechStackProps): JSX.Element | null => {
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

TechStack.displayName = 'TechStack';

// ============================================
// 🎨 MAIN COMPONENT
// ============================================

/**
 * ProjectCard Component - Card singolo progetto
 */
export const ProjectCard = ({ 
  title, 
  description, 
  imgUrl, 
  imgAncor = '#', 
  tech = [] 
}: ProjectCardProps): JSX.Element => {
  return (
    <Col sm={6} md={4}>
      <a 
        href={imgAncor} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white project-link" 
        aria-label={`View project: ${title}`}
      >
        <div className="proj-imgbx">
          <Image 
            src={imgUrl} 
            alt={title} 
            width={400}
            height={300}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
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

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
export type { ProjectCardProps, TechStackProps };
