import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../../actions/orderActions';
import { logOut } from '../../actions/authActions';
import RippleButton from '../Helpers/RippleButton';

import ChangePasswordForm from './ChangePasswordForm';

export default function Admin() {
  const dispatch = useDispatch();
  const {
    ordersLoading, orders, next, previous, error,
  } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    dispatch(getOrders(1));
  }, []);

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
            background: order.isSeen ? 'rgba(163, 163, 163, 0.2)' : 'rgba(163, 163, 163, 0.05)',
          }}
        >
          <p style={{ fontWeight: order.isSeen ? '400' : '700' }}>
            {'Order '}
            <span>{order._id}</span>
            {' from '}
            <span>{order.user}</span>
            {' at '}
            <span>{new Date(order.date).toLocaleDateString('en-GB')}.</span>
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

  // Show Change password form
  function togglePasswordForm(e) {
    RippleButton(e);

    setShowPasswordForm(!showPasswordForm);
  }

  // Handle Logging out
  function handleLogOut(e) {
    RippleButton(e);

    dispatch(logOut());
  }

  // Get previous page of orders
  function handleClickPreviousPage(previousPage) {
    dispatch(getOrders(previousPage));
  }

  // Get next page of orders
  function handleClickNextPage(nextPage) {
    dispatch(getOrders(nextPage));
  }

  // Render previous/next buttons
  function handlePreviousNextPage() {
    let currentPage;

    if (next) currentPage = next.page - 1;
    if (previous) currentPage = previous.page + 1;

    return (
      <div>
        {previous && (
          <div className="btn next-page" onClick={() => handleClickPreviousPage(previous.page)}>{previous.page}</div>
        )}
        {currentPage && (
          <div className="btn current-page highlight">{currentPage}</div>
        )}
        {next && (
          <div className="btn previous-page" onClick={() => handleClickNextPage(next.page)}>{next.page}</div>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div>
        <div className="account-info">
          <h2>Account Information <i className="las la-user-circle" /></h2>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>Status: Admin</p>
          <button type="button" className="btn" onClick={togglePasswordForm}>
            Change password
          </button>
          {showPasswordForm && <ChangePasswordForm />}
        </div>

        <div className="user-orders">
          <button type="button" className="btn">All Orders</button>
          <button type="button" className="btn">New Orders</button>
          {handleOrders()}
          {handlePreviousNextPage()}
        </div>
      </div>

      <button type="button" className="btn log-out" onClick={handleLogOut}>
        Log out
        <i className="las la-sign-out-alt" />
      </button>
    </div>
  );
}
