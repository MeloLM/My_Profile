import { Col, Container, Row } from "react-bootstrap";
import { MailForm } from "./MailForm";
import { BsLinkedin, BsGithub, BsInstagram } from 'react-icons/bs';
import meloIco from "../assets/img/Melo_icon.png";

export default function Footer () {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-item-center">
          <MailForm />
          <Col sm={6}>
            <a href="/" onClick={window.scrollTo}>
              <img src={meloIco} alt="logo-melo" className="rounded-5" />
            </a>
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a  href="https://www.linkedin.com/in/carmelo-la-mantia-web-developer/"><BsLinkedin style={{ color: 'rgb(0, 119, 181)'}} /></a>
              <a  href="https://www.instagram.com/carmelo_coding?igsh=MTRmcnVudnRnNXBiZg=="><BsInstagram className='insta_color'/></a>
              <a  href="https://github.com/MeloLM"><BsGithub style={{ color: 'rgb(255,255,255)'}} /></a>
            </div>
            <p>&#xA9; Copyright | MeloLM | 2024</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};