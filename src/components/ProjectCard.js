import { React } from 'react';
import { Col } from 'react-bootstrap';

export const ProjectCard = ({title , description , imgUrl, imgAncor}) => {
    return (
        
        <Col sm={6} md={4}>
            <a href={imgAncor} target='_blank' rel="noopener noreferrer" className='text-white' aria-label={`View project: ${title}`}>
                <div className="proj-imgbx" >
                    <img src={imgUrl} alt={title} loading="lazy"/>
                    <div className="proj-txtx">
                        <h4>{title}</h4>
                        <span>{description}</span>
                    </div>
                </div>
            </a>
        </Col>

    )
}
