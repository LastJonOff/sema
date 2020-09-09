import React from 'react'
import {Link} from "react-router-dom";

export const CourseCard = ({ course }) => {
    return (
        <div className="card center-align" style = {{width:'400px', display: 'inline-block', margin: '10px'}}  key={course._id}>
            <Link to={`/detail/${course._id}`}>
                <div className="card-image " style={{width: '400px', height:'400px'}}>
                    <img src={course.imgSrc} />
                    <span className="card-title" style={{fontSize: '40px'}}>{course.title}</span>
                </div>
            </Link>
            <div className="card-content black-text">
                <p className="card-title ">{course.description}</p>
            </div>
        </div>
    )
}