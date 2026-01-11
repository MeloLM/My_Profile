/**
 * 🎴 TimelineItem Component - Card
 * Card singolo evento timeline
 * Come da PSEUDOCODE.md: TimelineItem({ date, title, description })
 */

import React from 'react';
import './TimelineItem.css';

const TimelineItem = ({ 
    year,
    date,
    title, 
    subtitle,
    description,
    icon,
    type = 'default' // 'education' | 'work' | 'career' | 'default'
}) => {
    // Supporto sia per year che per date
    const displayDate = year || date;
    
    const typeClasses = {
        education: 'timeline-item-education',
        work: 'timeline-item-work',
        career: 'timeline-item-career',
        default: 'timeline-item-default',
    };

    return (
        <div className={`timeline-item ${typeClasses[type] || typeClasses.default}`}>
            <div className="timeline-content">
                {icon && <span className="timeline-icon">{icon}</span>}
                <time className="timeline-year" dateTime={displayDate}>{displayDate}</time>
                <h4 className="timeline-title">{title}</h4>
                {subtitle && <span className="timeline-location">{subtitle}</span>}
                <p className="timeline-description">{description}</p>
            </div>
        </div>
    );
};

export default TimelineItem;
export { TimelineItem };
