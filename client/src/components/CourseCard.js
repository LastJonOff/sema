import React from 'react'

export const CourseCard = ({ course }) => {
    return (
        <div className="card" style = {{width:'400px'}}>
            <div className="card-image " style={{width: '400px', height:'400px'}}>

                <span className="card-title" style={{fontSize: '40px'}}>{course.name}</span>
            </div>
            <div className="card-content black-text">
                <p className="card-title "style={{fontWeight: 'bold'}}>{course.date}</p>
            </div>
        </div>
    )
}