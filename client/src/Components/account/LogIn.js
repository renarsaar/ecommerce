import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../actions/authActions';
import api from '../../api';

export default function LogIn() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [logInMessage, setLogInMessage] = useState('');
  const { authLoading, logInError } = useSelector((state) => state.auth);

  // Log user in
  async function handleLogIn(e) {
    e.preventDefault();

    const values = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    if (values.email === '' || values.password === '') {
      setLogInMessage('Please fill in all fields');
    } else {
      setLogInMessage('');
      dispatch(logIn(values));
    }
  }

  // Log user in with Google OAuth2
  function handleOAuth2Request() {
    api.get('/auth/google')
      .then((response) => window.location.href = response.data)
      .catch((err) => console.log(err));
  }

  return (
    <>
      <h2 className="headline mb-2">Log in to your account</h2>

      <button type="button" className="google-btn" onClick={handleOAuth2Request}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" alt="login-google" />
        <h3>Log in with Google</h3>
      </button>

      <span>or</span>

      {location.state && (
        <div className="success-container">
          Account created, you may log in now with your Email Address
        </div>
      )}

      <form style={{ opacity: authLoading ? '0.4' : '1' }} onSubmit={handleLogIn}>
        <label htmlFor="email">Email Address</label>
        <input className="mb-1" type="text" name="email" />

        <label htmlFor="password">Password</label>
        <input className="mb-1" type="password" name="password" />

        {logInMessage || logInError
          ? <p className="error-container mb-1">{logInMessage || logInError}</p>
          : ''}

        <input type="submit" value="Login" />

        {authLoading && (
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

      <h4>
        Don&apos;t have an account?
        {' '}
        <Link to="/account/register">Sign Up</Link>
      </h4>
      <h4>
        <Link to="/account/resetpassword">Forgot your password?</Link>
      </h4>
    </>
  );
}
