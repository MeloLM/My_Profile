import { Col, Container, Row } from "react-bootstrap";
import { MailForm } from "./MailForm";
import { SocialIcons } from './SocialIcons';
import meloIco from "../assets/img/Melo_icon.png";

export default function Footer () {
  return (
    <footer className="footer" role="contentinfo">
      <Container>
        <Row className="align-item-center">
          <MailForm />
          <Col sm={6}>
            <a href="#home" aria-label="Back to top">
              <img src={meloIco} alt="Carmelo La Mantia Logo" className="rounded-5" />
            </a>
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <SocialIcons githubColor="white" />
            <p>&#xA9; Copyright | MeloLM | 2025</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};