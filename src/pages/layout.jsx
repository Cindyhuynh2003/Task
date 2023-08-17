import React from 'react';
import {Link,Outlet} from 'react-router-dom'
const layout = () => {
    return (
        <div id="page_wrapper">
            <div id="sidenav" className="sidenav">
                <div className="sidenav_header">
                    <div className="logo_section">
                        <h3>Admin</h3>
                    </div>
                    <a href="#" className="sidenav_link active">
                        <i className="bx bx-folder" />
                        <h3>Product</h3>
                    </a>
                    <a href="#" className="sidenav_link">
                        <i className="bx bx-user" />
                        <h3> User</h3>
                    </a>
                    <a href="#" className="sidenav_link">
                        <i className="bx bx-file" />
                        <h3>Files</h3>
                    </a>
                    <a href="#" className="sidenav_link">
                        <i className="bx bx-calendar" />
                        <h3>Calendar</h3>
                    </a>
                </div>
                <div className="sidenav_footer">
                    <a href="#" className="sidenav_link">
                        <i className="bx bx-rocket" />
                        <h3>Special Promotion</h3>
                    </a>
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
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" width="50px">
                                        ID
                                    </th>
                                    <th scope="col" width="100px">
                                        Avatar
                                    </th>
                                    <th scope="col" width="100px">
                                        Name
                                    </th>
                                    <th scope="col" width="290px">
                                        Address
                                    </th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Company</th>
                                    {/* <th scope="col">Status</th> */}
                                    <th scope="col" width="70px">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="Account">#3412</td>
                                    <td data-label="Due Date">
                                        <img src="image/user.png" className="tab-img" />
                                    </td>
                                    <td data-label="Due Date">
                                        Manoj
                                    </td>
                                    <td data-label="Amount">Lorem ispum dummy text industry.</td>
                                    <td data-label="Period">fsofe@fpt.com</td>
                                    <td data-label="Due Date">Công ty A</td>
                                   
                                    <td data-label="Period">
                                        <i className="bx bx-pencil" />
                                        &nbsp; 
                                        <i className="bx bx-trash" />
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Account">#3412</td>
                                    <td data-label="Due Date">
                                        <img src="image/user.png" className="tab-img" />
                                    </td>
                                    <td data-label="Due Date">
                                        Manoj
                                    </td>
                                    <td data-label="Amount">Lorem ispum dummy text industry.</td>
                                    <td data-label="Period">fsofe@fpt.com</td>
                                    <td data-label="Due Date">Công ty A</td>
                                   
                                    <td data-label="Period">
                                        <i className="bx bx-pencil" />
                                        &nbsp; 
                                        <i className="bx bx-trash" />
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Account">#3412</td>
                                    <td data-label="Due Date">
                                        <img src="image/user.png" className="tab-img" />
                                    </td>
                                    <td data-label="Due Date">
                                        Manoj
                                    </td>
                                    <td data-label="Amount">Lorem ispum dummy text industry.</td>
                                    <td data-label="Period">fsofe@fpt.com</td>
                                    <td data-label="Due Date">Công ty A</td>
                                   
                                    <td data-label="Period">
                                        <i className="bx bx-pencil" />
                                        &nbsp; 
                                        <i className="bx bx-trash" />
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Account">#3412</td>
                                    <td data-label="Due Date">
                                        <img src="image/user.png" className="tab-img" />
                                    </td>
                                    <td data-label="Due Date">
                                        Manoj
                                    </td>
                                    <td data-label="Amount">Lorem ispum dummy text industry.</td>
                                    <td data-label="Period">fsofe@fpt.com</td>
                                    <td data-label="Due Date">Công ty A</td>
                                   
                                    <td data-label="Period">
                                        <i className="bx bx-pencil" />
                                        &nbsp; 
                                        <i className="bx bx-trash" />
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Account">#3412</td>
                                    <td data-label="Due Date">
                                        <img src="image/user.png" className="tab-img" />
                                    </td>
                                    <td data-label="Due Date">
                                        Manoj
                                    </td>
                                    <td data-label="Amount">Lorem ispum dummy text industry.</td>
                                    <td data-label="Period">fsofe@fpt.com</td>
                                    <td data-label="Due Date">Công ty A</td>
                                   
                                    <td data-label="Period">
                                        <i className="bx bx-pencil" />
                                        &nbsp; 
                                        <i className="bx bx-trash" />
                                        &nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td data-label="Account">#3412</td>
                                    <td data-label="Due Date">
                                        <img src="image/user.png" className="tab-img" />
                                    </td>
                                    <td data-label="Due Date">
                                        Manoj
                                    </td>
                                    <td data-label="Amount">Lorem ispum dummy text industry.</td>
                                    <td data-label="Period">fsofe@fpt.com</td>
                                    <td data-label="Due Date">Công ty A</td>
                                   
                                    <td data-label="Period">
                                        <i className="bx bx-pencil" />
                                        &nbsp; 
                                        <i className="bx bx-trash" />
                                        &nbsp;
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button id="theme_switch">
                            <i className="bx bx-sun" />
                        </button>
                    </div>
                </header>
            </main>
        </div>
    );
};


export default layout;