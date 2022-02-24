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
      <ProgressBar step={4} />
      <div className="order-success container-high">
        <h1 className="mb-3 orange">Order Created</h1>

        <button type="button" className="btn">
          <Link to="/" className="link btn">Back to Home</Link>
        </button>
      </div>
    </>
  );
}
