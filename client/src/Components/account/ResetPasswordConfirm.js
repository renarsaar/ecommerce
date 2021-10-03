import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserPassword, clearAuthReducer } from '../../actions/authActions';
import { switchNavigation } from '../../actions/viewActions';

import AccountLogo from './AccountLogo';
import AccountSplashScreen from './AccountSplashScreen';

export default function ResetPasswordConfirm({ locationProps }) {
  const dispatch = useDispatch();
  const urlParams = queryString.parse(locationProps.search);
  const { id, token } = urlParams;
  const {
    authLoading, resetPassword, resetPasswordError,
  } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Hide header & footer components
  useEffect(() => {
    dispatch(switchNavigation(true));

    return () => {
      dispatch(switchNavigation(false));

      // Clear reset password messages
      dispatch(clearAuthReducer());
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    // API request to change password
    dispatch(
      resetUserPassword(token, id, newPassword, confirmNewPassword),
    );
  }

  return (
    <div className="account flex">
      <div className="account-container">
        <AccountLogo />

        <h2 className="headline mb-2">Reset your password?</h2>
        <h4>Enter and confirm your new password.</h4>

        <form>
          <input
            className="mb-1"
            type="password"
            name="password"
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="mb-1"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          {resetPassword
            ? <p className="success-container mb-1">{resetPassword}</p>
            : ''}

          {resetPasswordError
            ? <p className="error-container mb-1">{resetPasswordError}</p>
            : ''}

          <input
            type="submit"
            value="Reset my password"
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

      </div>

      <AccountSplashScreen />
    </div>
  );
}
