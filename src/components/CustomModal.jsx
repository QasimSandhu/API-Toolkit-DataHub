import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setEditUserModal } from '../features/UserDetailSlice';

function CustomModal() {

    const dispatch = useDispatch();

    // Get data from Redux store
    const appStore = useSelector((state) => state.app);
    // console.log(appStore,"appStore , Custom Modal");
    // const { editUserModal, getUserModalId } = useSelector((state) => state.app);
    const showPopup = appStore.editUserModal;
    const userId = appStore.getUserModalId;
    const setShowPopup = (value) => dispatch(setEditUserModal(value));

    // Get data from Redux store
    const getAllUsers = useSelector((state) => state.app.userData);

    // find single user
    const singleUser = getAllUsers.find((element) => element.id === userId);

    const handleClose = () => {
        setShowPopup(false);
    };

    // Check if singleUser is defined before accessing its properties
    if (!singleUser) {
        return (
            <Modal show={showPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Not Found</Modal.Title>
                </Modal.Header>
                <Modal.Body>The user with ID {userId} was not found.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <Modal show={showPopup} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>View Single Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>Name: {singleUser.name}</Modal.Body>
            <Modal.Body>Email: {singleUser.email}</Modal.Body>
            <Modal.Body>Age: {singleUser.age}</Modal.Body>
            <Modal.Body>Gender: {singleUser.gender}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleClose}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;