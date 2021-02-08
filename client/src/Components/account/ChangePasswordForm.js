import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserPassword } from '../../actions/authActions';
import RippleButton from '../Helpers/RippleButton';

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const {
    user, authLoading, changePassword, changePasswordError,
  } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle Change Password
  function handleChangePassword(e) {
    e.preventDefault();

    RippleButton(e);

    const values = {
      oldPassword,
      password,
      confirmPassword,
    };

    dispatch(changeUserPassword(user.id, sessionStorage.token, values));
  }

  // Handle form change and save values
  function handleFormChange(e) {
    if (e.target.name === 'oldPassword') setOldPassword(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
    if (e.target.name === 'confirmNewPassword') setConfirmPassword(e.target.value);
  }

  return (
    <form className="change-password-form" onChange={handleFormChange} style={{ opacity: authLoading ? '0.4' : '1' }}>
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

      <label htmlFor="oldPassword">Old Password</label>
      <input type="password" name="oldPassword" placeholder="Old Password" />

      <label htmlFor="password">New Password</label>
      <input type="password" name="password" placeholder="New Password" />

      <label htmlFor="confirmNewPassword">Confirm New Password</label>
      <input type="password" name="confirmNewPassword" placeholder="Confirm new Password" />

      <p className="err">{changePasswordError}</p>
      <p>{changePassword}</p>

      <button className="btn" type="submit" onClick={handleChangePassword}>Change</button>
    </form>
  );
}
