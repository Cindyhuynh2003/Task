import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import firebase, { storage } from '../firebase';
import AuthWrapper from '../auth/AuthWrapper';


const EditPro = () => {

    const [totitlebook, setTitle] = useState('');
    const [tobookcat, setBook] = useState('');
    const [toprice, setPrice] = useState('');
    const [todescription, setDesc] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    const db = firebase.firestore();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        db.collection('products')
            .doc(id)
            .get()
            .then(response => {
                setTitle(response.data().titlebook)
                setBook(response.data().bookcat)
                setPrice(response.data().price)
                setDesc(response.data().description)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault(); // ngăn tự đông load lại trang

        const docRef = db.collection('products').doc(id);
        const file = document.getElementById('avatar').files[0];
        const storageRef = storage.ref(`products/${docRef}/avatar.jpg`);

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

        db.collection('products')
            .doc(id)
            .update({
                titlebook: totitlebook,
                bookcat: tobookcat,
                price: toprice,
                description: todescription
            })
            .then(() => {
                alert('Data updated successfully!');
                if (window.history && window.history.goBack) {
                    navigate(-1);
                } else {
                    navigate('/product');
                }
            })
            .catch(error => {
                console.log(error);
            });
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
                    <form className='mb-3' onSubmit={handleUpdate}>
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
                                    value={totitlebook}
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
                                    value={tobookcat}
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
                                    value={toprice}
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
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row g-3 m-1">
                            <div className="col-sm">
                                <label htmlFor="description" className="form-label">
                                    Mô Tả
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    cols="20" rows="5"
                                    className="form-control"
                                    value={todescription}
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

export default EditPro;