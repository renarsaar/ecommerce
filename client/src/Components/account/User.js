import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../actions/orderActions';
import { logOut } from '../../actions/authActions';
import RippleButton from '../Helpers/RippleButton';

import ChangePasswordForm from './ChangePasswordForm';

export default function User() {
  const dispatch = useDispatch();
  const { ordersLoading, orders, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  // const dateOptions = {
  //   year: 'numeric', month: 'long', day: 'numeric',
  // };
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    dispatch(getUserOrders(user.name, 1));
  }, []);

  // Return user orders
  function handleOrders() {
    if (orders) {
      return orders.map((order) => (
        <Link
          to={`/order/${order._id}`}
          className="order"
          key={order._id}
          style={{ borderRight: `5px solid #${Math.floor(Math.random() * 16777215).toString(16)}` }}
        >
          <p>
            {'Order '}
            <span>{order._id}</span>
            {' made at '}
            <span>{new Date(order.date).toLocaleDateString('en-GB')}</span>
            <span>
              {'. Price: '}
              {`${order.totalPrice}€`}
            </span>
          </p>
        </Link>
      ));
    }

    if (ordersLoading) {
      return (
        <div className="loading-container">
          <div className="loading">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }

    if (error) {
      return <h5 className="err">Error loading your orders, please try again later</h5>;
    }
  }

  // Handle Change Password
  function handleChangePassword(e) {
    RippleButton(e);

    setShowPasswordForm(!showPasswordForm);
  }

  // Handle Logging out
  function handleLogOut(e) {
    RippleButton(e);

    dispatch(logOut());
  }

  return (
    <div className="dashboard">
      <div>
        <div className="account-info">
          <h2>Account Information <i className="las la-user-circle" /></h2>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button type="button" className="btn" onClick={handleChangePassword}>
            Change password
          </button>
          {showPasswordForm && <ChangePasswordForm />}
        </div>

        <div className="user-orders">
          <h2>Your orders</h2>
          {handleOrders()}
        </div>
      </div>

      <button type="button" className="btn log-out" onClick={handleLogOut}>
        Log out
        <i className="las la-sign-out-alt" />
      </button>
    </div>
  );
}
