import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/auth.context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const CreateTaskPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const [courses, setCourses] = useState([])
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        title: '', task: '', courseName: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const fetchCourses = useCallback(async () => {
        try {
            const fetched = await request('/api/courses', 'GET', null)
            setCourses(fetched)
        } catch (e) {}
    }, [request])

    useEffect( () => {
        fetchCourses()
    }, [fetchCourses])


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createTaskHandler = async () => {
        try {
            const data = await request('/api/courses/createtask', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    return (
        <Form
            style={{marginTop:"10%", width: "60%", marginLeft:"auto", marginRight:"auto"}}
        >
            <Form.Group controlId="formSelectCourse">
                <Form.Label>Курс</Form.Label>
                <Form.Control as="select"  type="text" name = "courseName" onChange={changeHandler}>
                    <option value="">Выберите из списка</option>
                    { courses.map((course) => {
                        return (
                            <option value={course.title}>{course.title}</option>
                        )
                    }) }
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicTitle">
                <Form.Label>Введите название</Form.Label>
                <Form.Control
                    type="text"
                    name = "title"
                    placeholder="Первое занятие"
                    value={form.title}
                    onChange={changeHandler}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label>Описание задания</Form.Label>
                <Form.Control
                    type="text"
                    name = "task"
                    placeholder="Описание"
                    value={form.description}
                    onChange={changeHandler}
                    as="textarea" rows={6}
                />
            </Form.Group>

            <Button
                variant="primary"
                onClick={createTaskHandler}
                disabled={loading}
            >
                Создать
            </Button>
        </Form>
    )
}