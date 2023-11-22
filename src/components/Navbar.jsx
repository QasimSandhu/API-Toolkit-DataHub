import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUser } from '../features/UserDetailSlice';

const Navbarr = () => {

    const dispatch = useDispatch();

    // Count User Data
    const countAllUsers = useSelector((state) => state.app.userData);

    // Searchbar
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        dispatch(searchUser(searchData));
    }, [dispatch, searchData]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">RTK</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/create">Create Post</Nav.Link>
                        <Nav.Link as={Link} to="/read">All Post ({countAllUsers.length})</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="Search" className="mr-2 mx-2" aria-label="Search" onChange={(e) => dispatch(searchUser(setSearchData(e.target.value)))} />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navbarr;
