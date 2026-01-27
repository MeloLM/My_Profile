/**
 * 📧 Contact Component - Section
 * Sezione contatti con form EmailJS collegato a Gmail
 * 
 * @module components/sections/Contact
 */

import { useState, useRef, useCallback } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useEmail } from '../../hooks';
import { validateEmail, validateRequired } from '../../utils/validators';
import contactImg from '../../assets/img/bonfire.svg';
import ToastNotification from '../common/ToastNotification';

// Next.js restituisce un oggetto per le immagini importate
const contactImgSrc = typeof contactImg === 'object' && contactImg?.src ? contactImg.src : contactImg;

/** @constant {Object} INITIAL_FORM_STATE - Stato iniziale del form */
const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
};

/**
 * Contact Component
 * Form di contatto con validazione e invio email tramite EmailJS
 * @returns {JSX.Element} Sezione contatti
 */
export default function Contact() {
  const formRef = useRef(null);
  const [bonfireLit, setBonfireLit] = useState(false);
  const [toast, setToast] = useState(null);
  const [formDetails, setFormDetails] = useState(INITIAL_FORM_STATE);
  
  // Hook per gestione email - elimina duplicazione logica
  const { sendEmail, isLoading } = useEmail();

  /**
   * Aggiorna un campo del form
   * @param {string} field - Nome del campo
   * @param {string} value - Nuovo valore
   */
  const onFormUpdate = useCallback((field, value) => {
    setFormDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  /**
   * Valida il form prima dell'invio
   * @returns {boolean} True se valido
   */
  const validateForm = useCallback(() => {
    if (!validateRequired(formDetails.firstName, 2)) {
      setToast({ message: 'Please enter your first name', type: 'warning' });
      return false;
    }
    
    if (!validateEmail(formDetails.email)) {
      setToast({ message: 'Please enter a valid email address', type: 'warning' });
      return false;
    }
    
    if (!validateRequired(formDetails.message, 5)) {
      setToast({ message: 'Please enter a message (min 5 characters)', type: 'warning' });
      return false;
    }
    
    return true;
  }, [formDetails]);

  /**
   * Gestisce l'invio del form
   * @param {Event} e - Submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await sendEmail(formDetails, formRef);
    
    if (result.success) {
      setFormDetails(INITIAL_FORM_STATE);
      setToast({ message: 'Message sent successfully! 🔥', type: 'success' });
    } else {
      setToast({ message: 'Something went wrong, please try again.', type: 'error' });
    }
  };

  /**
   * Gestisce click sul bonfire (easter egg)
   */
  const handleBonfireClick = useCallback(() => {
    setBonfireLit(true);
    setTimeout(() => setBonfireLit(false), 3000);
  }, []);

    

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
            src={contactImgSrc} 
            alt="Bonfire - Click to rest" 
            className={`bonfire-img ${bonfireLit ? 'bonfire-lit' : ''}`}
            onClick={handleBonfireClick}
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
          <form ref={formRef} onSubmit={handleSubmit}>
            <Row>
              <Col sm={6} className="px-1">
                <input 
                  type="text" 
                  name="firstName" 
                  value={formDetails.firstName} 
                  placeholder="First Name" 
                  onChange={(e) => onFormUpdate('firstName', e.target.value)} 
                  autoComplete="given-name" 
                />
              </Col>
              <Col sm={6} className="px-1">
                <input 
                  type="text" 
                  name="lastName" 
                  value={formDetails.lastName} 
                  placeholder="Last Name" 
                  onChange={(e) => onFormUpdate('lastName', e.target.value)} 
                  autoComplete="family-name" 
                />
              </Col>
              <Col sm={6} className="px-1">
                <input 
                  type="email" 
                  name="email" 
                  value={formDetails.email} 
                  placeholder="Email Address" 
                  onChange={(e) => onFormUpdate('email', e.target.value)} 
                  inputMode="email" 
                  autoComplete="email" 
                />
              </Col>
              <Col sm={6} className="px-1">
                <input 
                  type="tel" 
                  name="phone" 
                  value={formDetails.phone} 
                  placeholder="Phone No." 
                  onChange={(e) => onFormUpdate('phone', e.target.value)} 
                  inputMode="tel" 
                  autoComplete="tel" 
                />
              </Col>
              <Col>
                <textarea 
                  rows="6" 
                  name="message"
                  value={formDetails.message} 
                  placeholder="Message" 
                  onChange={(e) => onFormUpdate('message', e.target.value)} 
                />
                <button type="submit" disabled={isLoading}>
                  {isLoading && <span className="spinner"></span>}
                  <span>{isLoading ? 'Sending...' : 'Send'}</span>
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  </section>
  );
}
