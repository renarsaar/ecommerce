import React from 'react';
import { useSelector } from 'react-redux';

export default function Footer() {
  const { hideNavigation } = useSelector((state) => state.view);

  // Do not render on login/register/validation page
  if (hideNavigation) return <></>;

  return (
    <div className="footer">
      <div className="container">
        <ul>
          <h2>Categories</h2>
          <li>About us</li>
          <li>Testimonials</li>
          <li>Contact</li>
          <li>Journal</li>
          <li>Privacy Policy</li>
        </ul>
        <ul>
          <h2>Partners</h2>
          <li>Support</li>
          <li>Shipping &amp; Returns</li>
          <li>Size Guide</li>
          <li>Product Care</li>
        </ul>
        <ul>
          <h2>Contact us</h2>
          <li>Narva Maantee 5</li>
          <li>10117 Tallinn</li>
          <li>+372 12345678</li>
        </ul>

        <div className="newsletter">
          <h2>Subscribe to newsletter</h2>
          <form>
            <input type="text" placeholder="ENTER YOUR EMAIL" />
            <button type="submit">Subscribe</button>
          </form>

          <div className="socials mt-1">
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

      <h4 className="copyright txt-center">&copy; Copyright Veebirakenduste Arendus {new Date().getFullYear()}</h4>
    </div>
  );
}
