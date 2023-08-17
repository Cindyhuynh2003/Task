import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase, { storage } from '../firebase';
import AuthWrapper from '../auth/AuthWrapper';
import Logout from '../auth/Logout'
const AddCat = () => {

    const [catname, setCat] = useState('');
    const [catnum, setNum] = useState('')
    const navigate = useNavigate();  
    const db = firebase.firestore(); //connect db

    const handleAdd = async (event) => {
        event.preventDefault();

        // Tạo dữ liệu mới
        const newData = {
            catname:catname,
            catnum : catnum,
            time: new Date().getTime()
        }
        db.collection('category')
        .add(newData)
        .then( () => {
            navigate('/category')
        })

    };

    return (
        <AuthWrapper>
            <div id="page_wrapper">
            <div id="sidenav" className="sidenav">
                {/* Sidebar content */}
                <div id="sidenav" className="sidenav nav">
                    <div className="sidenav_header">
                        <div className="logo_section">
                            <h3>Admin</h3>
                        </div>

                        <Link className="sidenav_link" to="/">
                            <i className="bx bx-tachometer" />
                            <h3>Dashboard</h3>
                        </Link>
                        <Link className="sidenav_link active" to="/category">
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
                    </div>
                    <div className="sidenav_footer">
                        <Link className="sidenav_link">
                            <i className="bx bx-rocket" />
                            <h3>Special Promotion</h3>
                        </Link>
                        <Logout />
                    </div>
                    <button id="nav_collapse_btn">
                        <i className="bx bxs-chevrons-left" />
                    </button>
                </div>
            </div>
            <main className='m-5'>
                <header>
                    <div className="text">
                        <h2 >Add Category</h2>
                    </div>
                </header>
                <div className="container mb-3">
                    <form className="mb-5" onSubmit={handleAdd} encType="multipart/form-data">
                        <div className="col-10 m-auto p-4">
                            <div className="m-2">
                                <label htmlFor="idcat" className="form-label">
                                    ID
                                </label>
                                <input
                                    disabled
                                    className="form-control"
                                    />
                            </div>
                            <div className="m-2">
                                <label htmlFor="catname" className="form-label">
                                    Tên Loại
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id='catname'
                                    placeholder="Tên Loại Hàng"
                                    name="catname"
                                    value={catname} 
                                    onChange={(e) => setCat(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="catnum" className="form-label">
                                    Số lượng
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="catnum"
                                    value={catnum}
                                    onChange={(e) => setNum(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-success m-2" type="submit">
                                Submit
                            </button>
                            <div className='mb-5'></div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
        </AuthWrapper>
    );
};

export default AddCat;
