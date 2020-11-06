import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/auth.context'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

export const CreatePage = () => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        title: '', description: '', imgSrc: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const createCourseHandler = async () => {
        try {
            const data = await request('/api/courses/create', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    return (
        <Form
            style={{marginTop:"10%", width: "60%", marginLeft:"auto", marginRight:"auto"}}
        >
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Название курса</Form.Label>
                <Form.Control
                    type="text"
                    name = "title"
                    placeholder="Введите название курса"
                    value={form.title}
                    onChange={changeHandler}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
                <Form.Label>Введите описание</Form.Label>
                <Form.Control
                    type="text"
                    name = "description"
                    placeholder="Описание"
                    value={form.description}
                    onChange={changeHandler}
                    as="textarea" rows={6}
                />
            </Form.Group>

            <Form.Group controlId="formBasicImage">
                <Form.Label>Введите ссылку на картинку</Form.Label>
                <Form.Control
                    type="text"
                    name = "imgSrc"
                    placeholder="google.com/image/id"
                    value={form.imgSrc}
                    onChange={changeHandler}
                />
            </Form.Group>

            <Button
                variant="primary"
                onClick={createCourseHandler}
                disabled={loading}
            >
                Создать
            </Button>
        </Form>
    )
}