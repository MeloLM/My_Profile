'use client';

/**
 * 📋 ProjectCaseStudy Component
 * Pagina di dettaglio per ogni progetto
 */

import Image from 'next/image';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowLeft, BoxArrowUpRight } from 'react-bootstrap-icons';
import { ThemeProvider } from '../../context';
import NavBar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ScrollProgressBar from '../common/ScrollProgressBar';
import BackToTop from '../common/BackToTop';
import '../../App.css';
import '../../styles/global.css';
import '../../styles/components/index.css';
import './ProjectCaseStudy.css';

interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  results?: string[];
  imgUrl: { src: string } | string;
  imgAncor: string;
  tech: string[];
}

interface Props {
  project: Project;
}

export default function ProjectCaseStudy({ project }: Props) {
  const imgSrc = typeof project.imgUrl === 'string' ? project.imgUrl : project.imgUrl?.src;

  return (
    <ThemeProvider>
      <ScrollProgressBar />
      <BackToTop />
      <NavBar />
      <main className="project-case-study" id="main-content">
        <Container>
          {/* Back link */}
          <div className="case-back">
            <Link href="/#projects" className="case-back-link">
              <ArrowLeft size={18} /> Torna ai Progetti
            </Link>
          </div>

          {/* Hero */}
          <div className="case-hero">
            {imgSrc && (
              <div className="case-hero-img">
                <Image
                  src={imgSrc}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
            <div className="case-hero-content">
              <h1 className="case-title">{project.title}</h1>
              <p className="case-subtitle">{project.description}</p>
              <div className="case-tech-badges">
                {project.tech.map((t) => (
                  <span key={t} className="case-badge">{t}</span>
                ))}
              </div>
              <a
                href={project.imgAncor}
                target="_blank"
                rel="noopener noreferrer"
                className="case-cta"
              >
                Vedi il Progetto <BoxArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Body */}
          <Row className="case-body">
            {project.longDescription && (
              <Col xs={12} className="case-section">
                <h2>📖 Overview</h2>
                <p>{project.longDescription}</p>
              </Col>
            )}

            {project.problem && (
              <Col xs={12} md={6} className="case-section">
                <h2>🔴 Problema</h2>
                <p>{project.problem}</p>
              </Col>
            )}

            {project.solution && (
              <Col xs={12} md={6} className="case-section">
                <h2>🟢 Soluzione</h2>
                <p>{project.solution}</p>
              </Col>
            )}

            {project.results && project.results.length > 0 && (
              <Col xs={12} className="case-section">
                <h2>🏆 Risultati</h2>
                <ul className="case-results">
                  {project.results.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </Col>
            )}
          </Row>

          {/* Footer nav */}
          <div className="case-back case-back--bottom">
            <Link href="/#projects" className="case-back-link">
              <ArrowLeft size={18} /> Tutti i Progetti
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
