import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'
import M from 'materialize-css/dist/js/materialize.min';
import {Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


export const MyNavbar = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    useEffect(() => {
        let dropdown = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdown, {inDuration: 300, outDuration: 225});
    })

    return (
        <>
            <Navbar collapseOnSelect bg="primary" expand="lg" variant="dark">
                <Navbar.Brand href="#home">RoboLearn</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto ">
                    {auth.status === "admin" &&
                    <NavDropdown title="Создать" id="basic-nav-dropdown" >
                        <NavDropdown.Item href="/register">Ученик</NavDropdown.Item>
                        <NavDropdown.Item href="/create">Курс</NavDropdown.Item>
                        <NavDropdown.Item href="/createtask">Задание</NavDropdown.Item>
                        <NavDropdown.Item href="/createnews">Новость</NavDropdown.Item>
                    </NavDropdown>
                    }
                    <Nav.Link href="/courses">Курсы</Nav.Link>
                    <Nav.Link href="/questions">Вопросы</Nav.Link>
                    <Nav.Link href="/news">Новости</Nav.Link>
                    <Nav.Link href="/cabinet">Мой кабинет</Nav.Link>
                    <Nav.Link href="/" onClick={logoutHandler}>Выйти</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}