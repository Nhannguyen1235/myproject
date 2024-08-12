import React, { useState } from 'react';
import './Login.css'
import Header from '../../ShopWeb/header/Header';
import Footer from '../../ShopWeb/footer/Footer';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const handleLogin = (event) => {
        event.preventDefault();
        // Xử lý đăng nhập tại đây
        // Ví dụ: gọi API để kiểm tra thông tin đăng nhập
        // Nếu thông tin đăng nhập đúng, chuyển hướng đến trang chủ
        // Nếu thông tin đăng nhập sai, hiển thị thông báo lỗi
      };
  return (
    <div className="d-flex flex-column min-vh-100">
    <Header />
    <div className="main-login flex-fill">
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <button type="submit">Đăng nhập</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
    <Footer />
  </div>
  );
}