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

    useEffect(() => {
        window.M.updateTextFields()
        fetchInfo()
    }, [fetchInfo])

    if (loading) {
        return <Loader/>
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