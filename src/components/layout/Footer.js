/**
 * 🦶 Footer Component - Layout
 * Footer con feedback form, logo, social e copyright
 * REFACTORED: Usa profileData come da PSEUDOCODE.md
 */

import { Col, Container, Row } from "react-bootstrap";
import { Feedback } from './Feedback';
import { SocialIcons } from '../common/SocialIcons';
import { personalInfo } from '../../data/profileData';
import meloIco from "../../assets/img/Melo_icon.png";

export default function Footer () {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <Feedback />
        <Row className="align-items-center justify-content-between py-5">
          <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0">
            <a href="#home" aria-label="Back to top">
              <img src={meloIco} alt={`${personalInfo.name} Logo`} className="footer-logo rounded-5" loading="lazy" />
            </a>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end">
            <SocialIcons githubColor="white" />
            <p className="mb-0 mt-3">&#xA9; Copyright | {personalInfo.name} | {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
