import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/auth.context'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const RegisterPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', status: 'student', name: '', surname: ''
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

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            const emailResult = await request('/api/auth/sendmail', 'POST', {...form})

            console.log(emailResult)

            message(data.message)
            message(emailResult.message)

        } catch (e) {}
    }

    return (
        <Form
              style={{marginTop:"10%", width: "60%", marginLeft:"auto", marginRight:"auto"}}
        >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name = "email"
                    placeholder="Введите email"
                    value={form.email}
                    onChange={changeHandler}
                />
                <Form.Text className="text-muted">
                    Данные для входа можно получить у преподавателя
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    name = "password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={changeHandler}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            type="text"
                            name = "name"
                            placeholder="Иван"
                            value={form.name}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            type="text"
                            name = "surname"
                            placeholder="Иванов"
                            value={form.surname}
                            onChange={changeHandler}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="formSelect">
                <Form.Label>Статус</Form.Label>
                <Form.Control as="select" name = "status" onChange={changeHandler}>
                    <option value="student">ученик</option>
                    <option value="admin">администратор</option>
                </Form.Control>
            </Form.Group>

            <Button
                variant="primary"
                onClick={registerHandler}
                disabled={loading}
            >
                Регистрация
            </Button>
        </Form>
    )
}