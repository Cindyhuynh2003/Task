import React, { useEffect, useState } from 'react';
import './LoginFrom.css'
import { Link, useNavigate } from 'react-router-dom';
import firebase from '../firebase';

const LoginFrom = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()


  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Xử lý sau khi đăng nhập thành công
        navigate('/')
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        alert('Đăng nhập thất bại')
      });
  };


  // const handleGoogleLogin = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       // Đăng nhập thành công
  //       navigate('/todo')
  //       // const user = result.user;
  //       // console.log(user);
  //     })
  //     .catch((error) => {
  //       // Xảy ra lỗi khi đăng nhập
  //       alert(error);
  //     });
  // }


  return (
    <div className='body1'>
      <div className="wrapper">
        <form action="#" onSubmit={handleLogin}>
          <h2 style={{color:'white'}}>Login</h2>
          <div className="input-field">
            <input
              type="email"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Enter your password</label>
          </div>
          <button type="submit"> Log In</button>
          <div className="register">
            <p>
              Don't have an account?
              <Link to="/signup">
                <em style={{ paddingLeft: "7px" }}>
                  Register
                </em>
              </Link>
            </p>
          </div>
        </form>
      </div>

    </div>
  );
};

export default LoginFrom;