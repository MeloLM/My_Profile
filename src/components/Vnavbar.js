import {React , useState , useEffect} from 'react';
import {Navbar , Container , Nav} from 'react-bootstrap';
import { SocialIcons } from './SocialIcons';

export default function NavBar() {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled , setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll" , onScroll);

        return () => window.removeEventListener("scroll" , onScroll);
    }, []);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }


    return (
        <>

        <Navbar expand="lg" className={scrolled ? "scrolled" : ""} role="navigation" aria-label="Main navigation">
            <Container fluid className=''>
                <Navbar.Brand href="/" className='text-white'>Carmelo La Mantia</Navbar.Brand>
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
                <button className="vvd" onClick={() => window.open('mailto:carmelo.la.mantia00@gmail.com')} aria-label="Send email to Carmelo"><span>Contact Me</span></button>
            </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        </>
        )
    }