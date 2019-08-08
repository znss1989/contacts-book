import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  
  const authContext = useContext(AuthContext);
  const { error, isAuthenticated, login, clearErrors } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === "Invalid credentials") {
      setAlert('danger', error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (email === '' || password === '') {
      setAlert('danger', "All fields required");
      return;
    }
    login({
      email,
      password
    });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={ email } 
            onChange={ handleChange } 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            value={ password } 
            onChange={ handleChange } 
            required
          />
        </div>
        <input 
          type="submit" 
          className="btn btn-primary btn-block"
          value="login"
        />
      </form>
    </div>
  )
};

export default Login;
