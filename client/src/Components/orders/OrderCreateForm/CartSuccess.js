import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../../actions/cartActions';
import ProgressBar from './ProgressBar';

export default function CartSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <>
      <ProgressBar stepNumber={4} stepInfo="Success" />
      <div className="order-success container-high">
        <h3 className="mb-1">Order Created</h3>
        <Link to="/" className="link">Back to Home</Link>
      </div>
    </>
  );
}
