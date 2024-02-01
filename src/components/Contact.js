import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Container , Row , Col } from 'react-bootstrap';
import contactImg from '../assets/img/bonfire.svg';

export default function Contact() {
  const form = useRef(null);
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }

  const [formDetails , setFormDetails] = useState(formInitialDetails);
  const [buttonText , setButtonText] = useState('Send');
  const [status , setStatus] = useState({});

  const onFormUpdate = (category , value) => {
      setFormDetails({...formDetails, [category] : value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setButtonText('Sending...');

    emailjs.sendForm('service_gt2uoevD', 'template_y6xpk4a', form.current, 'kforPiP9Kqq8o2cYk')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    setTimeout(() => {
    setButtonText("Send");
    setFormDetails(formInitialDetails);
    setStatus({ success: true, message: 'Message sent successfully' },
      {succes: false, message: 'Message not sended...'});
    }, 1000);
  }

    

  return (
  <section className="contact" id="connect">
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <img src={contactImg} alt="Contact us" />
        </Col>
        <Col md={6}>
          <h2>Get the White Stone <br /> and <span className="text-black">Contact Me</span></h2>
          <form ref={form} onSubmit={handleSubmit}>
            <Row>
              <Col sm={6} className="px-1">
                <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName' , e.target.value)} />
              </Col>
              <Col sm={6} className="px-1">
                <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName' , e.target.value)} />
              </Col>
              <Col sm={6} className="px-1">
                <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email' , e.target.value)} />
              </Col>
              <Col sm={6} className="px-1">
                <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone' , e.target.value)} />
              </Col>
              <Col>
                <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message' , e.target.value)}></textarea>
                <button type="submit" ><span>{buttonText}</span></button>
              </Col>
              {
                status.message && 
                <Col>
                    <p className={status.succes === false ? "danger" : "success"}>{status.message}</p>
                </Col>
              }
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  </section>
  )
}