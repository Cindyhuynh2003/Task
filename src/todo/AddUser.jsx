import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase, { storage } from '../firebase';
import AuthWrapper from '../auth/AuthWrapper';
import Logout from '../auth/Logout';

const AddUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWeb] = useState('');
    const [company, setCompany] = useState('');

    const navigate = useNavigate();
    const db = firebase.firestore();

    const handleAdd = async (event) => {
        event.preventDefault();

        // Tạo dữ liệu mới
        const newData = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            website: website,
            company: company,
            time: new Date().getTime()
        };

        // Tạo reference tới collection 'users' trong Firestore
        const usersRef = db.collection('users');

        // Tạo reference tới một document mới trong collection 'users'
        const newDocRef = usersRef.doc();

        // Lấy ID của document mới được tạo
        const newDocId = newDocRef.id;

        // Tạo reference tới Firebase Storage cho tệp tin
        const storageRef = storage.ref(`users/${newDocId}/avatar.jpg`);

        // Lấy tệp tin từ input có ID là 'avatar'
        const file = document.getElementById('avatar').files[0];

        try {
            // Upload tệp tin lên Firebase Storage
            const snapshot = await storageRef.put(file);

            // Lấy URL của tệp tin
            const downloadURL = await snapshot.ref.getDownloadURL();

            // Thêm URL của tệp tin vào dữ liệu mới
            newData.avatarURL = downloadURL;

            // Lưu dữ liệu mới vào Firestore
            await newDocRef.set(newData);

            navigate('/user');
            alert('Đã thêm thành công')
        } catch (error) {
            console.log(error);
        }
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
                        <h2>Add User</h2>
                    </div>
                </header>
                <div className="container mb-3">
                    <form className="mb-5" onSubmit={handleAdd} encType="multipart/form-data">
                        <div className="col-10 m-auto p-2">
                            <div className="m-2">
                                <label htmlFor="name" className="form-label">
                                    Họ Và Tên:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Họ và Tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="email" className="form-label">
                                    Địa chỉ email:
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email}
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
                                    placeholder="0808..."
                                    value={phone}
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
                                    placeholder="ho chi minh city"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                                    placeholder="mwc.com.vn"
                                    value={website}
                                    onChange={(e) => setWeb(e.target.value)}
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
                                    value={company}
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

export default AddUser;
