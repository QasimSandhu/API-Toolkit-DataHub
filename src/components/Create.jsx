import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/UserDetailSlice';

const Register = () => {

    // Get user data from input fields
    const [userData, setUserData] = useState({});
    const getUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    // send data creste form to api or db using Dispatch
    const dispatch = useDispatch();

    // Page Navigation
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(userData));
        navigate("/read");
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <div>
                        <h2 className="text-center">Register</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Name" name="name" onChange={getUserData} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Email" name="email" onChange={getUserData} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Age" name="age" onChange={getUserData} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label as='legend'>Gender</Form.Label>
                                <Form.Check type='radio' id='gender' name='gender' value={'Male'} label='Male' onChange={getUserData} />
                                <Form.Check type='radio' id='gender' name='gender' value={'Female'} label='Female' onChange={getUserData} />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100">Register</Button>
                        </Form>
                    </div>
                    <div>
                        <nav><p className='mt-3 '>Already have an account <Link to="/login">Login</Link></p></nav>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
