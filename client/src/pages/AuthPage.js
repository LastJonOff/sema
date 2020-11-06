import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/auth.context'
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import CSSTransition from "react-transition-group/CSSTransition";
import Container from "react-bootstrap/Container";


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', status: 'student',
    })

    const [showForm, setShowForm] = useState(false);
    const [showImage, setShowImage] = useState(true);

    const handleClose = () => setShowImage(false);
    const handleShow = () => {
        handleClose();
        setShowForm(true);
    }

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

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.status)
        } catch (e) {}
    }

    return (
        <>
            {showImage &&
                <>

                    <Row className="justify-content-center">
                        <Image src="https://m-files-new.cdnvideo.ru/lpfile/c/7/1/c71291c0a32a29505b850a7b36e8763f.png" fluid></Image>
                    </Row>
                    <Row className="justify-content-center">
                        <Button onClick={handleShow} className="btn-primary">
                            Продолжить
                        </Button>
                    </Row>
                </>
            }
            <CSSTransition
                in={showForm}
                timeout={400}
                classNames="myForm"
            >
                <Form className="myForm-enter"
                      style={{marginTop:"20%", width: "60%", marginLeft:"auto", marginRight:"auto"}}
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name = "email"
                            placeholder="Введите email"
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
                            onChange={changeHandler}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Войти
                    </Button>
                </Form>
            </CSSTransition>
        </>
    )
}