import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../actions/authActions';
import useRippleButton from '../Hooks/useRippleButton';

export default function DeleteAccountForm() {
  const dispatch = useDispatch();
  const {
    user, authLoading, deleteAccountError,
  } = useSelector((state) => state.auth);

  // Submit & Delete account
  function handleDeleteAccount(e) {
    e.preventDefault();

    useRippleButton(e);

    dispatch(deleteAccount(user.id, sessionStorage.token));
  }

  return (
    <form className="delete-account-form" style={{ opacity: authLoading ? '0.4' : '1' }}>
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

      <h3>Are you sure you want to delete your account?</h3>

      <p className="err">{deleteAccountError}</p>
      <button className="btn" type="submit" onClick={handleDeleteAccount}>Delete</button>
    </form>
  );
}
