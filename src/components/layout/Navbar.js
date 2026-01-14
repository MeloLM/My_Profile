/**
 * 🧭 Navbar Component - Layout
 * Barra di navigazione con effetto scroll
 * REFACTORED: Usa useScroll hook come da PSEUDOCODE.md
 */

import { useState, useCallback, useEffect } from 'react';
import { Navbar , Container , Nav } from 'react-bootstrap';
import { SocialIcons } from '../common/SocialIcons';
import { useTheme } from '../../context';
import { useScroll } from '../../hooks';
import { Sun, Moon } from 'react-bootstrap-icons';
import { personalInfo } from '../../data/profileData';

export default function NavBar() {
    const [activeLink, setActiveLink] = useState('home');
    const [expanded, setExpanded] = useState(false);
    // REFACTORED: Uso dell'hook useScroll invece di useState/useEffect manuale
    const { scrolled } = useScroll(50);
    const { isDark, toggleTheme } = useTheme();

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
        >
            <Container fluid className=''>
                <Navbar.Brand href="/" className='text-white'>{personalInfo.name}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation menu">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
                <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                <Nav.Link href="#connect" className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('connect')}>Contact</Nav.Link>
            </Nav>
            <span className="navbar-text">
                <SocialIcons githubColor={scrolled ? 'white' : 'black'} />
                <button 
                    className="theme-toggle-btn" 
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    title={isDark ? 'Light Mode' : 'Dark Mode'}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="vvd" onClick={() => { window.open(`mailto:${personalInfo.email}`); setExpanded(false); }} aria-label={`Send email to ${personalInfo.name}`}><span>Contact Me</span></button>
            </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        </>
        )
    }
