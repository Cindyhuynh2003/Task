import { getAllTodo } from '../reduxtool/todoSlide';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'
import { useEffect } from 'react';
function formatCurrency(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}



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
        <div>
            <div className="container">
                <div className="header">
                    <div className="header-left">
                        <img src="./img/logo.png" alt="" />
                    </div>
                    <div className="header-mid">
                        <div className="header-mid-hotline">
                            <p> Hotline: 0392974878</p>
                        </div>
                        <div className="header-mid-gmail">
                            <div>
                                <ion-icon name="mail-outline" />
                            </div>
                            <div>
                                <p> bangtrienn@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="header-right">
                        <a href="giohang.html">
                            <ion-icon name="bag-outline" />
                        </a>
                    </div>
                </div>
                <div className="menu">
                    <div className="menu-left">
                        <ul>
                            <li>
                                <a href="ctsp.html">Sản phẩm</a>
                                <ul className="xosanpham" style={{ zIndex: 1 }}>
                                    <li>
                                        <a href="nike.html" target="page">
                                            Nike
                                        </a>
                                    </li>
                                    <li>
                                        <a href="adidas.html" target="page">
                                            Adidas
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mizuno.html">Mizuno</a>
                                    </li>
                                    <li>
                                        <a href="#">Puma</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="baiviet.html" target="page">
                                    Bài viết
                                </a>
                            </li>
                            <li>Giới thiệu</li>
                            <li>
                                <a href="dangky.html" target="page">
                                    Đăng ký
                                </a>
                            </li>
                            <li>
                                <a href="login.html" target="page">
                                    Đăng nhập
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="menu-right">
                        <div className="menu-right-search">
                            <input type="text" placeholder="Nhập từ khóa cần tìm kiếm" />
                        </div>
                        <div className="menu-right-icon">
                            <ion-icon name="search-outline" />
                        </div>
                    </div>
                </div>
                <div className="banner">
                    <img src="./img/image 5.png" alt="" />
                    <h1>PANG SPORT</h1>
                </div>
                <div className="shop">
                    <h2>PUMA</h2>
                </div>
                <ul className="sanpham">
                    {todos.slice(0, 4).map(sp => (
                        <li>
                            <div className="top">
                                <a href=""></a>
                                <a href="">
                                    <img src={sp.avatarURL} alt="" />
                                </a>
                                <div className="thongtin">
                                    <p>{sp.tengiay}</p>
                                    <div className="gia">{formatCurrency(sp.price)}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="timkiem">
                    <h4> &gt;Xem tất cả sản phẩm&lt; </h4>
                </div>
                <div className="shopp">
                    <h1>MIZUNO</h1>
                    <ul className="sanpham">
                        <li>
                            <div className="top">
                                <a href="">
                                    <img src="img/mizuno2.png" alt="" />
                                </a>
                                <div className="thongtin">
                                    <p>Mizuno Morelia TF- Bright Crimson</p>
                                    <div className="gia">2.000.000đ</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="top">
                                <a href="">
                                    <img src="img/mizuno3.png" alt="" />
                                </a>
                                <div className="thongtin">
                                    <p>Mizuno Morelia Sala Classic TF </p>
                                    <div className="gia">2.000.000đ</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="top">
                                <a href="">
                                    <img src="img/mizuno4.png" alt="" />
                                </a>
                                <div className="thongtin">
                                    <p>Mizuno Monarcida Neo II Select AS TF </p>
                                    <div className="gia">1.870.000đ</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="top">
                                <a href="">
                                    <img src="img/mizuno5.jpg" alt="" />
                                </a>
                                <div className="thongtin">
                                    <p>Mizuno Monarcida Neo II Select AS TF </p>
                                    <div className="gia">1.950.000đ</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="timkiem">
                        <h4> &gt;Xem tất cả sản phẩm&lt;</h4>
                    </div>
                </div>
                <div className="shoppp">
                    <h1>ADIDAS</h1>
                </div>
                <ul className="sanpham">
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/adidas x.jpg" alt="" />
                            </a>
                            <div className="thongtin">
                                <p>Adidas Predator Freak .3 LL TF – White </p>
                                <div className="gia">2.300.000đ</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/adidas5.png" alt="" />
                            </a>
                            <div className="thongtin">
                                <p>Adidas Predator Freak .3 TF White Spark-</p>
                                <div className="gia">1.900.005đ</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/ADIDAS2.png" alt="" />
                            </a>
                            <div className="thongtin">
                                <p>It ASD TF Adidas Iron Man 3</p>
                                <div className="gia">1.870.000đ</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/adias4.png" alt="" />
                            </a>
                            <div className="thongtin">
                                <p>Adidas X Speedflow .3 TF ll – White</p>
                                <div className="gia">1.100.000đ</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="timkiem">
                    <h4> &gt;Xem tất cả sản phẩm&lt;</h4>
                </div>
                <div className="shopppp">
                    <h1>ADIDAS-NEMEZIZ</h1>
                </div>
                <ul className="sanpham">
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/NM1.jpg" alt="" />
                            </a>
                            <div className="thongtin">
                                <p>Adidas Nemeziz 19.3 TF Uniforia </p>
                                <div className="gia">2.900.000đ</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/NM2.png" alt="" />
                            </a>
                            <div className="thongtin">
                                <p>Adidas Nemeziz Messi 18.3 FG- White</p>
                                <div className="gia">3.000.000đ</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/NM3.png" alt="" />
                            </a>
                            <div className="thongtin">
                                <p>Adidas Nemeziz .3 MG Superlative</p>
                                <div className="gia">1.220.000đ</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="top">
                            <a href="">
                                <img src="img/NM4.png" alt="" />
                            </a>
                            <div className="/">
                                <p>Adidas Nemeziz 19.1 FG – Cloud White </p>
                                <div className="gia">1.900.000đ</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="timkiem">
                    <h4> &gt;Xem tất cả sản phẩm&lt;</h4>
                </div>
                <div className="footer">
                    <div className="row">
                        <div className="box">
                            <div className="fb">
                                <h3>Showroom</h3>
                                <div className="sr">
                                    <p>Showroom Đống Đa</p>
                                    Số 2 ngõ 121 Thái Hà, Đống Đa, Hà Nội
                                </div>
                                <div className="sr">
                                    <p>Showroom Hà Đông</p>
                                    Số 129 Nguyễn Viết Xuân, Hà Đông, Hà Nội
                                </div>
                                <div className="sr">
                                    <p>Showroom Hải Phòng</p>
                                    Số 748 Ngô Gia Tự, Hải An, Hải Phòng
                                </div>
                            </div>
                            <div className="yt">
                                <h3>Nhập email nhận voucher giảm giá</h3>
                                <div className="timkiem">
                                    <input type="text" placeholder="Nhập email của bạn" />
                                    <div className="gui">
                                        <a href="">
                                            Gửi{" "}
                                            <div>
                                                <ion-icon name="mail-outline" />
                                            </div>{" "}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="intas">
                                <h3>Link</h3>
                                <div className="huongdan">
                                    <a href="">Hướng dẫn thanh toán</a>{" "}
                                </div>
                                <div className="huongdan">
                                    <a href="">Hướng dẫn đặt hàng</a>
                                </div>
                                <div className="huongdan">
                                    <a href="">Câu hỏi thường gặp</a>
                                </div>
                            </div>
                        </div>
                        <div className="cuoi">© 2013-2020 BẢN QUYỀN THUỘC SOCCERSTORE.VN</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;