import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { deleteUserAsync, updateUserAsync } from '../redux/usersSlice';
import { toast } from 'react-toastify';

function listItem({ user }) {
    const dispatch = useDispatch();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const updatedUserData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
        };

        try {
            const res = await dispatch(updateUserAsync({ userId: user?._id, userData: updatedUserData }));
            console.log(res.error)
            if (res.error) {
                throw res.error;
            }
            toast.success('User updated successfully');
            handleCloseUpdateModal();
        } catch (error) {
            // Handle error
            toast.error(error.message);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await dispatch(deleteUserAsync(user._id));
            if (res.error) {
                throw res.error;
            }
            toast.success('User deleted successfully');
            handleCloseDeleteModal();
        } catch (error) {
            // Handle error
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-gray-800 text-white max-w-sm rounded-lg overflow-hidden shadow-md">
            <div className="px-6 py-4">
                <div className="font-semibold text-xl mb-2 text-gray-200">{user?.name}</div>
                <p className="text-gray-300 text-base">
                    <span className="block mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 inline-block mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Phone: {user?.phone}
                    </span>
                    <span className="block mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 inline-block mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Email: {user?.email}
                    </span>
                    <span className="block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 inline-block mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                        </svg>
                        Address: {user?.address}
                    </span>
                </p>
                <div className="flex justify-between mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        onClick={handleShowUpdateModal}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red active:bg-red-800"
                        onClick={handleShowDeleteModal}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <form className="w-full max-w-lg" onSubmit={handleUpdateUser}>
                    <Modal.Body>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="name"
                                    type="text"
                                    placeholder="Jane"
                                    defaultValue={user?.name}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="email"
                                    type="email"
                                    placeholder="jane@test.com"
                                    defaultValue={user?.email}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="phone"
                                    type="text"
                                    placeholder="123456789"
                                    defaultValue={user?.phone}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="address"
                                    type="text"
                                    placeholder="123 Main St"
                                    defaultValue={user?.address}
                                />
                            </div>
                        </div>

                    </Modal.Body>
                    <div className="flex justify-end w-full gap-3 px-3 py-3">
                        <Button variant="secondary" onClick={handleCloseUpdateModal}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default listItem;
