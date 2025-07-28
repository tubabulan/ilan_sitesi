import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3001/auth/register',
        {
          full_name: username, // Flask backend `full_name` bekliyor olabilir!
          email,
          password,
        },
        {
          withCredentials: true, // CORS sorununu çözmek için gerekli
        }
      );
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Kayıt işlemi başarısız.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Kayıt Ol</h2>
        <input name="username" placeholder="Kullanıcı Adı" value={username} onChange={handleChange} />
        <input name="email" placeholder="Email" value={email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Şifre" value={password} onChange={handleChange} />
        <button type="submit">Kayıt Ol</button>
        <div>{msg}</div>
      </form>
    </div>
  );
}

export default RegisterPage;
