import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../auth/AuthWrapper';
import Logout from '../auth/Logout';

const Home = () => {

    const db = firebase.firestore()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const todos = useSelector(state => state.todoReducer)

    useEffect(() => {
        db.collection('pro')
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
    
    return (
        <AuthWrapper>
<div id="page_wrapper">
            <div id="sidenav" className="sidenav">
                <div className="sidenav_header">
                    <div className="logo_section">
                        <h3>Admin</h3>
                    </div>

                    <Link className="sidenav_link active" to="/">
                        <i className="bx bx-tachometer" />
                        <h3>Dashboard</h3>
                    </Link>
                    <Link className="sidenav_link" to="/category">
                        <i className="bx bx-file" />
                        <h3>Category</h3>
                    </Link>
                    <Link className="sidenav_link " to="/product">
                        <i className="bx bx-folder" />
                        <h3>Product</h3>
                    </Link>
                    <Link className="sidenav_link" to="/user">
                        <i className="bx bx-user" />
                        <h3> User</h3>
                    </Link>
                    <Link className="sidenav_link">
                        <i className="bx bx-calendar" />
                        <h3>Calendar</h3>
                    </Link>
                   <Logout/>
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
                        <h2>Projects</h2>
                        <p>Overview of the status, progress, and performance of projects</p>
                    </div>
                </header>
                <>
                    <div className="col-div-3">
                        <div className="box">
                            <p>
                                10
                                <br />
                                <span>Users</span>
                            </p>
                            <i className="fa fa-users box-icon" />
                        </div>
                    </div>
                    <div className="col-div-3">
                        <div className="box">
                            <p>
                                20
                                <br />
                                <span>Products</span>
                            </p>
                            <i className="fa fa-list box-icon" />
                        </div>
                    </div>
                    <div className="col-div-3">
                        <div className="box">
                            <p>
                                5
                                <br />
                                <span>Categories</span>
                            </p>
                            <i className="fa fa-shopping-bag box-icon" />
                        </div>
                    </div>
                    <div className="col-div-3">
                        <div className="box">
                            <p>
                                10
                                <br />
                                <span>Orders</span>
                            </p>
                            <i className="fa fa-tasks box-icon" />
                        </div>
                    </div>
                </>
                <div className="col-div-8">
                    <div className="box-8">
                        <div className="content-box">
                            <p>

                            </p>
                            <table>
                                <tr style={{ color: "red",fontSize:'18px' }}>
                                    <th>Company</th>
                                    <th>Contact</th>
                                    <th>Country</th>
                                </tr>
                                <tr>
                                    <td>Alfreds Futterkiste</td>
                                    <td>Maria Anders</td>
                                    <td>Germany</td>
                                </tr>
                                <tr>
                                    <td>Centro comercial Moctezuma</td>
                                    <td>Francisco Chang</td>
                                    <td>Mexico</td>
                                </tr>
                                <tr>
                                    <td>Ernst Handel</td>
                                    <td>Roland Mendel</td>
                                    <td>Austria</td>
                                </tr>
                                <tr>
                                    <td>Island Trading</td>
                                    <td>Helen Bennett</td>
                                    <td>UK</td>
                                </tr>
                                <tr>
                                    <td>Ervin Howell</td>
                                    <td>Helen Bennett</td>
                                    <td>UK</td>
                                </tr>
                                <tr>
                                    <td>Island Trading</td>
                                    <td>Antonette</td>
                                    <td>Italy</td>
                                </tr>
                                <tr>
                                    <td>Romaguera-Jacobson</td>
                                    <td>Samantha</td>
                                    <td>America</td>
                                </tr>
                                <tr>
                                    <td>Robel-Corkery</td>
                                    <td>Karianne</td>
                                    <td>Netherlands</td>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

            </main>
        </div>
        </AuthWrapper>
        
    );
};

export default Home;