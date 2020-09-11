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
                    <div className="card" style = {{width:'400px', display: 'inline-block', margin: '10px'}} key={course._id}>
                        <div className="card-image">
                            <Link to={`/detail/${course._id}`}>
                                <img src={course.imgSrc} style={{width: '400px', height:'400px'}}/>
                            </Link>
                            <span className="card-title">{course.title}</span>
                        </div>
                        <div className="card-content">
                            <p>{course.description}</p>
                        </div>
                    </div>
                
                )
            }) }
        </>
    )
}