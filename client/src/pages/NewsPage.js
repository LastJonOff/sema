import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'
import {Loader} from '../components/Loader'
import {hexToRgb} from "@material-ui/core";
import {NewsList} from "../components/NewsList";

export const NewsPage = () => {

    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [news, setNews] = useState([])

    const getNews = useCallback(async () => {
        try {
            const fetched = await request(`/api/news/`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setNews(fetched)

        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        window.M.updateTextFields()
        getNews()
    }, [getNews])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <NewsList news={news} />}
        </>
    )
}