import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase, { storage } from '../firebase';
import AuthWrapper from '../auth/AuthWrapper';
import Logout from '../auth/Logout';


const AddPro = () => {

    const [titlebook, setTitle] = useState('');
    const [bookcat, setBook] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDesc] = useState('');


    const db = firebase.firestore();
    const navigate = useNavigate();

    const handleAdd = async (event) => {
        event.preventDefault();

        const newData = {
            titlebook: titlebook,
            bookcat: bookcat,
            price: price,
            description: description,
            time: new Date().getTime()
        };// Tạo reference tới collection 'users' trong Firestore
        const usersRef = db.collection('/products');

        // Tạo reference tới một document mới trong collection 'users'
        const newDocRef = usersRef.doc();

        // Lấy ID của document mới được tạo
        const newDocId = newDocRef.id;

        // Tạo reference tới Firebase Storage cho tệp tin
        const storageRef = storage.ref(`products/${newDocId}/avatar.jpg`);

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

            navigate('/product');
            alert('Đã thêm thành công')
        } catch (error) {
            console.log(error);
        }
    };
    return (
       <AuthWrapper>
         <div id='page_wrapper'>
            <div id="sidenav" className="sidenav nav">
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
                        <Logout />
                    </div>
                    <button id="nav_collapse_btn">
                        <i className="bx bxs-chevrons-left" />
                    </button>
                </div>
            </div>
            <main>
                <header>
                    <div className="text">
                        <h2 style={{ textTransform: "uppercase", fontWeight: "600" }} >Add Product</h2>
                    </div>
                </header>
                <div className="container">
                    <form className='mb-3' onSubmit={handleAdd} encType="multipart/form-data">
                        <div className="row g-3 m-1">
                            <div className="col-sm-6">
                                <label htmlFor="name" className="form-label">
                                    ID Sách
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    placeholder="EF23cf34K"

                                />
                            </div>

                            <div className="col-sm">
                                <label htmlFor="titlebook" className="form-label">
                                    Tên Sách
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tuổi Trẻ Đáng Giá Bao Nhiêu"
                                    name='titlebook'
                                    value={titlebook}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row g-3 m-1">
                            <div className="col-sm-6">
                                <label htmlFor="bookcat" className="form-label">
                                    Loại Sách
                                </label>
                                <select
                                    className="form-select"
                                    name="bookcat"
                                    aria-label="Default select example"
                                    value={bookcat}
                                    onChange={(e) => setBook(e.target.value)}
                                >
                                    <option defaultValue>Select an option</option>
                                    <option value="van hoc">Văn Học</option>
                                    <option value="kinh te">Kinh Tế</option>
                                    <option value="tam ly - ky nang song">Tâm Lý - Kỹ Năng Sống</option>
                                    <option value="nuoi day con">Nuôi Dạy Con</option>
                                    <option value="sach thieu nhi">Sách Thiếu Nhi</option>
                                    <option value="tieu su - hoi ky">Tiểu Sử - Hồi Ký</option>
                                    <option value="sach giao khoa - tham khao">Sách Giáo Khoa - Tham Khảo</option>
                                    <option value="sach hoc ngoai ngu">Sách Học Ngoại Ngữ</option>
                                </select>
                            </div>

                            <div className="col-sm">
                                <label htmlFor="price" className="form-label">
                                    Giá Sách
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    placeholder="12000"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row g-3 m-1">
                            <div className="col">
                                <label htmlFor="avatar" className="form-label">
                                    Ảnh Sản Phẩm
                                </label>
                                <input
                                    className="form-control"
                                    id="avatar"
                                    name="image"
                                    type="file"
                                    accept=".png,.jpg,.docx"
                                />
                            </div>
                        </div>
                        <div className="row g-3 m-1">
                            <div className="col-sm">
                                <label htmlFor="name" className="form-label">
                                    Mô Tả
                                </label>
                                <textarea 
                                name="description" 
                                id="description" 
                                cols="20" rows="5" 
                                className="form-control"
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className=" m-1">
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

export default AddPro;