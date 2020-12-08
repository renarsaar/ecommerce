import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import api from '../../api';

export default function Register() {
  const dispatch = useDispatch();
  const { loading, registerError } = useSelector((state) => state.auth);
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Submit form & register account
  async function handleRegistration(e) {
    e.preventDefault();

    const values = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    dispatch(registerUser(values));
  }

  // Register user with Google OAuth2
  function handleOAuth2Request() {
    api.get('/auth/google')
      .then((response) => window.location.href = response.data)
      .catch((err) => console.log(err));
  }

  // Handle client side validation
  function handleValidation(e) {
    const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    const nameRegex = /^[a-zA-ZöäüõÖÄÜÕ \-']+$/;
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        if (value.length > 0 && value.length < 4) {
          setNameErr('Name must be atleast 4 characters long');
        } else if (value.length >= 4 && !nameRegex.test(value)) {
          setNameErr('Please enter a valid Full Name');
        } else {
          setNameErr('');
        }
        break;

      case 'email':
        if (value.length > 0 && !emailRegex.test(value)) {
          setEmailErr('Invalid Email adress');
        } else {
          setEmailErr('');
        }
        break;

      case 'password':
        if (value.length > 0 && value.length < 8) {
          setPasswordErr('Password must be atleast 8 characters long');
        } else {
          setPasswordErr('');
        }
        break;

      default:
        break;
    }
  }

  return (
    <>
      <h1 className="headline">Register a new Account</h1>

      <button
        type="button"
        className="login-google"
        onClick={handleOAuth2Request}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" alt="signin-google" />
        <h1>Sign up with Google</h1>
      </button>

      <span>or</span>

      <form style={{ opacity: loading ? '0.4' : '1' }} onSubmit={handleRegistration}>
        <label htmlFor="name">Name</label>
        <input
          className={nameErr ? 'input-err' : ''}
          type="text"
          name="name"
          onBlur={handleValidation}
        />
        <p className="err mb-1">{nameErr}</p>

        <label htmlFor="email">Email Address</label>
        <input
          className={emailErr ? 'input-err' : ''}
          type="text"
          name="email"
          onBlur={handleValidation}
        />
        <p className="err mb-1">{emailErr}</p>

        <label htmlFor="password">Password</label>
        <input
          className={passwordErr ? 'input-err' : ''}
          type="password"
          name="password"
          onBlur={handleValidation}
        />
        <p className="err mb-1">{passwordErr}</p>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="mb-1"
          type="password"
          name="confirmPassword"
        />

        <p className="err">{registerError}</p>

        <input type="submit" value="Register" />

        {loading && (
          <div className="loading-container">
            <div className="loading">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
      </form>

      <h3>
        Have an account?
        {' '}
        <Link to="/account/login">Log in now</Link>
      </h3>
    </>
  );
}
