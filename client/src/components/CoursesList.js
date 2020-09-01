import React, {useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Link} from 'react-router-dom'

export const CoursesList = ({ courses}) => {

    if (!courses.length) {
        return <p className="center">Не найдено ни одного курса</p>
    }

    return (
        <>
            { courses.map((course) => {
                return (
                    <div className="card center-align" style = {{width:'400px', display: 'inline-block', margin: '10px'}}  key={course._id}>
                        <Link to={`/detail/${course._id}`}>
                            <div className="card-image " style={{width: '400px', height:'400px'}}>
                                <img src={course.imgSrc} />
                                <span className="card-title" style={{fontSize: '40px'}}>{course.title}</span>
                            </div>
                        </Link>
                        <div className="card-content black-text">
                            <span className="card-title "style={{fontWeight: 'bold'}}>{course.date}</span>
                        </div>
                    </div>
                )
            }) }
        </>
    )
}