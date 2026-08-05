/**
 * 🎴 ProjectCard Component - Card
 * Card singolo progetto con TechStack badges
 * ✅ Migrato a next/image per ottimizzazione automatica
 * ✅ TypeScript con interfacce tipizzate
 * 
 * @module components/cards/ProjectCard
 */

import Image from 'next/image';
import Link from 'next/link';
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
  /** Path assoluto dell'immagine dentro public/ (es. "/img/project_soul.jpeg") */
  imgUrl: string;
  /** URL link al progetto (opzionale, default '#') */
  imgAncor?: string;
  /** Array tecnologie usate (opzionale) */
  tech?: string[];
  /** Slug per la pagina case study (richiesto: alimenta /projects/[slug]) */
  slug: string;
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
  tech = [],
  slug,
}: ProjectCardProps): JSX.Element => {
  return (
    <Col sm={6} md={4}>
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
          <div className="project-actions d-flex gap-3 mt-3">
            <Link href={`/projects/${slug}`} className="btn btn-outline-warning text-decoration-none">
              Info
            </Link>
            <a
              href={imgAncor}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light text-decoration-none"
            >
              Visita il Sito
            </a>
          </div>
        </div>
      </div>
    </Col>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
export type { ProjectCardProps, TechStackProps };
