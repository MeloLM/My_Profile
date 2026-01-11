/**
 * 🎴 SkillItem Component - Card
 * Card singola skill con progress bar
 * Come da PSEUDOCODE.md: SkillItem({ name, level, icon })
 */

import React from 'react';
import './SkillItem.css';

/**
 * ProgressBar Component - Barra di progresso della skill
 */
const ProgressBar = ({ value = 0, showLabel = true }) => {
    return (
        <div className="skill-progress-container">
            <div 
                className="skill-progress-bar" 
                style={{ width: `${value}%` }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin="0"
                aria-valuemax="100"
            />
            {showLabel && <span className="skill-percent">{value}%</span>}
        </div>
    );
};

const SkillItem = ({ 
    name, 
    level, 
    icon, 
    img,  // Alias per icon (per compatibilità con skillsData)
    category,
    showProgress = true,
    size = 'medium' 
}) => {
    const iconSrc = icon || img;
    
    const sizeClasses = {
        small: 'skill-item-small',
        medium: 'skill-item-medium',
        large: 'skill-item-large',
    };

    return (
        <div className={`skill-item ${sizeClasses[size]}`}>
            {iconSrc && (
                <div className="skill-icon">
                    <img src={iconSrc} alt={`${name} icon`} loading="lazy" />
                </div>
            )}
            <div className="skill-info">
                <span className="skill-name">{name}</span>
                {category && <span className="skill-category">{category}</span>}
                {showProgress && <ProgressBar value={level} />}
            </div>
        </div>
    );
};

export default SkillItem;
export { SkillItem, ProgressBar };
