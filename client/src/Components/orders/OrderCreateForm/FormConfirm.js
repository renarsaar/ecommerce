import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../actions/orderActions';

export default function FormConfirm({ values, formErrors, prevStep, nextStep }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.orders);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    // Validate forms inputs are filled out
    Object.values(values).forEach((val) => {
      val === '' && (setValid(false));
    });

    // Validate form errors are empty
    Object.values(formErrors).forEach((err) => {
      err !== '' && (setValid(false));
    });

    return () => {
      setValid(false);
    };
  });

  // ?[]?

  return (
    <div className="order-create">
      <div className="order-confirm">
        <ul>
          <li>Name: <span>{values.name}</span></li>
          <li>Email: <span>{values.email}</span></li>
          <li>
            Delivery:
            <span className="delivery-address">
              {values.deliveryMethod === 'Omniva' ? values.deliveryOmniva : values.deliveryCourier}
            </span>
          </li>
          <li>
            Price:
            {' '}
            <span>
              {values.totalPrice}
              &euro;
            </span>
          </li>
        </ul>

        <div className="actions">
          <input type="submit" onClick={prevStep} value="Go Back" />
          <input type="submit" onClick={nextStep} value="Confirm &amp; pay" />
        </div>
      </div>
    </div>
  );
}
