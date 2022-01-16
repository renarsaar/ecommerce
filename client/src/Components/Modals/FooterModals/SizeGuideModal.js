import React from 'react';
import ReactDOM from 'react-dom';

export default function SizeGuideModal({ showSizeGuide, handleClose }) {
  const modalClassName = showSizeGuide === true ? 'modal-container visible' : 'modal-container hidden';

  return ReactDOM.createPortal(
    <div className={modalClassName} onClick={handleClose}>
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="close-modal">
          <button type="button" onClick={handleClose}>
            X
          </button>
        </div>

        <div className="size-guide">
          <h1 className="headline mb-2">Size Guide</h1>
          <p className="headline-text">
            Below you can find our general size guide. For item specific measurements, please contact our customer service team at info@vra.ee
          </p>

          <h2>Size guide - men</h2>
          <p>All measurements are in cm.</p>

          <img src="https://makia.com/wp-content/uploads/2019/01/Untitled-3.001.jpeg" alt="size chart" />

          <h2>Size guide - women</h2>
          <p>All measurements are in cm.</p>

          <img src="https://makia.com/wp-content/uploads/2019/01/Untitled-3.002.jpeg" alt="size chart" />

          <div className="line" />
        </div>
      </div>
    </div>,
    document.getElementById('size-guide'),
  );
}
