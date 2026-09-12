import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgUser from '../assets/images/user.png'
import axios from 'axios';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/users`, {
        username,
        password
      });
      const resAdmin = await api.get(`/api/users/manage-admin`)
      console.log(resAdmin.data);
      const admin = resAdmin.data.find((ad) =>
        ad.adminname === username && ad.password === password
      )
      console.log(admin);

      if (response.status === 200) {
        navigate('/home');
      } else if (response.status === 201) {
        navigate(`/admin`);
      }
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        setPassword('');
      } else {
        alert("Xin lỗi Server có thể đang bị lỗi!")
      }
    }
  };

  return (
    <div className='Box-LOG'>
      <div className='login'>
        <div className='box-log'>
          <div className='box-imgUser'>
            <img src={imgUser} alt='Photos' />
          </div>
        </div>
        <div className='box-log2'>
          <h2>User Login</h2>
          <form onSubmit={handleLogin}>

            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ borderColor: errorMessage ? 'red' : '' }}
            /><br />
            {errorMessage && <small style={{ color: 'red' }}>{errorMessage}</small>}
            <br />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: errorMessage ? 'red' : '' }}
            /><br />
            {errorMessage && <small style={{ color: 'red' }}>{errorMessage}</small>}
            <br />
            <button type='submit'>Login</button>
            <p>Do you have account? <a href='/signup'>Signup</a></p>
          </form>
        </div>
      </div>
    </div>
  );

};

export default LoginForm;