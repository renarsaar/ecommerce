import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../actions/orderActions';
import { logOut } from '../../actions/authActions';
import useRippleButton from '../Hooks/useRippleButton';

import ChangePasswordForm from './ChangePasswordForm';
import DeleteAccountForm from './DeleteAccountForm';

export default function User() {
  const dispatch = useDispatch();
  const { ordersLoading, orders, getOrderError } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false);

  useEffect(() => {
    dispatch(getUserOrders(user.name, 1));
  }, []);

  // Handle order background color based on order status
  function handleOrderBackground(status) {
    if (status === 'Completed') return 'rgba(61, 184, 30, 0.2)';
    if (status === 'Active') return 'rgba(194, 188, 18, 0.2)';
    if (status === 'Cancelled') return 'rgba(213, 13, 13, 0.2)';
    if (status === 'Seen By Admin') return 'rgba(163, 163, 163, 0.2)';
    if (status === 'Recieved') return 'rgba(163, 163, 163, 0.05)';
  }

  // Return user orders
  function handleOrders() {
    if (orders) {
      return orders.map((order) => (
        <Link
          to={`/order/${order._id}`}
          className="order"
          key={order._id}
          style={{
            borderRight: `5px solid #${Math.floor(Math.random() * 16777215).toString(16)}`,
            background: handleOrderBackground(order.status),
          }}
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
          <span>Status: {order.status}</span>
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

    if (getOrderError) {
      return <h5 className="err">Error loading your orders, please try again later</h5>;
    }
  }

  // Handle Change Password Form
  function handleChangePassword(e) {
    useRippleButton(e);

    setShowPasswordForm(!showPasswordForm);
  }

  // Handle Delete Account Form
  function handleDeleteAccount(e) {
    useRippleButton(e);

    setShowDeleteAccountForm(!showDeleteAccountForm);
  }

  // Handle Logging out
  function handleLogOut(e) {
    useRippleButton(e);

    dispatch(logOut());
  }

  return (
    <div className="dashboard">
      <div>
        <div className="account-info">
          <h2>Account Information <i className="las la-user-circle" /></h2>
          <p>{user.name}</p>
          <p>{user.email}</p>
          {!showDeleteAccountForm && (
            <button type="button" className="btn" onClick={handleChangePassword}>
              Change password
            </button>
          )}
          {showPasswordForm && <ChangePasswordForm />}

          {!showPasswordForm && (
            <button type="button" className="btn" onClick={handleDeleteAccount}>
              Delete account
            </button>
          )}
          {showDeleteAccountForm && <DeleteAccountForm />}
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
