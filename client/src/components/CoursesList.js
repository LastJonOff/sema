import React, {useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Link} from 'react-router-dom'

export const CoursesList = ({ courses, handle, sort }) => {

    if (!courses.length) {
        return <p className="center">Не найдено ни одного курса</p>
    }

    return (

        <>
            <div>
                <button
                    className="btn yellow darken-4"
                    style={{marginRight: 10}}
                    onClick={(e) => sort(courses)}
                >
                    Sort by name
                </button>
            </div>
            { courses.map((course) => {
                return (
                    <div className="card center-align" style = {{width:'400px', display: 'inline-block', margin: '10px'}}>
                        <Link to={`/detail/${course._id}`} key={course._id}>
                            <div className="card-image " style={{width: '400px', height:'400px'}}>

                                <span className="card-title" style={{fontSize: '40px'}}>{course.name}</span>
                            </div>
                        </Link>
                        <div className="card-content black-text">
                            <span className="card-title "style={{fontWeight: 'bold'}}>{course.date}</span>
                            <button
                                className="btn-floating halfway-fab waves-effect waves-light red"
                                style={{color: 'white', marginBottom: '15%'}}
                                onClick={(e) => handle(course._id)}
                            >
                                x
                            </button>
                        </div>
                    </div>
                )
            }) }
        </>
    )
}