import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from "axios";
import config from '../config.json'

import Lock from '../images/icons8-lock.svg';

import '../App.css'
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [secret, setSecret] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pass, setPass] = useState("")
    const history = useHistory();
    const [isValid, setIsValid] = useState({
        email: "",
        secret: ""
    })
    
    useEffect(()=>{
        setIsValid({email:"",secret:""})
    },[])


    const handleSubmit = () => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setIsValid({ email: "Invalid" })
        }
        if(secret == ""){
            setIsValid({secret:"Type secret"})
        }
        if (isValid.email == "" && isValid.secret == "") {
            axios.post(`${config.backend_url}user/forgotpassword`, { email, secret })
                .then((res) => {
                    if (res.status == 200) {
                        setIsModalOpen(true)
                        setPass(res.data.password)
                    }
                    else{
                        alert("Wrong credentials")
                    }
                }).catch(err => console.log(err))
        }
    }


    return (
        <div className="container" align="center">
            <div className="loginContainer">
                <h2 style={{ textAlign: "center", marginLeft: "5rem" }}>Forgot Password</h2>
                <div style={{ marginLeft: "3rem", marginTop: "5rem" }}>
                    <div style={{ marginLeft: "2rem" }}>
                        <Row className="mt-4">
                            <Col md={12}>
                                <Form.Label htmlFor="inputPassword5" className="floatTextLeft">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </Col>
                            {isValid.email !== "" ?(
                                    <Form.Text className="floatTextLeft" style={{color:"red",textAlign:"start",fontSize:"medium"}}>
                                            {isValid.email}
                                    </Form.Text>
                            ):""}
                        </Row>
                        <Row className="mt-4">
                            <Col md={12}>
                                <Form.Label htmlFor="inputPassword5" className="floatTextLeft">Secret</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={secret}
                                    onChange={(e) => setSecret(e.currentTarget.value)}
                                />
                            </Col>
                            {isValid.secret !== "" ?(
                                    <Form.Text className="floatTextLeft" style={{color:"red",textAlign:"start",fontSize:"medium"}}>
                                            {isValid.secret}
                                    </Form.Text>
                            ):""}
                        </Row>
                        <Row className="mt-4">
                            {/* <Col md={12}>
                                <h6 className="nestSubtile floatTextRight"><a href="#" className="removeUnderline">Forgot your Password?</a></h6>
                            </Col> */}
                        </Row>
                        <Row className="mt-5">
                            <Col md={12}>
                                <Button className="fullWidth" onClick={handleSubmit}>
                                    <img src={Lock} width="20px" className="floatTextLeft" />
                                    Sign In
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {isModalOpen ? (
                <Modal centered show={isModalOpen}>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <h4>Your Password is : {pass}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { setIsModalOpen(false); history.push('/') }}>Close</Button>
                    </Modal.Footer>
                </Modal>
            ) : ""}
        </div>
    )
}

export default ForgotPassword;