import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../actions/orderActions';
import { clearWishlistLS } from '../../actions/wishListActions';
import { logOut } from '../../actions/authActions';
import useRippleButton from '../Hooks/useRippleButton';
import useHandleOrderBackground from '../Hooks/useHandleOrderBackground';

import ChangePasswordForm from './ChangePasswordForm';
import DeleteAccountForm from './DeleteAccountForm';

export default function User() {
  const dispatch = useDispatch();
  const { ordersLoading, orders, getOrderError } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteAccountForm, setShowDeleteAccountForm] = useState(false);

  useEffect(() => {
    dispatch(getUserOrders(user.id, 1, sessionStorage.token));
  }, []);

  // Return user orders
  function handleOrders() {
    if (orders) {
      if (orders.length === 0) {
        return <h2>You haven&apos;t made any orders</h2>;
      }

      return orders.map((order) => (
        <Link
          to={`/order/${order._id}`}
          className="order"
          key={order._id}
          style={{
            borderRight: `5px solid #${Math.floor(Math.random() * 16777215).toString(16)}`,
            background: useHandleOrderBackground(order.status),
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

    dispatch(clearWishlistLS());
    dispatch(logOut());
  }

  return (
    <div className="dashboard container-high">
      <div>
        <div className="account-info mb-3">
          <h2 className="txt-bold mb-1">Account Information <i className="las la-user-circle" /></h2>
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

        <div className="user-orders mb-2">
          <h2 className="txt-bold mb-1">Your orders</h2>
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
