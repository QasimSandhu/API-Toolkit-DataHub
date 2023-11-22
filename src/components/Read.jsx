// import React, { useEffect, useState } from 'react';
import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setEditUserModal, editUser, setGetUserModalId } from '../features/UserDetailSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';

const Read = () => {

    // Sent userData in redux store
    const dispatch = useDispatch();

    // Get data from Redux store
    const { userData, loading, searchData } = useSelector((state) => state.app);

    useEffect(() => {
        return () => {
            dispatch(editUser());
        };
    }, [dispatch]);

    // loading
    if (loading) {
        return <h2 className='text-center'>Loading</h2>;
    }

    const handleViewClick = (element) => {
        dispatch(setEditUserModal(true));
        dispatch(setGetUserModalId(element.id));
    }

    return (
        <Container>
            <h1 className='text-center'>View All User Record</h1>
            <Table striped bordered hover className='mt-5'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userData && userData.filter((element) => {
                            if (!searchData || searchData.length === 0) {
                                return element;
                            } else {
                                return element.name.toLowerCase().includes(searchData.toLowerCase());
                            }
                        })
                            .map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.age}</td>
                                    <td>{element.gender}</td>
                                    <td>
                                        <Button className='mx-2' variant="info" onClick={() => handleViewClick(element)}>View</Button>
                                        <Button as={Link} to={`/update/${element.id}`} className='mx-2' variant="success" >Edit</Button>
                                        <Button className='mx-2' variant="danger" onClick={() => dispatch(deleteUser(element.id))} >Delete</Button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
            <CustomModal />

        </Container>
    );
};

export default Read;