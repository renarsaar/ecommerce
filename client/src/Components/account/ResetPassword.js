import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { passwordResetLink } from '../../actions/authActions';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const {
    authLoading, recievePasswordResetLink, recievePasswordResetLinkError,
  } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // API request to send link to email
    dispatch(passwordResetLink(email));
  }

  return (
    <>
      <h2 className="headline mb-2">Forgot your password?</h2>
      <h4>We'll send a recovery link to</h4>

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
    </>
  );
}
