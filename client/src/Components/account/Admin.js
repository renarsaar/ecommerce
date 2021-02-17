import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders, getNewOrders, changeOrderStatus, deleteOrder } from '../../actions/orderActions';
import { logOut } from '../../actions/authActions';
import useRippleButton from '../Hooks/useRippleButton';

import ChangePasswordForm from './ChangePasswordForm';

export default function Admin() {
  const dispatch = useDispatch();
  const {
    // eslint-disable-next-line max-len
    ordersLoading, orders, next, previous, getOrdersError, orderStatusLoading,
    deleteOrderLoading, deleteOrderMessage, orderType
  } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  let currentPage = 1;

  // Fetch orders on page change || status change
  useEffect(() => {
    if (orderType === 'All') dispatch(getOrders(currentPage));
    if (orderType === 'New') dispatch(getNewOrders(currentPage));
  }, [currentPage, orderStatusLoading, deleteOrderMessage]);

  // Change order completed status
  function handleOrderStatus(currStatus, newStatus, orderId) {
    if (orderStatusLoading || deleteOrderLoading) return false;

    // If click on the same icon, set status to 'Recieved'
    if (currStatus === newStatus) {
      dispatch(changeOrderStatus('Recieved', orderId, sessionStorage.token));
    }

    dispatch(changeOrderStatus(newStatus, orderId, sessionStorage.token));
  }

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
      return orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((order) => (
        <div
          className="order"
          key={order._id}
          style={{
            borderRight: `5px solid #${Math.floor(Math.random() * 16777215).toString(16)}`,
            background: handleOrderBackground(order.status),
          }}
        >
          <Link
            to={`/order/${order._id}`}
            className="order-info"
            style={{ fontWeight: order.status === 'Recieved' ? '700' : '400' }}
          >
            {'Order '}
            <span>{order._id}</span>
            {' from '}
            <span>{order.user}</span>
            {' at '}
            <span>{new Date(order.date).toLocaleDateString('en-GB')}.</span>
          </Link>
          <p className="order-actions" style={{ opacity: orderStatusLoading || deleteOrderLoading ? 0.5 : 1 }}>
            <span>Status: {order.status}</span>
            <i
              className="las la-eye tooltip"
              onClick={() => handleOrderStatus(order.status, 'Seen By Admin', order._id)}
            >
              <span className="tooltiptext">Mark as Seen</span>
            </i>
            <i
              className="las la-check tooltip"
              onClick={() => handleOrderStatus(order.status, 'Completed', order._id)}
              style={{ color: order.status === 'Completed' ? '#3db81e' : '#0a0a0a' }}
            >
              <span className="tooltiptext">Mark as Completed</span>
            </i>
            <i
              className="las la-spinner tooltip"
              onClick={() => handleOrderStatus(order.status, 'Active', order._id)}
              style={{ color: order.status === 'Active' ? '#d3cd10' : '#0a0a0a' }}
            >
              <span className="tooltiptext">Mark as Active</span>
            </i>
            <i
              className="las la-times tooltip"
              onClick={() => handleOrderStatus(order.status, 'Cancelled', order._id)}
              style={{ color: order.status === 'Cancelled' ? '#d50d0d' : '#0a0a0a' }}
            >
              <span className="tooltiptext">Mark as Cancelled</span>
            </i>
            <i
              className="las la-trash-alt tooltip"
              onClick={() => dispatch(deleteOrder(order._id, sessionStorage.token))}
            >
              <span className="tooltiptext">Delete this order</span>
            </i>
          </p>
        </div>
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

    if (getOrdersError) {
      return <h5 className="err">Error loading orders, please try again later</h5>;
    }
  }

  // Show Change password form
  function togglePasswordForm(e) {
    useRippleButton(e);

    setShowPasswordForm(!showPasswordForm);
  }

  // Handle Logging out
  function handleLogOut(e) {
    useRippleButton(e);

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
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(getOrders(currentPage))}
            style={{ background: orderType === 'All' ? 'rgba(255, 96, 10, 0.2)' : '#e4e3e3' }}
          >
            All Orders
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(getNewOrders(currentPage))}
            style={{ background: orderType === 'New' ? 'rgba(255, 96, 10, 0.2)' : '#e4e3e3' }}
          >
            New Orders
          </button>
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
