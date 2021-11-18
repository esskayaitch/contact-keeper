import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // user is already logged in, re-direct to home page
      navigate('/');
    }

    // check message text from auth.js
    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const { email, password } = user;

  // update respective fields on change
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  // and Submit...
  const onSubmit = e => {
    e.preventDefault();
    // check fields
    if (email === '' || password === '') {
      setAlert('Please fill in all fields');
    } else {
      login({ email, password });
    }

    // console.log('Login Submit');
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />{' '}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />{' '}
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  );
};

export default Login;
