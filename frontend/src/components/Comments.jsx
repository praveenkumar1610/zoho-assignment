import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import config from '../config.json'
import { UserContext } from "./UserContext";

const Comments = () => {
    const [commentsList, setCommentsList] = useState([])
    const [commentsAdd, setCommentsAdd] = useState("")
    const [isAdded, setIsAdded] = useState(false)
    const { email, id } = useContext(UserContext);
    const [isFiltered, setIsFiltered ]= useState(false)

    useEffect(() => {
        console.log("id",id)
        setIsAdded(false)
        axios.get(`${config['backend_url']}comment/`).then((res) => {
            if (res.status == 200) {
                console.log(res.data)
                setCommentsList(res.data)
            }
        }).catch(err => console.log(err))
    }, [isAdded,isFiltered])

    const handleSubmit = () => {
        axios.post(`${config['backend_url']}comment`, { comment: commentsAdd, comment_by: id }).then((res) => {
            if (res.status == 200) {
                setIsAdded(true)
            }
        })
    }

    return (
        <div className="commentsContainer">
            <div>
                <h6>What would you like to share with world?</h6>
                <Row>
                    <Col md={5}>
                        <Form.Control
                            className="commentsTextArea"
                            as="textarea"
                            value={commentsAdd}
                            onChange={(e) => setCommentsAdd(e.currentTarget.value)}
                        />
                    </Col>
                    <Col className="offset-1 d-flex align-items-center" md={2}  >
                        <Button variant="outline-dark" className="buttonComments" onClick={handleSubmit}>Submit</Button>
                    </Col>
                </Row>
            </div>
            <div className="mt-4 lister" style={{ width: "56rem" }} >
                <Row>
                    <Col md={9}>
                        <h4>Comments</h4>
                    </Col>
                    <Col md={1} style={{ marginLeft: "1rem" }}>
                        <Button variant="outline-dark" className="buttonComments" onClick={()=>setIsFiltered(!isFiltered)}>{isFiltered ? "UnFilter" : "Filter"}</Button>
                    </Col>
                </Row>
                <div>
                    {isFiltered ? (
                        commentsList.filter(item => item.comment_by._id === id).map(item => {
                            return (
                                <Row className="mt-4">
                                    <div className="d-flex">
                                        <Col md={3}>
                                            <h6>{item.comment_by.email}</h6>
                                        </Col>
                                        <Col md={5}>
                                            <div className="comments d-flex align-items-center">
                                                <h6>{item.comment}</h6>
                                            </div>
                                        </Col>
                                    </div>
                                </Row>
                            )
                        })
                    ) : (
                        commentsList.map(item => {
                            return (
                                <Row className="mt-4">
                                    <div className="d-flex">
                                        <Col md={3}>
                                            <h6>{item.comment_by.email}</h6>
                                        </Col>
                                        <Col md={5}>
                                            <div className="comments d-flex align-items-center">
                                                <h6>{item.comment}</h6>
                                            </div>
                                        </Col>
                                    </div>
                                </Row>
                            )
                        })
                    )}

                    {/* <Row className="mt-4">
                        <div className="d-flex">
                            <Col md={3}>
                                <h6>praveenkumar@gmail.com</h6>
                            </Col>
                            <Col md={5}>
                                <div className="comments d-flex align-items-center">
                                    <h6>This is random comment</h6>
                                </div>
                            </Col>
                        </div>
                    </Row> */}
                </div>
            </div>
        </div>
    )
}

export default Comments;