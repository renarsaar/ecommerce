import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { passwordResetLink, clearAuthReducer } from '../../actions/authActions';
import { switchNavigation } from '../../actions/viewActions';

import AccountLogo from './AccountLogo';
import AccountSplashScreen from './AccountSplashScreen';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const {
    authLoading, recievePasswordResetLink, recievePasswordResetLinkError,
  } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');

  // Hide header & footer components
  useEffect(() => {
    dispatch(switchNavigation(true));
    return () => {
      dispatch(switchNavigation(false));
    };
  }, []);

  // Clear reset password messages
  useEffect(() => () => {
    dispatch(clearAuthReducer());
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // API request to send link to email
    dispatch(passwordResetLink(email));
  }

  return (
    <div className="account flex">
      <div className="account-container">
        <AccountLogo />

        <h2 className="headline mb-2">Forgot your password?</h2>
        <h4>We&apos;ll send a recovery link to</h4>

        <form style={{ opacity: authLoading ? '0.4' : '1' }}>
          <input
            className="mb-1"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
          />

          {recievePasswordResetLink
            ? <p className="success-container mb-1">{recievePasswordResetLink}</p>
            : ''}

          {recievePasswordResetLinkError
            ? <p className="error-container mb-1">{recievePasswordResetLinkError}</p>
            : ''}

          <input
            type="submit"
            value="Send recovery link"
            onClick={(e) => handleSubmit(e)}
          />

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
          <Link to="/account/login">Return to log in</Link>
        </h4>
      </div>

      <AccountSplashScreen />
    </div>
  );
}
