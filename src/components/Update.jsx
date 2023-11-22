import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { updateUSer } from '../features/UserDetailSlice';

const Update = () => {

    // Navigate page
    const navigate = useNavigate();
    // Get the userId param from the URL.
    const { userId } = useParams();

    // Get data from Redux store
    const { userData } = useSelector((state) => state.app);

    // Updating user Data
    const [updateData, setUpdateData] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });

    useEffect(() => {

        if (userId && userData.length > 0) {

            // Find single user
            const singleUser = userData.find((element) => element.id === userId.toString());

            // Check if singleUser is found and set the state
            if (singleUser) {
                setUpdateData(singleUser);
            } else {
                console.log(`User with id ${userId} not found`);
            }
        }
    }, [userId, userData]);

    // Get updated value
    const getUpdatedData = ((e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    });

    // Update userData
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUSer(updateData));
        navigate('/read')
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <div>
                        <h2 className="text-center">Update User Data</h2>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" onChange={getUpdatedData} value={updateData.name} placeholder="Name" name="name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" onChange={getUpdatedData} value={updateData.email} placeholder="Email" name="email" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" onChange={getUpdatedData} value={updateData.age} placeholder="Age" name="age" />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label as='legend'>Gender</Form.Label>
                                <Form.Check type='radio' id='gender' name='gender' checked={updateData.gender === 'Male'} onChange={getUpdatedData} value={'Male'} label='Male' />
                                <Form.Check type='radio' id='gender' name='gender' checked={updateData.gender === 'Female'} onChange={getUpdatedData} value={'Female'} label='Female' />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100">Update</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Update;
