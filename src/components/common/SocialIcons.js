/**
 * 🌐 SocialIcons Component - Common
 * Icone social media riutilizzabili
 * 
 * @module components/common/SocialIcons
 */

import PropTypes from 'prop-types';
import { BsLinkedin, BsGithub, BsInstagram } from 'react-icons/bs';
import { personalInfo } from '../../data/profileData';

/**
 * SocialIcons Component
 * @param {Object} props - Component props
 * @param {string} [props.githubColor='white'] - Colore icona GitHub
 * @returns {JSX.Element} Container icone social
 */
export const SocialIcons = ({ githubColor = 'white' }) => {
    return (
        <div className="social-icon">
            <a 
                href={personalInfo.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
            >
                <BsLinkedin style={{ color: 'rgb(0, 119, 181)'}} />
            </a>
            <a 
                href={personalInfo.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
            >
                <BsInstagram className='insta_color'/>
            </a>
            <a 
                href={personalInfo.github}
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
            >
                <BsGithub style={{ color: githubColor }} />
            </a>
        </div>
    );
};

SocialIcons.propTypes = {
    githubColor: PropTypes.string,
};

SocialIcons.defaultProps = {
    githubColor: 'white',
};
