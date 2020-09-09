import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'
import {Loader} from '../components/Loader'
import {CourseCard} from '../components/CourseCard'

export const DetailPage = () => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [course, setCourse] = useState(null)
    const courseId = useParams().id

    const getCourse = useCallback(async () => {
        try {
            console.log("courseId", courseId)
            const fetched = await request(`/api/courses/${courseId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
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
            { !loading && course && <CourseCard course={course} /> }
        </>
    )
}