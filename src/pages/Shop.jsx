import React, { useEffect } from 'react';
import './responsive.css'
import './style.css'
import { getAllTodo } from '../reduxtool/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function formatCurrency(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

const Shop = () => {

    const dispatch = useDispatch()
    const db = firebase.firestore()
    const navigate = useNavigate()
    const todos = useSelector(state => state.todoReducer)

    useEffect(() => {
        db.collection('products')
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
        <div>
            <>
                {/* menu */}
                <section id="header_section">
                    <h4>
                        <a href="/">
                            <img
                                src="https://github.com/tech2etc/Build-and-Deploy-Ecommerce-Website/blob/main/img/logo.png?raw=true"
                                alt="sdfghjk"
                            />
                        </a>
                    </h4>
                    <div>
                        <ul id="navbar">
                            <a href="#" id="close">
                                {" "}
                                <i className="far fa-times" />
                            </a>
                            <li>
                                <a href="http://localhost:3000/" className="active">
                                    Home
                                </a>
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
                                    <a href="">
                                        Sách Giáo Khoa - Tham Khảo
                                    </a>
                                    <a href="">Sách Học Ngoại Ngữ</a>
                                </div>
                            </li>
                            <li>
                                <a href="">Blog</a>
                            </li>
                            <li>
                                <a href="">About</a>
                            </li>
                            <li>
                                <a href="">Contact</a>
                            </li>
                            <li>
                                <i className="bx bx-cart" style={{ paddingRight: "5px" }}></i>
                                <i className='bx bx-user' style={{ paddingRight: "5px" }}></i>
                                <i className='bx bx-message'></i>
                            </li>
                        </ul>
                    </div>
                </section>
                {/* end menu */}
                {/* thong tin chinh */}
                <section id="hero"></section>
                {/* end thong tin chính */}
                <section id="product1" className="section-p1">
                    <h2>Những Quyển Sách </h2>
                    <p>Người Bạn Đồng Hành Từ Khi Chúng Ta Còn Bé</p>
                    <div className="pro-container" id="spmoi">
                        {todos.slice(12, 20).map(sp => (
                            <div className='pro'>
                                <Link to={`/view/${sp.id}`}>
                                    <img src={sp.avatarURL} alt="" />
                                </Link>
                                <div className="des">
                                    <a href="">
                                        <h5> {sp.titlebook} </h5>
                                    </a>
                                    <h4>{formatCurrency(sp.price)}</h4>
                                </div>
                                <a href="" className="cart">
                                    <i className="bi-cart-x-fill" aria-hidden="true"></i>
                                </a>
                            </div>

                        ))}
                    </div>
                </section>
                <section id="banner" className="section-m1">
                    <h4>Siêu Ưu Đãi</h4>
                    <h2>
                        Lên đến <span>50%</span> Tất Cả Các Loại Sách{" "}
                    </h2>
                    <button className="normal white" style={{ color: "#fff" }}>
                        Khám Phá Ngay
                    </button>
                </section>
                <section id="product1" className="section-p1">
                    <h2>Sách Bán Chạy </h2>
                    <div className="pro-container" id="spmoi2">
                        {todos.slice(-4).map(sp => (
                            <div className='pro'>
                                <Link to={`/view/${sp.id}`}>
                                    <img src={sp.avatarURL} alt="" />
                                </Link>
                                <div className="des">
                                    <a href="">
                                        <h5> {sp.titlebook} </h5>
                                    </a>
                                    <h4>{formatCurrency(sp.price)}</h4>
                                </div>
                                <a href="" className="cart">
                                    <i className="bi-cart-x-fill" aria-hidden="true"></i>
                                </a>
                            </div>

                        ))}
                    </div>
                </section>
                <section id="newsletter" className="section-p1 section-m1">
                    <div className="newstext">
                        <h4>Sign up for newsletter</h4>
                        <p>
                            Get E-mail Update about our latest shop <span>special offer</span>{" "}
                        </p>
                    </div>
                    <div className="form">
                        <input type="text" placeholder="Your email address" />
                        <button className="normal">Sign Up</button>
                    </div>
                </section>
                <footer className="section-p1">
                    <div className="col">
                        <img
                            className="logo"
                            src="https://github.com/tech2etc/Build-and-Deploy-Ecommerce-Website/blob/main/img/logo.png?raw=true"
                            alt=""
                        />
                        <h4>Contact</h4>
                        <p>
                            <strong>Address:</strong> 50 lê thị hồng, phường 17, quận gò Vấp, TP.HCM
                        </p>
                        <p>
                            <strong>Phone</strong> 0987654321
                        </p>
                        <p>
                            <strong>Hour:</strong> 10:00 - 18:00, Mon - Sat
                        </p>
                        <div className="follow">
                            <h4>Follow Us</h4>
                            <div className="icon">
                                <i className="fab fa-facebook-f" />
                                <i className="fab fa-twitter" />
                                <i className="fab fa-instagram" />
                                <i className="fab fa-pinterest-p" />
                                <i className="fab fa-youtube" />
                            </div>
                        </div>
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
                        <p>© Cửa Hàng Sách Mini</p>
                    </div>
                </footer>
            </>

        </div>
    );
};

export default Shop;