import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'

export const Navbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    const contextHandler = () => {
        console.log(auth);
    }


    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                <span className="brand-logo">RoboCode</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {auth.status === "admin" && <li><NavLink to="/create">Создать</NavLink></li>}
                    <li><NavLink to="/courses">Кружки</NavLink></li>
                    <li><NavLink to="/questions">Вопросы</NavLink></li>
                    <li><NavLink to="/news">Новости</NavLink></li>
                    <li><NavLink to="/cabinet">Мой кабинет</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}