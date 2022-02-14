import React, { useState ,useEffect} from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios'
import config from '../config.json'

import Lock from '../images/icons8-lock.svg';

import '../App.css'
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [isValid, setIsValid] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        setIsValid({ email: "", password: "" })
    }, [])

    const handleSubmit = () => {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            setIsValid({ email: "Invalid" })
        }
        if (password == "") {
            setIsValid({ password: "Type password" })
        }
        if (isValid.email == "" && isValid.password == "") {
            axios.post(`${config.backend_url}user/login`, { email, password })
                .then((res) => {
                    if (res.status==200) {
                        setUser({
                            id: res.data._id,
                            email: res.data.email
                        })
                        alert("SignIn Successfully")
                        history.push("/comments")
                    }
                    else{
                        alert("Wrong Credentials")
                    }
                }).catch(err => console.log(err))
        }
    }

    return (
        <div className="container" align="center">
            <div className="loginContainer">
                <h1>Sign In</h1>
                <div style={{ marginLeft: "3rem" }}>
                    <Row className="mt-5">
                        <h6 className="subtitle">Don't have an account? <a href="/signup" className="removeUnderline">Sign Up</a></h6>
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
                                <h6 className="nestSubtile floatTextRight"><a href="/forgotpassword" className="removeUnderline">Forgot your Password?</a></h6>
                            </Col>
                        </Row>
                        <Row className="mt-4">
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
        </div>
    )
}

export default Login