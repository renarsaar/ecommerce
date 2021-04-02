import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateOAuthUser } from '../../actions/authActions';

export default function Validation({ parsedUrlParams }) {
  const dispatch = useDispatch();
  const { authLoading, validateError } = useSelector((state) => state.auth);

  // Submit form & validate account
  async function handleValidation(e) {
    e.preventDefault();

    const values = {
      userId: parsedUrlParams.userId,
      googleId: parsedUrlParams.googleId,
      email: parsedUrlParams.email,
      password: e.target.password.value,
    };

    dispatch(validateOAuthUser(values));
  }

  return (
    <>
      <h1 className="headline">Verify Google Account</h1>
      <p className="headline-description">By verifying your Google account, we will add Log in with Google to your authentication method for accessing your VRA Ecommerce account.</p>

      <form style={{ opacity: authLoading ? '0.4' : '1' }} onSubmit={handleValidation}>
        <label htmlFor="email">Email Address</label>
        <input
          className="mb-1"
          type="text"
          name="email"
          disabled
          placeholder={parsedUrlParams.email}
        />

        <label htmlFor="password">Password</label>
        <input
          className="mb-1"
          type="password"
          name="password"
        />

        <p className="err">{validateError}</p>

        <h3>
          <Link to="/account/login">Cancel, Return to Login</Link>
        </h3>

        <input className="mb-1" type="submit" value="Link My Accounts" />

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
    </>
  );
}
