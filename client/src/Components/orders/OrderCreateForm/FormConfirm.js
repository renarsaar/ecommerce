import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../actions/orderActions';

import useFormattedCreditCardNumber from '../../Hooks/useFormattedCreditCardNumber';

export default function FormConfirm({ values, formErrors, prevStep }) {
  const dispatch = useDispatch();
  const { loading, createOrderError } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const cartProducts = useSelector((state) => state.cart);
  const [valid, setValid] = useState(true);

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

  // Create a new order
  function handleCreateOrder() {
    const orderValues = {
      products: cartProducts,
      totalPrice: values.totalPrice,
      delivery: values.deliveryMethod === 'Omniva'
        ? `Omniva: ${values.deliveryOmniva}`
        : `Courier: ${values.deliveryCourier}`,
    };

    // Set the name & email to typed or google values
    if ('name' in values) orderValues.user = values.name;
    if (user !== null) orderValues.user = user.name;

    if ('email' in values) orderValues.email = values.email;
    if (user !== null) orderValues.email = user.email;

    dispatch(createOrder(orderValues));
  }

  // Return name in li
  function handleRenderName() {
    if ('name' in values) return values.name;
    if (user !== null) return user.name;

    return '';
  }

  // Return email in li
  function handleRenderEmail() {
    if ('email' in values) return values.email;
    if (user !== null) return user.email;

    return '';
  }

  return (
    <div className="order-create">
      <div className="order-confirm">
        <div className="order-confirm-container">
          <ul>
            <li>Name: <span>{handleRenderName()}</span></li>
            <li>Email: <span>{handleRenderEmail()}</span></li>
            <li>
              Delivery:
              <span className="delivery-address">
                {'deliveryMethod' in values && values.deliveryMethod === 'Omniva' ? values.deliveryOmniva : values.deliveryCourier}
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

          {loading && (
            <div className="loading-container">
              <div className="loading">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          )}

          <div className="card-details">
            <p>Card Holder: {values.cardHolder}</p>
            <p>Card Number: {useFormattedCreditCardNumber(values.cardNumber)}</p>
            <p>CVV Code: {values.cvv}</p>
            <p>Expiry Date: {values.expiryM}/{values.expiryY}</p>
          </div>
        </div>

        {createOrderError && <h3>Error while making an order. Please try again later</h3>}

        <div className="actions">
          <input
            type="submit"
            onClick={prevStep}
            value="Go Back"
          />
          <input
            type="submit"
            onClick={handleCreateOrder}
            value="Confirm &amp; pay"
            style={{ cursor: valid ? 'pointer' : 'not-allowed' }}
            disabled={!valid}
          />
        </div>
      </div>
    </div>
  );
}
