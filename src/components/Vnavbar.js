import {React , useState , useEffect} from 'react';
import {Navbar , Container , Nav} from 'react-bootstrap';
import { BsLinkedin, BsGithub, BsInstagram } from 'react-icons/bs';

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

        <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
            <Container fluid className=''>
                <Navbar.Brand href="/" className='text-white'>Carmelo La Mantia</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
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
                <div className="social-icon">
                    <a href="https://www.linkedin.com/in/carmelo-la-mantia-web-developer/"><BsLinkedin style={{ color: 'rgb(0, 119, 181)'}} /></a>
                    <a href="https://www.instagram.com/carmelo_coding?igsh=MTRmcnVudnRnNXBiZg=="><BsInstagram className='insta_color'/></a>
                    <a href="https://github.com/MeloLM"><BsGithub style={{ color: scrolled ? 'white' : 'black'}} /></a>
                </div>
                <button className="vvd" onClick={() => window.open('mailto:carmelo.la.mantia00@gmail.com')}><span>Contact Me</span></button>
            </span>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        </>
        )
    }