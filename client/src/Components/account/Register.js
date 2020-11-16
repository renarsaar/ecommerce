import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import api from '../../api';

export default function Register() {
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  // Submit form & register account
  async function handleRegistration(e) {
    e.preventDefault();
    const {
      name, email, password, confirmPassword,
    } = e.target;

    // Check for empty values
    if (!name.value) {
      setNameErr('Please add your name');
      return false;
    }

    if (!email.value && !nameErr) {
      setEmailErr('Please add your Email');
      return false;
    }

    if (!password.value && !nameErr && !emailErr) {
      setPasswordErr('Please choose a password');
      return false;
    }

    // if no errors
    if (!nameErr && !emailErr && !passwordErr) {
      // Check if both passwords match
      if (password.value !== confirmPassword.value) {
        setConfirmPasswordErr('Passwords do not match');
        return false;
      }

      setConfirmPasswordErr('');

      api.post('/account/register', {
        name: name.value,
        email: email.value,
        password: password.value,
      })
        .then((response) => {
          if (response.status === 201) {
            // Success, push to login page
            history.push({ pathname: '/account/login', state: { registerSuccess: true } });
          }
        })
        .catch((error) => setRegistrationMessage(error.response.data));
    }
  }

  // Validate form values
  function handleValidation(e) {
    const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    const nameRegex = /^[a-zA-ZöäüõÖÄÜÕ \-']+$/;
    const { name, value } = e.target;

    if (name === 'name') {
      if (value.length > 0 && value.length < 4) {
        setNameErr('Name must be atleast 4 characters long');
      } else if (value.length >= 4 && !nameRegex.test(value)) {
        setNameErr('Please enter a valid Full Name');
      } else {
        setNameErr('');
      }
    }

    if (name === 'email') {
      if (value.length > 0 && !emailRegex.test(value)) {
        setEmailErr('Invalid Email adress');
      } else {
        setEmailErr('');
      }
    }

    if (name === 'password') {
      if (value.length > 0 && value.length < 8) {
        setPasswordErr('Password must be atleast 8 characters long');
      } else {
        setPasswordErr('');
      }
    }
  }

  return (
    <>
      <h1 className="headline">Register a new Account</h1>

      <button type="button" className="login-google">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" alt="signin-google" />
        <h1>Sign up with Google</h1>
      </button>

      <span>or</span>

      <form onSubmit={handleRegistration}>
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
          className={confirmPasswordErr ? 'input-err' : ''}
          type="password"
          name="confirmPassword"
          onBlur={handleValidation}
        />
        <p className="err mb-1">{confirmPasswordErr}</p>

        <p className="err">{registrationMessage}</p>

        <input type="submit" value="Register" />
      </form>

      <h3>Have an account? <Link to="/account/login">Log in now</Link></h3>
    </>
  );
}
