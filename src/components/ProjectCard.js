import { React } from 'react';
import { Col } from 'react-bootstrap';

export const ProjectCard = ({title , description , imgUrl, imgAncor}) => {
    return (
        
        <Col sm={6} md={4}>
            <a href={imgAncor} target='_blank'className='text-white'>
                <div className="proj-imgbx" >
                    <img src={imgUrl} alt=""/>
                    <div className="proj-txtx">
                        <h4>{title}</h4>
                        <span>{description}</span>
                    </div>
                </div>
            </a>
        </Col>

    )
}
