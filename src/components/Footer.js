import { Col, Container, Row } from "react-bootstrap";
import { MailForm } from "./MailForm";
import { BsInstagram, BsFacebook, BsLinkedin } from 'react-icons/bs';

export default function Footer () { 
  return (
    <footer className="footer">
      <Container>
        <Row className="align-item-center">
          <MailForm />
          <Col sm={6}>
            <span>Footer</span>
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="/"><BsLinkedin color='white'/></a>
              <a href="/"><BsFacebook color='white'/></a>
              <a href="/"> <BsInstagram color='white'/> </a>
            </div>
            <p>Copyright 2023, All Right Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}