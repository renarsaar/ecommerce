import React from 'react';
import { Link } from 'react-router-dom';

export default function LogIn() {
  return (
    <>
      <h1 className="headline">Log in to your account</h1>

      <button type="button" className="login-google">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1004px-Google_%22G%22_Logo.svg.png" />
        <h1>Log in with Google</h1>
      </button>

      <span>or</span>

      <form>
        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <input type="submit" value="Login" />
      </form>

      <h3>Don't have an account? <Link to="/account/register">Sign Up</Link></h3>
      <h3>Forgot your password?</h3>
    </>
  );
}
