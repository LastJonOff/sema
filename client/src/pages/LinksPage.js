import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/auth.context'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    const pressHandler = async (removeId) => {
        try {
            const data = await request('/api/link/remove', 'DELETE', {id: removeId}, {
                Authorization: `Bearer ${token}`
            })
            setLinks( links.filter(link => {
                return link._id !== removeId
            }))
        } catch (e) {}
    }

    return (
        <>
            {!loading && <LinksList links={links} handle = {pressHandler}/>}
        </>
    )
}