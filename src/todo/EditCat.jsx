import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import firebase, { storage } from '../firebase';
import AuthWrapper from '../auth/AuthWrapper';

const EditCat = () => {

    const [tocatname, setCat] = useState('');
    const [tocatnum, setNum] = useState('');

    const db = firebase.firestore();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        db.collection('category')
            .doc(id)
            .get()
            .then(response => {
                setCat(response.data().catname);
                setNum(response.data().catnum);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault();
        db.collection('category')
            .doc(id)
            .update({
                catname: tocatname,
                catnum: tocatnum
            })
            .then(() => {
                alert('Data updated successfully!');
                if (window.history && window.history.goBack) {
                    navigate(-1);
                } else {
                    navigate('/category');
                }
            })
            .catch(error => {
                console.log(error);
            });
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
                    </div>
                    <button id="nav_collapse_btn">
                        <i className="bx bxs-chevrons-left" />
                    </button>
                </div>
            </div>
            <main className='m-5'>
                <header>
                    <div className="text">
                        <h2>Update Category</h2>
                    </div>
                </header>
                <div className="container mb-3">
                    <form className="mb-5" onSubmit={handleUpdate}>
                        <div className="col-10 m-auto p-4">
                            <div className="m-2">
                                <label htmlFor="idcat" className="form-label">
                                    ID
                                </label>
                                <input
                                    disabled
                                    className="form-control"
                                    value={id}
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
                                    value={tocatname}
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
                                    id='catnum'
                                    name="catnum"
                                    value={tocatnum}
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

export default EditCat;