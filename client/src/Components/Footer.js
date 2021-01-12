import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  // Do not render on login/register/validation page
  if (
    location.pathname.includes('/account/login')
    || location.pathname.includes('/account/register')
    || location.pathname.includes('/account/validation')
  ) {
    return <></>;
  }

  return (
    <div className="footer">
      <div className="container">
        <ul>
          <h1>Categories</h1>
          <li>About us</li>
          <li>Testimonials</li>
          <li>Contact</li>
          <li>Journal</li>
          <li>Privacy Policy</li>
        </ul>
        <ul>
          <h1>Partners</h1>
          <li>Support</li>
          <li>Shipping &amp; Returns</li>
          <li>Size Guide</li>
          <li>Product Care</li>
        </ul>
        <ul>
          <h1>Contact us</h1>
          <li>Narva Maantee 5</li>
          <li>10117 Tallinn</li>
          <li>+372 12345678</li>
        </ul>
        <div className="newsletter">
          <h1>Subscribe to newsletter</h1>
          <form>
            <input type="text" placeholder="ENTER YOUR EMAIL" />
            <button type="submit">Subscribe</button>
          </form>
          <div className="socials">
            <a href="https://facebook.com">
              <i className="lab la-facebook-f" />
            </a>
            <a href="https://twitter.com">
              <i className="lab la-twitter" />
            </a>
            <a href="https://instagram.com">
              <i className="lab la-instagram" />
            </a>
            <a href="https://youtube.com">
              <i className="lab la-youtube" />
            </a>
          </div>
        </div>
      </div>
      <h1 className="copyright">&copy; Copyright Veebirakenduste Arendus {new Date().getFullYear()}</h1>
    </div>
  );
}
