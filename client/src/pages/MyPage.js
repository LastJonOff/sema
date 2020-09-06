import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {CoursesList} from "../components/CoursesList";
import {useHistory} from "react-router-dom";

export const MyPage = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    const [info, setInfo] = useState({
        email: '', password: '', status: '', name: '', surname: ''
    })

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const {loading, request} = useHttp()

    const fetchInfo = useCallback(async () => {
        try {
            const fetched = await request('/api/user', 'POST', {id: auth.userId})
            console.log("user", fetched)
            setInfo(fetched);
        } catch (e) {}
    }, [request])

    const updateHandler = async () => {
        try {
            const data = await request('/api/user/update', 'POST', {name: name, surname: surname, id: auth.userId})
            console.log("data", data)
            setName(data.name)
            setSurname(data.surname)
            history.push(`/cabinet`)
        } catch (e) {}
    }

    useEffect(() => {
        window.M.updateTextFields()
        fetchInfo()
    }, [fetchInfo])

    if (loading) {
        return <Loader/>
    }

    if (!info.name){
        return (
            <div className="row">
                <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                    <div className="input-field">
                        <input
                            placeholder="Имя"
                            id="name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="title">Введите имя</label>

                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Фамилия"
                            id="surname"
                            type="text"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                        <label htmlFor="description">Введите фамилию</label>

                    </div>

                    <div>
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={updateHandler}
                        >
                            Изменить
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {!loading &&
                <div className="row" style={{paddingTop:20}}>
                    <div className="col s3">
                        <img src="https://avatars.mds.yandex.net/get-pdb/903199/99ae6658-6578-40f4-af41-89e097c247bc/s1200" alt="" className="circle responsive-img"/>
                    </div>
                    <div className="col s8 offset-s1">
                        <h2 style={{marginBottom: 0}}>{info.name}</h2>
                        <h2 style={{margin: 0}}>{info.surname}</h2>
                    </div>
                </div>
            }
        </>
    )
}