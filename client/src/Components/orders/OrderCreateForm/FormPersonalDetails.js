import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParcelTerminals } from '../../../actions/orderActions';

export default function FormPersonalDetails({
  values, formErrors, prevStep, nextStep, handleChange, handleValidation,
}) {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { terminals, error } = useSelector((state) => state.orders);

  // Get Omniva parcel terminal locations
  useEffect(() => {
    dispatch(fetchParcelTerminals());
  }, []);

  function renderDeliveryMethod() {
    if (values.deliveryMethod === 'Omniva' && error) {
      return (
        <h3>Error, please try another delivery method</h3>
      );
    }

    if (values.deliveryMethod === 'Omniva') {
      return (
        <div className="omniva">
          <label htmlFor="deliveryOmniva">Choose Omniva parcel location</label>
          <select value={values.deliveryOmniva} name="deliveryOmniva" onChange={handleChange}>
            {terminals && terminals
              .filter((terminal) => terminal.TYPE === '0' && terminal.A0_NAME === 'EE')
              .map((terminal) => (
                <option
                  key={terminal.NAME}
                >
                  {terminal.NAME}
                </option>
              ))}
          </select>
        </div>
      );
    }

    if (values.deliveryMethod === 'Courier') {
      return (
        <div className="courier">
          <label htmlFor="deliveryAddress">
            Delivery Address
            <p className="err">{formErrors.deliveryCourier}</p>
          </label>
          <input
            type="text"
            name="deliveryCourier"
            value={values.deliveryCourier}
            onChange={handleChange}
            onBlur={handleValidation}
            className={formErrors.deliveryCourier ? 'input-err' : ''}
          />
        </div>
      );
    }

    return false;
  }

  // Return formatted credit card number
  function handleCreditCardFormat(cardNumber) {
    let formattedCardNumber = '';

    // Add spaces between every 4th number
    for (let i = 0; i < cardNumber.length; i++) {
      if (i % 4 === 0 && i > 0) formattedCardNumber = formattedCardNumber.concat(' ');
      formattedCardNumber = formattedCardNumber.concat(cardNumber[i]);
    }

    return formattedCardNumber;
  }

  return (
    <div className="order-create">
      <form className="personal-details">
        <div className="form-container">
          <div className="row">
            <label htmlFor="name">
              Name
              <p className="err">{formErrors.name}</p>
            </label>
            <input
              type="text"
              name="name"
              className={formErrors.name ? 'input-err' : ''}
              value={values.name}
              onChange={handleChange}
              onBlur={handleValidation}
              disabled={!!isLoggedIn}
              placeholder={user ? user.name : ''}
            />

            <label htmlFor="email">
              Email
              <p className="err">{formErrors.email}</p>
            </label>
            <input
              type="email"
              name="email"
              className={formErrors.email ? 'input-err' : ''}
              autoComplete="on"
              value={values.email}
              onChange={handleChange}
              onBlur={handleValidation}
              disabled={!!isLoggedIn}
              placeholder={user ? user.email : ''}
            />

            <h4>Choose a delivery method</h4>
            <div className="delivery-method">
              <label htmlFor="Omniva">
                <input
                  type="radio"
                  name="deliveryMethod"
                  onChange={handleChange}
                  onBlur={handleValidation}
                  value="Omniva"
                  checked={values.deliveryMethod === 'Omniva' ? true : false}
                />
                Omniva parcel
                <span className="checkmark" />
              </label>

              <label htmlFor="Courier">
                <input
                  type="radio"
                  name="deliveryMethod"
                  onChange={handleChange}
                  onBlur={handleValidation}
                  checked={values.deliveryMethod === 'Courier' ? true : false}
                  value="Courier"
                />
                Courier
                <span className="checkmark" />
              </label>
            </div>

            {renderDeliveryMethod()}
          </div>

          <div className="row">
            <label htmlFor="cardHolder">
              Cardholder Name
              <p className="err">{formErrors.cardHolder}</p>
            </label>
            <input
              type="text"
              name="cardHolder"
              className={formErrors.cardHolder ? 'input-err' : ''}
              value={values.cardHolder}
              placeholder="e.g. John Doe"
              onChange={handleChange}
              onBlur={handleValidation}
            />

            <label htmlFor="cardNumber">
              Card Number
              <p className="err">{formErrors.cardNumber}</p>
            </label>
            <input
              type="text"
              name="cardNumber"
              className={formErrors.cardNumber ? 'input-err' : ''}
              value={handleCreditCardFormat(values.cardNumber)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
              maxLength="19"
              onChange={handleChange}
              onBlur={handleValidation}
            />

            <label htmlFor="expiry">
              Expiry
              <p className="err">{formErrors.expiryM}</p>
              <p className="err">{formErrors.expiryY}</p>
            </label>
            <div className="expiry">
              <input
                type="tel"
                name="expiryM"
                className={formErrors.expiryM ? 'input-err' : ''}
                value={values.expiryM}
                placeholder="MM"
                maxLength="2"
                onChange={handleChange}
                onBlur={handleValidation}
              />
              <input
                type="tel"
                name="expiryY"
                className={formErrors.expiryY ? 'input-err' : ''}
                value={values.expiryY}
                placeholder="YYYY"
                maxLength="4"
                onChange={handleChange}
                onBlur={handleValidation}
              />
            </div>

            <label htmlFor="cvv">CVV/CVC</label>
            <input
              type="text"
              name="cvv"
              className={formErrors.cvv ? 'input-err' : ''}
              value={values.cvv}
              placeholder="CVV/CVC"
              maxLength="4"
              onChange={handleChange}
              onBlur={handleValidation}
            />
          </div>
        </div>

        <div className="actions">
          <input type="submit" onClick={prevStep} value="Go Back" />
          <input type="submit" onClick={nextStep} value="Proceed" />
        </div>
      </form>
    </div>
  );
}
