/**
 * 💬 Feedback Component - Layout
 * Form per inviare feedback via EmailJS (ex Newsletter)
 */

import { useState, useRef } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import emailjs from '@emailjs/browser';

// Configurazione EmailJS per Gmail
const EMAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE,
  publicKey: process.env.REACT_APP_EMAILJS_KEY
};

export const Feedback = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef();

  const clearFields = () => {
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || email.indexOf("@") === -1) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form.current,
        EMAILJS_CONFIG.publicKey
      );
      
      setStatus('success');
      setMessage('Feedback sent successfully! 🔥');
      clearFields();
    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      setStatus('error');
      setMessage('Something went wrong, please try again.');
    }
  };

  return (
    <Col lg={12}>
      <div className="newsletter-bx">
        <Row>
          <Col lg={12} md={6} xl={5}>
            <h3>Send a Feedback</h3>
            {status === "sending" && <Alert>Sending...</Alert>}
            {status === "error" && <Alert variant="danger">{message}</Alert>}
            {status === "success" && <Alert variant="success">{message}</Alert>}
          </Col>
          <Col md={6} xl={7}>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="new-email-bx">
                <input 
                  value={email} 
                  type="email" 
                  name="from_email"
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email Address" 
                />
                <button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  );
};
