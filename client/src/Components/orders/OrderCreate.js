import React from 'react';

import ProgressBar from './OrderCreateForm/ProgressBar';
import FormCartProducts from './OrderCreateForm/FormCartProducts';
import FormPersonalDetails from './OrderCreateForm/FormPersonalDetails';
import FormConfirm from './OrderCreateForm/FormConfirm';

export default class OrderCreate extends React.Component {
  state = {
    step: 1,
    totalPrice: 0,
    deliveryMethod: '',
    deliveryOmniva: 'Abja Coop Konsumi pakiautomaat',
    cardHolder: '',
    cardNumber: '',
    expiryM: '',
    expiryY: '',
    cvv: '',
    formErrors: { name: '', email: '', deliveryMethod: '', deliveryCourier: '', cardHolder: '', cardNumber: '', expiryM: '', expiryY: '', cvv: '' },
  };

  // Clear Form Step
  componentWillUnmount() {
    this.setState({ step: 1 });
  }

  // Proceed to next Step
  nextStep = (e) => {
    e.preventDefault();
    const { step } = this.state;

    this.setState({ step: step + 1 });
  };

  // Go back to previous Step
  prevStep = (e) => {
    e.preventDefault();
    const { step } = this.state;

    this.setState({ step: step - 1 });
  };

  // Handle form fields change
  handleChange = (e) => {
    let { name, value } = e.target;

    // Validate expiry month
    if (name === 'expiryM') {
      const firstNum = value.split('')[0];

      if (value > 12) {
        value = firstNum;
      }
    }

    if (name === 'expiryY') {
      const currYear = new Date().getFullYear();

      if (value.length === 4 && value < currYear) {
        value = currYear;
      }
    }

    if (name === 'cardNumber' || name === 'expiryM' || name === 'expiryY' || name === 'cvv') {
      // Clear non digits
      if (typeof value !== 'number') {
        value = value.replace(/\D/g, '');
      }
    }

    this.setState({ [name]: value });
  };

  // Handle cart total price
  handleCartTotalPrice = (totalPrice) => {
    this.setState({ totalPrice });
  }

  // Handle form validation
  handleValidation = (e) => {
    const { name, value } = e.target;
    const { formErrors } = this.state;

    const nameRegex = /^[a-zA-Z öäüõÖÄÜÕ]+$/;
    const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    const cardNumberRegex = /[0-9 ]{18}/;
    const expiryMRegex = /[0-9]{2}/;
    const expiryYRegex = /[0-9]{4}/;
    const cvvRegex = /[0-9]{3,4}/;

    switch (name) {
      case 'name':
        formErrors.name = '';

        if (value.length > 0 && value.length < 3) {
          formErrors.name = 'Name must be atleast 3 characters.';
        }

        if (value.length > 3 && !nameRegex.test(value)) {
          formErrors.name = 'Invalid name';
        }

        break;

      case 'email':
        formErrors.email = '';

        if (value.length > 0 && !emailRegex.test(value)) {
          formErrors.email = 'Invalid Email address';
        }

        break;

      case 'cardHolder':
        formErrors.cardHolder = '';

        if (value.length > 0 && !nameRegex.test(value)) {
          formErrors.cardHolder = 'Invalid name';
        }

        break;

      case 'cardNumber':
        formErrors.cardNumber = '';

        if (value.length > 0 && !cardNumberRegex.test(value)) {
          formErrors.cardNumber = 'Invalid Card number';
        }

        break;

      case 'expiryM':
        formErrors.expiryM = '';

        if (value.length > 0 && !expiryMRegex.test(value)) {
          formErrors.expiryM = 'Invalid expiry date';
        }

        break;

      case 'expiryY':
        formErrors.expiryY = '';

        if (value.lenght > 0 && !expiryYRegex.test(value)) {
          formErrors.expiryY = 'Invalid expiry date';
        }

        break;

      case 'cvv':
        formErrors.cvv = '';

        if (value.length > 0 && !cvvRegex.test(value)) {
          formErrors.cvv = 'Invalid cvv code';
        }

        break;

      default:
        break;
    }

    this.setState({ formErrors });
  };

  render() {
    const { step, formErrors, ...values } = this.state;

    switch (step) {
      case 1:
        return (
          <>
            <ProgressBar stepNumber={1} stepInfo="Products" />
            <FormCartProducts
              nextStep={this.nextStep}
              values={values}
              handleCartTotalPrice={this.handleCartTotalPrice}
            />
          </>
        );

      case 2:
        return (
          <>
            <ProgressBar stepNumber={2} stepInfo="Details" />
            <FormPersonalDetails
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              handleValidation={this.handleValidation}
              values={values}
              formErrors={formErrors}
            />
          </>
        );

      case 3:
        return (
          <>
            <ProgressBar stepNumber={3} stepInfo="Confirm" />
            <FormConfirm
              prevStep={this.prevStep}
              values={values}
              formErrors={formErrors}
            />
          </>
        );

      default:
        break;
    }
  }
}
