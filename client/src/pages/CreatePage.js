import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/auth.context'

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
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Новый курс</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите название"
                                    id="title"
                                    type="text"
                                    name="title"
                                    className="yellow-input"
                                    value={form.title}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="title">Название курса</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите описание"
                                    id="description"
                                    type="text"
                                    name="description"
                                    className="yellow-input"
                                    value={form.description}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="description">Описание курса</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Вставьте ссылку на изображение"
                                    id="courseName"
                                    type="text"
                                    name="imgSrc"
                                    className="yellow-input"
                                    value={form.imgSrc}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="imgSrc">Изображение</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={createCourseHandler}
                            disabled={loading}
                        >
                            Создать
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}