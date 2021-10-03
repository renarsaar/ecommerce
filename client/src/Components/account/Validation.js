import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateOAuthUser } from '../../actions/authActions';
import { switchNavigation } from '../../actions/viewActions';

import AccountLogo from './AccountLogo';
import AccountSplashScreen from './AccountSplashScreen';

export default function Validation({ locationProps }) {
  const dispatch = useDispatch();
  const { authLoading, validateError } = useSelector((state) => state.auth);
  const url = queryString.parse(locationProps.search);
  const { userId, googleId, email } = url;

  // Hide header & footer components
  useEffect(() => {
    dispatch(switchNavigation(true));

    return () => {
      dispatch(switchNavigation(false));
    };
  }, []);

  // Submit form & validate account
  async function handleValidation(e) {
    e.preventDefault();
    const { password } = e.target;

    const values = {
      userId,
      googleId,
      email,
      password: password.value,
    };

    dispatch(validateOAuthUser(values));
  }

  return (
    <div className="account flex">
      <div className="account-container">
        <AccountLogo />
        <h1 className="headline mb-1">Verify Google Account</h1>
        <p className="headline-description mb-2">
          By verifying your Google account,we will add Log in with Google
          to your authentication method for accessing your VRA Ecommerce account.
        </p>

        <form style={{ opacity: authLoading ? '0.4' : '1' }} onSubmit={handleValidation}>
          <label htmlFor="email">Email Address</label>
          <input
            className="mb-1"
            type="text"
            name="email"
            disabled
            placeholder={email}
          />

          <label htmlFor="password">Password</label>
          <input
            className="mb-1"
            type="password"
            name="password"
          />

          <p className="err">{validateError}</p>

          <h4>
            <Link to="/account/login">Cancel, Return to Login</Link>
          </h4>

          <input className="mb-2" type="submit" value="Link My Accounts" />

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

      </div>

      <AccountSplashScreen />
    </div>
  );
}
