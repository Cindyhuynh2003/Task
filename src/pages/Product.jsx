import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTodo, deleteTodo } from '../reduxtool/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebase';
import Logout from '../auth/Logout';
import AuthWrapper from '../auth/AuthWrapper';

function convertTimestampToDateTime(timestamp) {
    // Tạo một đối tượng Date từ timestamp (tính bằng mili giây)
    const dateObj = new Date(timestamp);

    // Lấy thông tin ngày, tháng, năm, giờ, phút, giây từ đối tượng Date
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    // Trả về ngày tháng năm giờ phút giây dưới dạng một chuỗi
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

function formatCurrency(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}


function truncateString(description, maxLength) {
    if (typeof description === 'string' && description.length <= maxLength) {
        return description;
    } else if (typeof description === 'string') {
        return description.substring(0, maxLength) + ' ...';
    } else {
        return '';
    }
}

const Product = () => {
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

    const handleEdit = (id) => {
        navigate('/editpro/' + id)
    }

    const handleDelete = (id) => {
        db.collection('products')
            .doc(id)
            .delete()
            .then(() => {
                dispatch(deleteTodo(id))
                alert('Delete Successfully');
                window.location.reload(); // Tải lại trang sau khi xóa thành công
            })
            .catch(err => console.log(err));
    }

    return (
        <AuthWrapper>
            <div id="page_wrapper">
                <div id="sidenav" className="sidenav">
                    <div className="sidenav_header">
                        <div className="logo_section">
                            <h3>Admin</h3>
                        </div>

                        <Link className="sidenav_link" to="/">
                            <i className="bx bx-tachometer" />
                            <h3>Dashboard</h3>
                        </Link>
                        <Link className="sidenav_link " to="/category">
                            <i className="bx bx-file" />
                            <h3>Category</h3>
                        </Link>
                        <Link className="sidenav_link active " to="/product">
                            <i className="bx bx-folder" />
                            <h3>Product</h3>
                        </Link>
                        <Link className="sidenav_link " to="/user">
                            <i className="bx bx-user" />
                            <h3> User</h3>
                        </Link>

                        <Link className="sidenav_link">
                            <i className="bx bx-calendar" />
                            <h3>Calendar</h3>
                        </Link>
                        <Logout />
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
                <main>
                    <header>
                        <div className="text">
                            <h2 style={{ fontWeight: "600" }}>Products</h2>
                            <p>Overview of products information</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col" width="20%">
                                            ID
                                        </th>
                                        <th scope="col" width="9%">
                                            Image
                                        </th>
                                        <th scope="col" width="13%">
                                            Title
                                        </th>
                                        <th scope="col" width="12%">
                                            Price
                                        </th>
                                        <th scope="col" width="25%">
                                            Description
                                        </th>
                                        <th scope="col" width='15%'>Time</th>
                                        <th scope="col" width="70px">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todos.map(item => (
                                        <tr key={item.id}>
                                            <td data-label="Account">{item.id}</td>
                                            <td data-label="Due Date">
                                                <img src={item.avatarURL} className="tab-img" />
                                            </td>
                                            <td data-label="Due Date"> {item.titlebook} </td>
                                            <td data-label="Amount">{formatCurrency(item.price)}</td>
                                            <td data-label="Amount">{truncateString(item.description, 28)}</td>
                                            <td data-label="Period">
                                                {convertTimestampToDateTime(item.time)}</td>

                                            <td data-label="Period">
                                                <i className="bx bx-pencil" onClick={() => handleEdit(item.id)} />
                                                &nbsp;
                                                <i className="bx bx-trash" onClick={() => handleDelete(item.id)} />
                                                &nbsp;
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                        <Link to='/addpro'>
                            <button id="theme_switch">
                                <i className="bx bx-plus" width="30px" />
                            </button>
                        </Link>
                    </header>
                </main>
            </div>
        </AuthWrapper>
    );
};

export default Product;