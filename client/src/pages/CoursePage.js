import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {Loader} from '../components/Loader'
import {CoursesList} from '../components/CoursesList'
import {useHistory} from "react-router-dom";

export const CoursePage = () => {
    const history = useHistory()
    const [courses, setCourses] = useState([])
    const {loading, request} = useHttp()

    const fetchCourses = useCallback(async () => {
        try {
            const fetched = await request('/api/courses', 'GET', null)
            setCourses(fetched)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <CoursesList courses={courses} />}
        </>
    )
}