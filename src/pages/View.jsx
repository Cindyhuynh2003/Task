import React, { useEffect } from 'react';
import './responsive.css'
import './style.css'
import { getAllTodo } from '../reduxtool/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';
import { Link, useNavigate, useParams } from 'react-router-dom';


function formatCurrency(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const View = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const db = firebase.firestore();
    const navigate = useNavigate();
    const todos = useSelector((state) => state.todoReducer);
    const selectedId = id; // Gán giá trị của id cho selectedId

    useEffect(() => {
        db.collection("/products")
            .doc(id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const product = { ...doc.data(), id: doc.id };
                    dispatch(getAllTodo([product]));
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }, []);

    return (
        <div>
            <>
                <section id="header_section">
                    <h4>
                        <Link to={`/shop`}>
                            <img
                                src="https://github.com/tech2etc/Build-and-Deploy-Ecommerce-Website/blob/main/img/logo.png?raw=true"
                                alt="sdfghjk"
                            />
                        </Link>
                    </h4>
                    <div>
                        <ul id="navbar">
                            <a href="#" id="close">
                                {" "}
                                <i className="far fa-times" />
                            </a>
                            <li>
                                <Link to={`/shop`}>Home</Link>
                            </li>
                            <li className="dropdown">
                                <a className="dropbtn" href="/shop">
                                    Shop
                                </a>
                                <div className="dropdown-content">
                                    <a href="">Văn Học</a>
                                    <a href="">Kinh Tế</a>
                                    <a href="">Tâm Lý - Kĩ Năng Sống</a>
                                    <a href="">Nuôi Dậy Con</a>
                                    <a href="">Sách Thiếu Nhi</a>
                                    <a href="">Tiểu Sử - Hồi Ký</a>
                                    <a href="">Sách Giáo Khoa - Tham Khảo</a>
                                    <a href="">Sách Học Ngoại Ngữ</a>
                                </div>
                            </li>
                            <li><a href="">Blog</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Contact</a></li>
                            <li>
                                <i className="bx bx-cart" style={{ paddingRight: "5px" }}></i>
                                <i className='bx bx-user' style={{ paddingRight: "5px" }}></i>
                                <i className='bx bx-message'></i>
                            </li>
                        </ul>
                    </div>
                </section>
                <div id="ctsp">
                    {todos.map((pro) => {
                        if (pro.id === selectedId) { // Kiểm tra id của sản phẩm
                            // Hiển thị thông tin của sản phẩm
                            return (
                                <section id="prodetails" className="section-p1" key={pro.id}>
                                    <div className="single-pro-image">
                                        <img src={pro.avatarURL} alt="" />
                                    </div>
                                    <div className="single-pro-details">
                                        <h4 style={{fontWeight:"600"}}>{pro.titlebook}</h4>
                                        <h2 style={{fontWeight:"600"}}>Giá: {formatCurrency(pro.price)}</h2>
                                        <input type="number" value="1" />
                                        <button className="normal">Add To Cart</button>
                                        <h4>Thông Tin Về Sách</h4>
                                        <span>{pro.description}</span>
                                    </div>
                                </section>
                            );
                        }
                        return null; // Trả về null nếu không có sản phẩm nào trùng khớp với selectedId
                    })}
                </div>
                <footer className="section-p1">
                    <div className="col">
                        <img
                            className="logo"
                            src="https://github.com/tech2etc/Build-and-Deploy-Ecommerce-Website/blob/main/img/logo.png?raw=true"
                            alt=""
                        />
                        <h4>contact</h4>
                        <p>
                            <strong>Address:</strong> 50 lê thị hồng, phường 17, quận gò Vấp, TP.HCM
                        </p>
                        <p>
                            <strong>Phone</strong> 0987654321
                        </p>
                        <p>
                            <strong>Hour:</strong> 10:00 - 18:00, Mon - Sat
                        </p>
                    </div>
                    <div className="col">
                        <h4>About</h4>
                        <a href="">About</a>
                        <a href="">Delivery Information</a>
                        <a href="">Privacy Policy</a>
                        <a href="">Terms &amp; Conditions</a>
                        <a href="">Contact Us</a>
                    </div>
                    <div className="col">
                        <h4>My Account</h4>
                        <a href="">Sign in</a>
                        <a href="">View Cart</a>
                        <a href="">My Wishlist</a>
                        <a href="">Track My Order</a>
                        <a href="">Help</a>
                    </div>
                    <div className="col install">
                        <h4>Install app</h4>
                        <p>From App Store or Google Play</p>
                        <div className="row">
                            <img
                                src="https://github.com/tech2etc/Build-and-Deploy-Ecommerce-Website/blob/main/img/pay/app.jpg?raw=true"
                                alt=""
                            />
                            <img
                                src="https://github.com/tech2etc/Build-and-Deploy-Ecommerce-Website/blob/main/img/pay/play.jpg?raw=true"
                                alt=""
                            />
                        </div>
                        <p>Secured Payment Gateways</p>
                        <img
                            src="https://github.com/tech2etc/Build-and-Deploy-Ecommerce-Website/blob/main/img/pay/pay.png?raw=true"
                            alt=""
                        />
                    </div>
                    <div className="copyright">
                        <p>© Cara Princess Bridal.</p>
                    </div>
                </footer>
            </>

        </div>
    );
};

export default View;