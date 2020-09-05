import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";

export const MyPage = () => {

    const auth = useContext(AuthContext)

    const [info, setInfo] = useState({
        email: '', password: '', status: '',
    })

    const {loading, request} = useHttp()

    const fetchInfo = useCallback(async () => {
        try {
            const fetched = await request('/api/user', 'POST', {id: auth.userId})
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
        <div className="row">
            {auth.userId && <ul>
                <li>is email - {info.email}</li>
                <li>is pass - {info.password}</li>
            </ul>}
        </div>
    )
}