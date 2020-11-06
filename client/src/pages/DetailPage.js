import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'
import {Loader} from '../components/Loader'

export const DetailPage = () => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [course, setCourse] = useState(null)
    const [tasks, setTasks] = useState([])
    const courseId = useParams().id

    const getCourse = useCallback(async () => {
        try {
            const fetched = await request(`/api/courses/${courseId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            const newTasks = fetched.tasks

            let fetchedTask = []

            for (const taskId of newTasks) {

                fetchedTask.push( await request(`/api/tasks/${taskId}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                }))

            }
            console.log(fetchedTask, " fetched")

            setTasks(fetchedTask)

            setCourse(fetched)

        } catch (e) {}
    }, [token, courseId, request])

    useEffect(() => {
        getCourse()
    }, [getCourse])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && course &&
            <div>
                <img src={course.imgSrc} alt="" className="center-block" style={{marginTop: 10, marginBottom: 20, width:600, height:400}}/>

                <div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                </div>

                <ul className="collection">
                    { tasks.map((task) => {
                        return (
                            <li className="collection-item" key={task._id}>
                                <h3 >{task.title}</h3>
                                <p dangerouslySetInnerHTML={{__html: task.task}}></p>
                            </li>
                        )
                    }) }
                </ul>
            </div>
            }
        </>
    )
}