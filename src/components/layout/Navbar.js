/**
 * 🧭 Navbar Component - Layout
 * Barra di navigazione con effetto scroll
 * REFACTORED: Usa useScroll hook come da PSEUDOCODE.md
 * ✅ Migrato a next/link per prefetching client-side
 */

import Link from 'next/link';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Navbar , Container , Nav } from 'react-bootstrap';
import { SocialIcons } from '../common/SocialIcons';
import { useScroll } from '../../hooks';
import { personalInfo } from '../../data/profileData';

export default function NavBar() {
    const [activeLink, setActiveLink] = useState('home');
    const [expanded, setExpanded] = useState(false);
    // REFACTORED: Uso dell'hook useScroll invece di useState/useEffect manuale
    const { scrolled } = useScroll(50);
    const navRef = useRef(null);

    const onUpdateActiveLink = useCallback((value) => {
        setActiveLink(value);
        // Chiudi menu mobile dopo click su link
        setExpanded(false);
    }, []);

    // Chiudi menu quando si clicca fuori
    const handleOverlayClick = useCallback(() => {
        setExpanded(false);
    }, []);

    // Previeni scroll body quando menu è aperto su mobile
    useEffect(() => {
        if (expanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [expanded]);

    // Keyboard: Escape to close + focus trap when mobile menu open
    useEffect(() => {
        if (!expanded) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setExpanded(false);
                const toggler = navRef.current?.querySelector('.navbar-toggler');
                toggler?.focus();
                return;
            }

            if (e.key === 'Tab') {
                const focusable = navRef.current?.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (!focusable || focusable.length === 0) return;

                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [expanded]);

    return (
        <>
        {/* Overlay scuro quando menu mobile è aperto */}
        <div 
            className={`navbar-overlay ${expanded ? 'show' : ''}`} 
            onClick={handleOverlayClick}
            aria-hidden="true"
        />

        <Navbar 
            expand="lg" 
            className={scrolled ? "scrolled" : ""} 
            role="navigation" 
            aria-label="Main navigation"
            expanded={expanded}
            onToggle={(isExpanded) => setExpanded(isExpanded)}
            ref={navRef}
        >
            <Container fluid className=''>
                <Link href="/" className='navbar-brand text-white'>{personalInfo.name}</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation menu">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
                <Link href="#home" className={activeLink === 'home' ? 'active navbar-link nav-link' : 'navbar-link nav-link'} onClick={() => onUpdateActiveLink('home')}>Home</Link>
                <Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link nav-link' : 'navbar-link nav-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Link>
                <Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link nav-link' : 'navbar-link nav-link'} onClick={() => onUpdateActiveLink('projects')}>Progetti</Link>
                <Link href="#connect" className={activeLink === 'connect' ? 'active navbar-link nav-link' : 'navbar-link nav-link'} onClick={() => onUpdateActiveLink('connect')}>Contatti</Link>
            </Nav>
            <span className="navbar-text">
                <SocialIcons githubColor={scrolled ? 'white' : 'black'} />
                <button className="vvd" onClick={() => { window.open(`mailto:${personalInfo.email}`); setExpanded(false); }} aria-label={`Send email to ${personalInfo.name}`}><span>Contattami</span></button>
            </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        </>
        )
    }
