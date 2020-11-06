import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {useHistory} from "react-router-dom";
import M from 'materialize-css/dist/js/materialize.min';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export const MyPage = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()

    const [show, setShow] = useState(false);

    const [info, setInfo] = useState({
        email: '', password: '', status: '', name: '', surname: ''
    })

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const {loading, request} = useHttp()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        let modal = document.querySelectorAll('.modal');
        M.Modal.init(modal, {inDuration: 300, outDuration: 225});
    }, [fetchInfo])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading &&
            <Row className="pt-3">
                <Col xs={12} md={12} lg={3}>
                    <Image
                        src="https://avatars.mds.yandex.net/get-pdb/903199/99ae6658-6578-40f4-af41-89e097c247bc/s1200"
                        alt=""
                        roundedCircle
                        fluid
                        style={{height:200, width:200}}
                    />
                </Col>
                <Col xs={12} md={12} lg={9}>
                    <h2 style={{marginBottom: 0}}>{info.name}</h2>
                    <h2 style={{margin: 0}}>{info.surname}</h2>
                </Col>
                <Button
                    onClick={handleShow}
                >
                    show
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить данные</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            }
        </>
    )
}