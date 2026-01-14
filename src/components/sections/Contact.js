/**
 * 📧 Contact Component - Section
 * Sezione contatti con form EmailJS collegato a Gmail
 */

import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Container , Row , Col } from 'react-bootstrap';
import contactImg from '../../assets/img/bonfire.svg';
import ToastNotification from '../common/ToastNotification';

// Config EmailJS per Gmail
const EMAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE || 'service_gt2uoev',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE || 'template_y6xpk4a',
  publicKey: process.env.REACT_APP_EMAILJS_KEY || 'kforPiP9Kqq8o2cYk',
};

export default function Contact() {
  const form = useRef(null);
  const [bonfireLit, setBonfireLit] = useState(false);
  const [toast, setToast] = useState(null);
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }

  const [formDetails , setFormDetails] = useState(formInitialDetails);
  const [buttonText , setButtonText] = useState('Send');
  const [isLoading, setIsLoading] = useState(false);

  const onFormUpdate = (category , value) => {
      setFormDetails({...formDetails, [category] : value})
  }

  // Validazione form
  const validateForm = () => {
    if (!formDetails.firstName.trim()) {
      setToast({ message: 'Please enter your first name', type: 'warning' });
      return false;
    }
    if (!formDetails.email.trim()) {
      setToast({ message: 'Please enter your email', type: 'warning' });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formDetails.email)) {
      setToast({ message: 'Please enter a valid email address', type: 'warning' });
      return false;
    }
    if (!formDetails.message.trim()) {
      setToast({ message: 'Please enter a message', type: 'warning' });
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida prima di inviare
    if (!validateForm()) return;
    
    setButtonText('');
    setIsLoading(true);

    emailjs.sendForm(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      form.current,
      EMAILJS_CONFIG.publicKey
    )
      .then((result) => {
        console.log('✅ Email inviata:', result.text);
        setButtonText("Send");
        setFormDetails(formInitialDetails);
        setIsLoading(false);
        setToast({ message: 'Message sent successfully! 🔥', type: 'success' });
      })
      .catch((error) => {
        console.error('❌ EmailJS Error:', error.text);
        setButtonText("Send");
        setIsLoading(false);
        setToast({ message: 'Something went wrong, please try again.', type: 'error' });
      });
  }

    

  return (
  <section className="contact" id="connect">
    {toast && (
      <ToastNotification
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}
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
            loading="lazy"
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
                <input type="text" name="firstName" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName' , e.target.value)} autoComplete="given-name" />
              </Col>
              <Col sm={6} className="px-1">
                <input type="text" name="lastName" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName' , e.target.value)} autoComplete="family-name" />
              </Col>
              <Col sm={6} className="px-1">
                <input type="email" name="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email' , e.target.value)} inputMode="email" autoComplete="email" />
              </Col>
              <Col sm={6} className="px-1">
                <input type="tel" name="phone" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone' , e.target.value)} inputMode="tel" autoComplete="tel" />
              </Col>
              <Col>
                <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message' , e.target.value)} name="message"></textarea>
                <button type="submit" disabled={isLoading}>
                  {isLoading && <span className="spinner"></span>}
                  <span>{isLoading ? 'Sending...' : buttonText}</span>
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  </section>
  )
}
