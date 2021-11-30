import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showFabric, showJournal, showAbout } from '../actions/menuActions';

import TestimonialsModal from './Modals/FooterModals/TestimonialsModal';
import PrivacyPolicyModal from './Modals/FooterModals/PrivacyPolicyModal';
import ProductCare from './Modals/FooterModals/ProductCare';

export default function Footer() {
  const dispatch = useDispatch();
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showProductCare, setShowProductCare] = useState(false);
  const { hideNavigation } = useSelector((state) => state.view);

  // Handle modal opening, closing
  const handleTestimonials = () => setShowTestimonials(!showTestimonials);
  const handlePrivacyPolicy = () => setShowPrivacyPolicy(!showPrivacyPolicy);
  const handleProductCare = () => setShowProductCare(!showProductCare);

  // Do not render on login/register/validation page
  if (hideNavigation) return <></>;

  return (
    <div className="footer">
      <div className="container">
        <ul>
          <h2>Categories</h2>
          <li className="link" onClick={() => dispatch(showFabric())}>Fabric</li>
          <li className="link" onClick={() => dispatch(showJournal())}>Journal</li>
          <li className="link" onClick={() => dispatch(showAbout())}>About us &amp; Contact</li>
          <li className="link" onClick={handleTestimonials}>Testimonials</li>
          <li className="link" onClick={handlePrivacyPolicy}>Privacy Policy</li>
        </ul>
        <ul>
          <h2>Partners</h2>
          <li>Support</li>
          <li>Shipping &amp; Returns</li>
          <li>Size Guide</li>
          <li className="link" onClick={handleProductCare}>Product Care</li>
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

      <TestimonialsModal
        showTestimonials={showTestimonials}
        handleClose={handleTestimonials}
      />

      <PrivacyPolicyModal
        showPrivacyPolicy={showPrivacyPolicy}
        handleClose={handlePrivacyPolicy}
      />

      <ProductCare
        showProductCare={showProductCare}
        handleClose={handleProductCare}
      />

      <h4 className="copyright txt-center">&copy; Copyright Veebirakenduste Arendus {new Date().getFullYear()}</h4>
    </div>
  );
}
