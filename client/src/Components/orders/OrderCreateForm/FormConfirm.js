import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../actions/orderActions';

import useFormattedCreditCardNumber from '../../Hooks/useFormattedCreditCardNumber';

export default function FormConfirm({ values, formErrors, prevStep }) {
  const dispatch = useDispatch();
  const { ordersLoading, createOrderError } = useSelector((state) => state.orders);
  const cartProducts = useSelector((state) => state.cart);
  const [valid, setValid] = useState(true);
  const [orderValues, setOrderValues] = useState({});

  useEffect(() => {
    setOrderValues({
      name: values.name,
      email: values.email,
      userId: values.userId,
      products: cartProducts,
      totalPrice: values.totalPrice,
      delivery: values.deliveryMethod === 'Omniva'
        ? `Omniva: ${values.deliveryOmniva}`
        : `Courier: ${values.deliveryCourier}`,
    });
  }, []);

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
  }, []);

  return (
    <div className="order-create container">
      <div className="order-confirm">
        <div className="order-confirm-container">
          <ul>
            <li>Name: <span>{orderValues.name}</span></li>
            <li>Email: <span>{orderValues.email}</span></li>
            <li>
              Delivery:
              <span className="delivery-address">
                {orderValues.delivery}
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

          {ordersLoading && (
            <div className="loading-container">
              <div className="loading">
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          )}

          <ul>
            <li>Card Holder: {values.cardHolder}</li>
            <li>Card Number: {useFormattedCreditCardNumber(values.cardNumber)}</li>
            <li>CVV Code: {values.cvv}</li>
            <li>Expiry Date: {values.expiryM}/{values.expiryY}</li>
          </ul>
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
            onClick={() => dispatch(createOrder(orderValues))}
            value="Confirm &amp; pay"
            style={{ cursor: valid ? 'pointer' : 'not-allowed' }}
            disabled={!valid}
          />
        </div>
      </div>
    </div>
  );
}
