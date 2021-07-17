import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserPassword } from '../../actions/authActions';

export default function ResetPasswordConfirm({ parsedUrlParams }) {
  const dispatch = useDispatch();
  const {
    authLoading, resetPassword, resetPasswordError,
  } = useSelector((state) => state.auth);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // API request to change password
    dispatch(resetUserPassword(parsedUrlParams.token, parsedUrlParams.id, newPassword, confirmNewPassword));
  }

  return (
    <>
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
    </>
  );
}
