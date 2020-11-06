import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/auth.context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const CreateNewsPage = () => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        title: '', shortDescription: '', description: ''
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

    const createNewsHandler = async () => {
        try {
            const data = await request('/api/news/create', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    return (
        <Form
            style={{marginTop:"10%", width: "60%", marginLeft:"auto", marginRight:"auto"}}
        >
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control
                    type="text"
                    name = "title"
                    placeholder="Введите заголовок"
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

            <Form.Group controlId="formBasicShortDesc">
                <Form.Label>Введите краткое описание</Form.Label>
                <Form.Control
                    type="text"
                    name = "shortDescription"
                    placeholder="Описа..."
                    value={form.shortDescription}
                    onChange={changeHandler}
                    as="textarea" rows={3}
                />
            </Form.Group>

            <Button
                variant="primary"
                onClick={createNewsHandler}
                disabled={loading}
            >
                Создать
            </Button>
        </Form>
    )
}