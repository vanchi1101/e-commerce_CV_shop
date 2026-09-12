import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgSign from '../assets/images/userSign.png';
import { FaCheck } from "react-icons/fa6";
import api from "../App.js";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessageU, setErrorMessageU] = useState('');
  const [errorMessageP, setErrorMessageP] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('http://localhost:5000/api/users/signup', {
        username,
        password
      });
      if (response.status === 201) {
        setStatus(response.status);
        console.log(response);
      }
    }
    catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessageU(error.response.data.message);
        setPassword('');
      } else if (error.response && error.response.status === 402) {
        setErrorMessageP(error.response.data.message);
        setPassword('');
      } else {
        alert("Xin lỗi Server có thể đang bị lỗi!");
      }
    }
  }

  const handleBackLogin = () => {
    navigate('/')
  }

  return (
    <div className='Box-LOG'>
      {status === '' &&
        <div className='login'>
          <div className='box-log'>
            <div className='box-imgUser'>
              <img src={imgSign} alt='Photos' />
            </div>
          </div>
          <div className='box-log2'>
            <h2>User Signup</h2>
            <form onSubmit={handleSignup}>
              <input
                type='text'
                placeholder='Username'
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <br />
              {errorMessageU && <small style={{ color: 'red' }}>{errorMessageU}</small>}
              <br />
              <input
                type='password'
                placeholder='Password'
                value={password || ''}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              {errorMessageP && <small style={{ color: 'red' }}>{errorMessageP}</small>}
              <br />
              {/* <button type='submit'>Signup</button> */}
              <button>Signup</button>
              <p>Do you have account? <a href='\'>Login</a></p>
            </form>
          </div>
        </div>
      }

      {
        status === 201 &&
        <div className='login'>
          <div className='box-log'>
            <div className='box-imgUser'>
              <img src={imgSign} alt='Photos' />
            </div>
          </div>
          <div className='box-log2'>
            <h2>Success Signup</h2>
            <div className="circle-success-sign">
              <FaCheck className="icon-checkSign" />
            </div>
            <button onClick={handleBackLogin}>Back to Login</button>
          </div>
        </div>
      }

    </div>
  );

};

export default SignupForm;