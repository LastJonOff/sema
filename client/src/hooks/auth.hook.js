import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [status, setStatus] = useState(null)

    const login = useCallback((jwtToken, id, status) => {
        setToken(jwtToken)
        setUserId(id)
        setStatus(status)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, status: status
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setStatus(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.status)
        }
        setReady(true)
    }, [login])


    return { login, logout, token, userId, status, ready }
}