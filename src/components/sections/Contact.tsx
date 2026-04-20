/**
 * 📧 Contact Component - Section
 * Sezione contatti con form EmailJS collegato a Gmail
 * ✅ Migrato a next/image per ottimizzazione automatica
 * ✅ TypeScript con interfacce tipizzate
 * 
 * @module components/sections/Contact
 */

import Image from 'next/image';
import { useState, useRef, useCallback, FormEvent } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useEmail } from '../../hooks';
import { validateEmail, validateRequired } from '../../utils/validators';
import contactImg from '../../assets/img/bonfire.svg';
import ToastNotification from '../common/ToastNotification';

// ============================================
// 📝 TYPE DEFINITIONS
// ============================================

/** Struttura dati del form di contatto */
interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

/** Tipo per i campi del form */
type FormField = keyof ContactFormState;

/** Struttura notifica toast */
interface ToastState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

// ============================================
// 📦 CONSTANTS
// ============================================

/** Stato iniziale del form */
const INITIAL_FORM_STATE: ContactFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
};

// ============================================
// 🎨 COMPONENT
// ============================================

/**
 * Contact Component
 * Form di contatto con validazione e invio email tramite EmailJS
 */
export default function Contact(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const [bonfireLit, setBonfireLit] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [formDetails, setFormDetails] = useState<ContactFormState>(INITIAL_FORM_STATE);
  
  // Hook per gestione email - elimina duplicazione logica
  const { sendEmail, isLoading } = useEmail();

  /**
   * Aggiorna un campo del form
   */
  const onFormUpdate = useCallback((field: FormField, value: string): void => {
    setFormDetails(prev => ({ ...prev, [field]: value }));
  }, []);

  /**
   * Valida il form prima dell'invio
   */
  const validateForm = useCallback((): boolean => {
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
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
  const handleBonfireClick = useCallback((): void => {
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
            <Image 
              src={contactImg} 
              alt="Bonfire - Click to rest" 
              className={`bonfire-img ${bonfireLit ? 'bonfire-lit' : ''}`}
              onClick={handleBonfireClick}
              style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
              title="🔥 Click to rest at the bonfire"
              width={400}
              height={400}
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
                  <label htmlFor="contact-firstName" className="visually-hidden">First Name</label>
                  <input 
                    id="contact-firstName"
                    type="text" 
                    name="firstName" 
                    value={formDetails.firstName} 
                    placeholder="First Name" 
                    onChange={(e) => onFormUpdate('firstName', e.target.value)} 
                    autoComplete="given-name" 
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <label htmlFor="contact-lastName" className="visually-hidden">Last Name</label>
                  <input 
                    id="contact-lastName"
                    type="text" 
                    name="lastName" 
                    value={formDetails.lastName} 
                    placeholder="Last Name" 
                    onChange={(e) => onFormUpdate('lastName', e.target.value)} 
                    autoComplete="family-name" 
                  />
                </Col>
                <Col sm={6} className="px-1">
                  <label htmlFor="contact-email" className="visually-hidden">Email Address</label>
                  <input 
                    id="contact-email"
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
                  <label htmlFor="contact-phone" className="visually-hidden">Phone Number</label>
                  <input 
                    id="contact-phone"
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
                  <label htmlFor="contact-message" className="visually-hidden">Message</label>
                  <textarea 
                    id="contact-message"
                    rows={6}
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

// Export per compatibilità
export { Contact };
export type { ContactFormState, ToastState };
