import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import firebase, { storage } from '../firebase';
import AuthWrapper from '../auth/AuthWrapper';

const EditUser = () => {

    const [todo, setTodo] = useState('');
    const [toemail, setEmail] = useState('');
    const [tophone, setPhone] = useState('');
    const [toaddress, setAddress] = useState('');
    const [towebsite, setWeb] = useState('');
    const [tocompany, setCompany] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const db = firebase.firestore();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        db.collection('users')
            .doc(id)
            .get()
            .then(response => {
                setTodo(response.data().name)
                setEmail(response.data().email)
                setPhone(response.data().phone)
                setAddress(response.data().address)
                setWeb(response.data().website)
                setCompany(response.data().company)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault(); // ngăn tự đông load lại trang

        const docRef = db.collection('users').doc(id);
        const file = document.getElementById('avatar').files[0];
        const storageRef = storage.ref(`users/${docRef}/avatar.jpg`);

        try {
            const snapshot = await storageRef.put(file);
            const downloadURL = await snapshot.ref.getDownloadURL();
            await docRef.update({
                avatarURL: downloadURL,
            });
            console.log('Thay thế URL ảnh thành công');
        } catch (error) {
            console.log('Lỗi khi thay thế URL ảnh:', error);
        }

        db.collection('users')
            .doc(id)
            .update({
                name: todo,
                email: toemail,
                phone: tophone,
                address: toaddress,
                company: tocompany,
                website: towebsite,
            })
            .then(() => {
                alert('Data updated successfully!');
                if (window.history && window.history.goBack) {
                    navigate(-1);
                } else {
                    navigate('/user');
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
                <div id="sidenav" className="sidenav">
                    <div className="sidenav_header">
                        <div className="logo_section">
                            <h3>Admin</h3>
                        </div>

                        <Link className="sidenav_link" to="/">
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
                        <Link className="sidenav_link active" to="/user">
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
            <main>
                <header>
                    <div className="text">
                        <h2>Update User</h2>
                    </div>
                </header>
                <div className="container mb-3">
                    <form className="mb-5" onSubmit={handleUpdate} >
                        <div className="col-10 m-auto p-2">
                            <div className="m-2">
                                <label htmlFor="name" className="form-label">
                                    Họ Và Tên:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    name="name"
                                    value={todo}
                                    onChange={(e) => setTodo(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="email" className="form-label">
                                    Địa chỉ email:
                                </label>
                                <input
                                    type="email"
                                    id='email'
                                    className="form-control"
                                    name="email"
                                    // placeholder="name@example.com"
                                    value={toemail}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="phone" className="form-label">
                                    Số điện thoại:
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    id='phone'
                                    value={tophone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="address" className="form-label">
                                    Địa Chỉ:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    id='address'
                                    value={toaddress}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="website" className="form-label">
                                    Website:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="website"
                                    id='website'
                                    value={towebsite}
                                    onChange={(e) => setWeb(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="avatar" className="form-label">
                                    Chọn file
                                </label>
                                <input
                                    className="form-control"
                                    id="avatar"
                                    name="image"
                                    type="file"
                                    accept=".png,.jpg,.docx"
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="company" className="form-label">
                                    Company:
                                </label>
                                <select
                                    className="form-select"
                                    name="company"
                                    aria-label="Default select example"
                                    id='company'
                                    value={tocompany}
                                    onChange={(e) => setCompany(e.target.value)}
                                >
                                    <option defaultValue>Select an option</option>
                                    <option value="Dau Tien Company">Công ty Dầu Tiến</option>
                                    <option value="FPT Software">FPT Software</option>
                                    <option value="AuLac Company">Công Ty Âu Lạc</option>
                                </select>
                            </div>
                            <button className="btn btn-success m-2" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
       </AuthWrapper>
    );
};

export default EditUser;