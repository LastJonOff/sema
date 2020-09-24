import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/auth.context";

export const CreateTaskPage = () => {

    const message = useMessage();
    const auth = useContext(AuthContext);
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
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Создать задание</span>
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
                                <label htmlFor="title">Название</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите описание"
                                    id="task"
                                    type="text"
                                    name="task"
                                    className="yellow-input"
                                    value={form.description}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="task">Описание задания</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите название курса"
                                    id="courseName"
                                    type="text"
                                    name="courseName"
                                    className="yellow-input"
                                    value={form.courseName}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="courseName">Имя курса</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={createTaskHandler}
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