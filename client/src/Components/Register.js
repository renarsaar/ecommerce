import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  console.log(props)
  return (
    <>
      <h1 className="headline">Register a new Account</h1>

      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />

        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <input type="submit" value="Register" />
      </form>

      <h3>Have an account? <Link to="/account/login">Log in now</Link></h3>
    </>
  );
}
