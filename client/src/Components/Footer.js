import React from 'react';

export default function Footer() {
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
      <h1 className="copyright">&copy; Copyright Veebirakenduste Arendus 2020</h1>
    </div>
  );
}
