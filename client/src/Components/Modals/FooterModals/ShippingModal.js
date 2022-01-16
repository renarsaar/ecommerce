import React from 'react';
import ReactDOM from 'react-dom';

export default function ShippingModal({ showShipping, handleClose }) {
  const modalClassName = showShipping === true ? 'modal-container visible' : 'modal-container hidden';

  return ReactDOM.createPortal(
    <div className={modalClassName} onClick={handleClose}>
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="close-modal">
          <button type="button" onClick={handleClose}>
            X
          </button>
        </div>

        <div className="policy">
          <h1>Return Policy</h1>
          <p className="mb-1">Last updated: December 12, 2021</p>

          <p>
            Thank you for your purchase. We hope you are happy with yous purchase. However, if you are not completely satisfied with you purchase for any reason, you may return it to us for a full refund. Please see below for more information on our return policy.
          </p>

          <h2>Returns</h2>
          <p>All returns must be postmarked with seven(7) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>

          <h2>Return Process</h2>
          <p>To return an item, place the item in its original packaging and include your proof of purchase, and mail your return to the following address:</p>

          <ul>
            <li>VRA</li>
            <li>Attn: Returns</li>
            <li>Narva mnt 5</li>
            <li>Tallinn, Harjumaa 11017</li>
            <li>Estonia</li>
          </ul>

          <p>You may also use the prepaid shipping label enclosed with your package. Return shipping charges will be paid or reimbursed by us.</p>

          <h2>Refunds</h2>
          <p>After receiving your return and inspecting the condition of your ite, we will process your return. Please allow at least seven(7) days from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. we will notify you by email when your return has been processed.</p>

          <h2>Exceptions</h2>
          <p>For defective or damaged product, please contact us at the contact details below or from the contact form on About page to arrange a refund or exchange.</p>

          <h2>Questions</h2>
          <p>If you have any questions concerning our return policy, please contact us at:</p>
          <ul>
            <li>+372 12345678</li>
            <li>vra@info.ee</li>
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById('shipping-returns'),
  );
}
