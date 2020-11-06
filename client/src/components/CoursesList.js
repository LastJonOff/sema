import React from 'react'
import {Link} from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const CoursesList = ({ courses}) => {

    if (!courses.length) {
        return <p className="center">Не найдено ни одного курса</p>
    }

    return (
        <>
            <Container fluid="md">
                <Row className="justify-content-md-center">
                    { courses.map((course) => {
                        return (
                            <Col md="auto">
                                <Card style={{ width: '320px', height:'400px', margin:'10px' }} key={ course._id}>
                                    <Card.Img variant="top" style={{width:'100%', height: '60%'}} src={course.imgSrc}  />
                                    <Card.Body>
                                        <Link to={`/detail/${course._id}`}>
                                            <Card.Title>{course.title}</Card.Title>
                                        </Link>
                                        <Card.Text>
                                            {course.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }) }
                </Row>
            </Container>
        </>
    )
}