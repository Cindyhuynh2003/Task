import React, { useEffect, useState } from 'react';
import './LoginFrom.css'
import { useNavigate } from 'react-router-dom';
import firebase from '../firebase';

const RegistrationForm = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Xử lý sau khi đăng kí thành công
        navigate('/')
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('Địa chỉ email đã được sử dụng bởi một tài khoản khác.');
            break;
          case 'auth/invalid-email':
            setError('Địa chỉ email không đúng định dạng.');
            break;
          case 'auth/weak-password':
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            break;
          default:
            setError('Đã xảy ra lỗi khi đăng kí. Vui lòng thử lại sau.');
            break;
        }
      });
  }


  return (
    <div className='body1'>
      <div className="wrapper">
        <form action="#">
          <h2>Sign Up</h2>
          <div className="input-field">
            <input
              type="email"
              required=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Your email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              required=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Your password</label>
          </div>
          <button type="submit" onClick={handleRegister}>Create</button>
          <div className="register">
            <p style={{ color: 'red' }}>
              {error}
            </p>
          </div>
        </form>
      </div>

    </div>
  );
};

export default RegistrationForm;