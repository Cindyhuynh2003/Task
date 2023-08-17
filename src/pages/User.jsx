import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTodo, deleteTodo } from '../reduxtool/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';
import AuthWrapper from '../auth/AuthWrapper';
import Logout from '../auth/Logout';
const User = () => {
    const dispatch = useDispatch()
    const db = firebase.firestore()
    const navigate = useNavigate()
    const todos = useSelector(state => state.todoReducer)

    useEffect(() => {
        db.collection('users')
            .orderBy('time', 'desc')
            .get()
            .then(
                todolist => {
                    const arr = []
                    todolist.forEach(item => arr.push({ ...item.data(), id: item.id }))
                    dispatch(getAllTodo(arr))
                }
            )
    }, [])

    const handleEdit = (id) => {
        navigate('/edituser/' + id)
    }

    const handleDelete = (id) => {
        const confirmation = window.confirm('Are you sure you want to delete this item?');
        if (confirmation) {
            db.collection('users')
                .doc(id)
                .delete()
                .then(() => {
                    dispatch(deleteTodo(id))
                    alert('Delete Successfully');
                    window.location.reload(); // Tải lại trang sau khi xóa thành công
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <AuthWrapper>
            <div id="page_wrapper">
            <div id="sidenav" className="sidenav nav">
                    <div className="sidenav_header">
                        <div className="logo_section">
                            <h3>Admin</h3>
                        </div>

                        <Link className="sidenav_link" to="/">
                            <i className="bx bx-tachometer" />
                            <h3>Dashboard</h3>
                        </Link>
                        <Link className="sidenav_link " to="/category">
                            <i className="bx bx-file" />
                            <h3>Category</h3>
                        </Link>
                        <Link className="sidenav_link " to="/product">
                            <i className="bx bx-folder" />
                            <h3>Product</h3>
                        </Link>
                        <Link className="sidenav_link active" to="/user">
                            <i className="bx bx-user" />
                            <h3> User</h3>
                        </Link>
                        
                        <Link className="sidenav_link">
                            <i className="bx bx-calendar" />
                            <h3>Calendar</h3>
                        </Link>
                        <Logout />
                    </div>
                    <div className="sidenav_footer">
                        <Link className="sidenav_link">
                            <i className="bx bx-rocket" />
                            <h3>Special Promotion</h3>
                        </Link>
                    </div>
                    <button id="nav_collapse_btn">
                        <i className="bx bxs-chevrons-left" />
                    </button>
                </div>
                <main>
                    <header>
                        <div className="text">
                            <h2 style={{ fontWeight:"600"}}>Users</h2>
                            <p>Overview of user information</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col" width="20%">
                                            ID
                                        </th>
                                        <th scope="col" width="9%">
                                            Avatar
                                        </th>
                                        <th scope="col" width="13%">
                                            Name
                                        </th>
                                        <th scope="col" width="12%">
                                            Number Phone
                                        </th>
                                        <th scope="col" width="15%">
                                            Address
                                        </th>
                                        <th scope="col" width='25%'>Email</th>
                                        <th scope="col" width="70px">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.map(item => (
                                        <tr key={item.id}>
                                            <td data-label="Account">{item.id}</td>
                                            <td data-label="Due Date">
                                                <img src={item.avatarURL} className="tab-img" />
                                            </td>
                                            <td data-label="Due Date"> {item.name} </td>
                                            <td data-label="Amount">{item.phone}</td>
                                            <td data-label="Amount">{item.address}</td>
                                            <td data-label="Period">{item.email}</td>

                                            <td data-label="Period">
                                                <i className="bx bx-pencil" onClick={() => handleEdit(item.id)} />
                                                &nbsp;
                                                <i className="bx bx-trash" onClick={() => handleDelete(item.id)} />
                                                &nbsp;
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <Link to='/adduser'>
                            <button id="theme_switch">
                                <i className="bx bx-plus" width="30px" />
                            </button>
                        </Link>
                    </header>
                </main>
            </div>
        </AuthWrapper>
    );
};

export default User;