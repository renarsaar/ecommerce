import React from 'react';
import { Link } from 'react-router-dom';

import ProgressBar from './ProgressBar';

export default function CartSuccess() {
  return (
    <>
      <ProgressBar stepNumber={4} stepInfo="Success" />
      <div className="order-success">
        <h3>Order Created</h3>
        <Link to="/" className="link">Back to Home</Link>
      </div>
    </>
  );
}
