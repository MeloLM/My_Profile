/**
 * 🌐 SocialIcons Component - Common
 * Icone social media riutilizzabili
 */

import { BsLinkedin, BsGithub, BsInstagram } from 'react-icons/bs';

export const SocialIcons = ({ githubColor = 'white' }) => {
    return (
        <div className="social-icon">
            <a 
                href="https://www.linkedin.com/in/carmelo-la-mantia-web-developer/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
            >
                <BsLinkedin style={{ color: 'rgb(0, 119, 181)'}} />
            </a>
            <a 
                href="https://www.instagram.com/carmelo_coding" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
            >
                <BsInstagram className='insta_color'/>
            </a>
            <a 
                href="https://github.com/MeloLM" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
            >
                <BsGithub style={{ color: githubColor }} />
            </a>
        </div>
    );
};
