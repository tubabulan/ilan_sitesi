import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/auth/login', { email, password });
      setMsg(res.data.message);
      // Giriş başarılıysa yönlendirme yapılabilir
    } catch (err) {
      setMsg(err.response?.data?.message || 'Giriş hatası oluştu.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Giriş Yap</h2>
        <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
        <div>{msg}</div>
      </form>
    </div>
  );
}

export default LoginPage;
