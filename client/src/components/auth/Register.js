import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { error, register, clearErrors } = authContext;

  useEffect(() => {
    if (error === "User already exists") {
      setAlert('danger', error);
      clearErrors();
    }
  }, [error]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('danger', "All fields required");
      return;
    }
    if (password !== password2) {
      setAlert('danger', "Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setAlert('danger', "Password too short, at least 6 characters required");
      return;
    }
    register({
      name,
      email,
      password
    });
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            name="name" 
            value={ name } 
            onChange={ handleChange } 
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input 
            type="password" 
            name="password2" 
            value={ password2 } 
            onChange={ handleChange } 
            required
          />
        </div>
        <input 
          type="submit" 
          className="btn btn-primary btn-block"
          value="register"
        />
      </form>
    </div>
  )
};

export default Register;
