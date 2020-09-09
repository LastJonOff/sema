import React, {useState} from 'react'
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";

export const EditForm = ({ course, handleName, courseId }) => {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [courseName, setCourseName] = useState('')
    const [imgSrc, setImgSrc] = useState('')
    const [date, setDate] = useState('')
    const {request} = useHttp()

    const createCourseHandler = async () => {
        try {
            const data = await request('/api/courses/create', 'POST', {title: title, description: description, date: date, imgSrc: imgSrc})
            history.push(`/courses`)
        } catch (e) {}
    }
    const createTaskHandler = async () => {
        try {
            const data = await request('/api/courses/createtask', 'POST', {title: title, task: description, courseName: courseName })
            console.log(data)
            history.push(`/courses`)
        } catch (e) {}
    }

    return (
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Название"
                        id="title"
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <label htmlFor="title">Введите название</label>

                </div>
                <div className="input-field">
                    <input
                        placeholder="Описание"
                        id="description"
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <label htmlFor="description">Введите описание</label>

                </div>

                { handleName === "create" && <div className="input-field">
                    <input
                        placeholder="Ссылка на изображение"
                        id="imgSrc"
                        type="text"
                        value={imgSrc}
                        onChange={e => setImgSrc(e.target.value)}
                    />
                    <label htmlFor="imgSrc">Вставьте ссылку на картинку</label>

                </div>}
                { handleName === "createtask" &&
                <div className="input-field">
                    <input
                        placeholder="Название курса"
                        id="courseName"
                        type="text"
                        value={courseName}
                        onChange={e => setCourseName(e.target.value)}
                    />
                    <label htmlFor="description">Введите название курса</label>

                </div>}

                <div>
                    <button
                        className="btn yellow darken-4"
                        style={{marginRight: 10}}
                        onClick={handleName === "create"? createCourseHandler : createTaskHandler}
                    >
                        Создать
                    </button>
                </div>
            </div>
    )
}