import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from "../context/auth.context";

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
        <div className="row">
            <div className="col s12 l6 offset-l3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Создать новость</span>
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
                                <textarea
                                    placeholder="Введите описание"
                                    id="description"
                                    type="text"
                                    name="description"
                                    className="yellow-input"
                                    value={form.description}
                                    style={{height: 200}}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="description">Содержание</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Введите краткое описание"
                                    id="shortDescription"
                                    type="text"
                                    name="shortDescription"
                                    className="yellow-input"
                                    value={form.shortDescription}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="shortDescription">Краткое содержание</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={createNewsHandler}
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