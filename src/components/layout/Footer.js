/**
 * 🦶 Footer Component - Layout
 * Footer con feedback form, logo, social e copyright
 */

import { Col, Container, Row } from "react-bootstrap";
import { Feedback } from './Feedback';
import { SocialIcons } from '../common/SocialIcons';
import meloIco from "../../assets/img/Melo_icon.png";

export default function Footer () {
  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <Feedback />
        <Row className="align-items-center justify-content-between py-5">
          <Col xs={12} md={4} className="text-center text-md-start mb-4 mb-md-0">
            <a href="#home" aria-label="Back to top">
              <img src={meloIco} alt="Carmelo La Mantia Logo" className="footer-logo rounded-5" />
            </a>
          </Col>
          <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
            <SocialIcons githubColor="white" />
          </Col>
          <Col xs={12} md={4} className="text-center text-md-end">
            <p className="mb-0">&#xA9; Copyright | MeloLM | 2025</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
