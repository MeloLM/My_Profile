import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Container , Row , Col } from 'react-bootstrap';
import contactImg from '../assets/img/bonfire.svg';

export default function Contact() {
  const form = useRef(null);
  const [bonfireLit, setBonfireLit] = useState(false);
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

  // Validazione form
  const validateForm = () => {
    if (!formDetails.firstName.trim()) {
      setStatus({ success: false, message: 'Please enter your first name' });
      return false;
    }
    if (!formDetails.email.trim()) {
      setStatus({ success: false, message: 'Please enter your email' });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formDetails.email)) {
      setStatus({ success: false, message: 'Please enter a valid email address' });
      return false;
    }
    if (!formDetails.message.trim()) {
      setStatus({ success: false, message: 'Please enter a message' });
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida prima di inviare
    if (!validateForm()) return;
    
    setButtonText('');
    setStatus({ loading: true });

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE || 'service_gt2uoevD',
      process.env.REACT_APP_EMAILJS_TEMPLATE || 'template_y6xpk4a',
      form.current,
      process.env.REACT_APP_EMAILJS_KEY || 'kforPiP9Kqq8o2cYk'
    )
      .then((result) => {
        console.log(result.text);
        setButtonText("Send");
        setFormDetails(formInitialDetails);
        setStatus({ success: true, message: 'Message sent successfully!' });
      })
      .catch((error) => {
        console.log(error.text);
        setButtonText("Send");
        setStatus({ success: false, message: 'Something went wrong, please try again.' });
      });
  }

    

  return (
  <section className="contact" id="connect">
    <Container>
      <Row className="align-items-center">
        <Col md={6} className="bonfire-container">
          <img 
            src={contactImg} 
            alt="Bonfire - Click to rest" 
            className={`bonfire-img ${bonfireLit ? 'bonfire-lit' : ''}`}
            onClick={() => {
              setBonfireLit(true);
              setTimeout(() => setBonfireLit(false), 3000);
            }}
            style={{ cursor: 'pointer' }}
            title="🔥 Click to rest at the bonfire"
          />
          {bonfireLit && (
            <div className="bonfire-message">
              <span>🔥 BONFIRE LIT 🔥</span>
            </div>
          )}
        </Col>
        <Col md={6}>
          <h2>Get the White Stone <br /> and <span className="text-black">Contact Me</span></h2>
          <form ref={form} onSubmit={handleSubmit}>
            <Row>
              <Col sm={6} className="px-1">
                <input type="text" name="firstName" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName' , e.target.value)} />
              </Col>
              <Col sm={6} className="px-1">
                <input type="text" name="lastName" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName' , e.target.value)} />
              </Col>
              <Col sm={6} className="px-1">
                <input type="email" name="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email' , e.target.value)} />
              </Col>
              <Col sm={6} className="px-1">
                <input type="tel" name="phone" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone' , e.target.value)} />
              </Col>
              <Col>
                <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message' , e.target.value)} name="message"></textarea>
                <button type="submit" disabled={status.loading}>
                  {status.loading && <span className="spinner"></span>}
                  <span>{status.loading ? 'Sending...' : buttonText}</span>
                </button>
              </Col>
              {
                status.message && 
                <Col>
                    <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
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