import React, { useState ,useEffect} from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import config from '../config.json';

import Lock from '../images/icons8-lock.svg';

import '../App.css'
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secret, setSecret] = useState("")
    const [isValid, setIsValid] = useState({
        email: "",
        password: "",
        secret:""
    })
    const history=useHistory();

    useEffect(() => {
        setIsValid({ email: "", password: "" ,secret:""})
    }, [])

    const handleSubmit = () => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setIsValid({ email: "Invalid" })
        }
        if (password ==="") {
            setIsValid({ password: "Type password" })
        }
        if(secret === ""){
            setIsValid({ secret: "Type secret" })
        }
        if (isValid.email === "" && isValid.password === "" && isValid.secret === "") {
            axios.post(`${config.backend_url}user/signup`, { email, password, secret })
                .then((res) => {
                    if (res.status === 200 ) {
                        alert("SignUp Successfully")
                        history.push('/')
                    }
                    else{
                        alert("Wrong Inputs")
                    }
                }).catch(err => console.log(err))
        }
    }

    return (
        <div className="container" align="center">
            <div className="loginContainer">
                <h1 style={{ textAlign: "center", marginLeft: "2rem" }}>Sign Up</h1>
                <div style={{ marginLeft: "3rem" }}>
                    <Row className="mt-5">
                        <h6 className="subtitle">Already have an account? <a href="/login" className="removeUnderline">Sign in</a></h6>
                    </Row>
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
                                <Form.Label htmlFor="inputPassword5" className="floatTextLeft">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                />
                            </Col>
                            {isValid.password !== "" ?(
                                    <Form.Text className="floatTextLeft" style={{color:"red",textAlign:"start",fontSize:"medium"}}>
                                            {isValid.password}
                                    </Form.Text>
                            ):""}
                        </Row>
                        <Row className="mt-4">
                            <Col md={12}>
                                <Form.Label htmlFor="inputPassword5" className="floatTextLeft">Secret</Form.Label>
                                <Form.Control
                                    type="text"
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
                            <Col md={12}>
                                <Button className="fullWidth" onClick={handleSubmit}>
                                    <img src={Lock} width="20px" className="floatTextLeft" />
                                    Sign Up
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-1">
                            <Col md={11}>
                                <Form.Text muted className="noticeText">
                                    By clicking "Sign Up" button,you are creating an account and you agree to the Terms of Use
                                </Form.Text>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;