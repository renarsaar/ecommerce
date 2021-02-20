import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders, getNewOrders, changeOrderStatus, deleteOrder } from '../../actions/orderActions';
import { logOut, getUsers } from '../../actions/authActions';
import useRippleButton from '../Hooks/useRippleButton';

import ChangePasswordForm from './ChangePasswordForm';

export default function Admin() {
  const dispatch = useDispatch();
  const {
    // eslint-disable-next-line max-len
    ordersLoading, orders, nextOrders, previousOrders, getOrdersError, orderStatusLoading,
    deleteOrderLoading, deleteOrderMessage, orderType
  } = useSelector((state) => state.orders);
  const { authLoading, user, users, nextUsers, previousUsers, getUsersError } = useSelector((state) => state.auth);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  let currentOrdersPage = 1;
  let currentUsersPage = 1;

  // Fetch orders on page change || status change
  useEffect(() => {
    if (orderType === 'All') dispatch(getOrders(currentOrdersPage));
    if (orderType === 'New') dispatch(getNewOrders(currentOrdersPage));
  }, [currentOrdersPage, orderStatusLoading, deleteOrderMessage]);

  useEffect(() => {
    dispatch(getUsers(sessionStorage.token));
  }, []);

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

  // Return User data
  function handleUsers() {
    console.log(users)
    if (users) {
      return users.map((user) => (
        <div className="user" key={user._id}>
          <div>
            <p>{user.name},</p>
            <p>{user.email},</p>
            <p>User made at {new Date(user.date).toLocaleDateString('en-GB')}.</p>
          </div>
          <div>
            <i
              className="las la-user-cog tooltip"
            // onClick={() => dispatch(makeAdmin(user._id, sessionStorage.token))}
            >
              <span className="tooltiptext">Make this user admin</span>
            </i>
            <i
              className="las la-trash-alt tooltip"
            // onClick={() => dispatch(deleteUser(user._id, sessionStorage.token))}
            >
              <span className="tooltiptext">Delete this user</span>
            </i>
          </div>
        </div>
      ))
    }

    if (authLoading) {
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

    if (getUsersError) {
      return <h5 className="err">Error loading users, please try again later</h5>;
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

  // Handle previous/next button for Orders
  function handlePreviousNextOrdersPage() {
    if (nextOrders) currentOrdersPage = nextOrders.page - 1;
    if (previousOrders) currentOrdersPage = previousOrders.page + 1;

    return (
      <div>
        {previousOrders && (
          <div className="btn next-page" onClick={() => handleClickPreviousPage(previousOrders.page)}>{previousOrders.page}</div>
        )}
        {currentOrdersPage && (
          <div className="btn current-page highlight">{currentOrdersPage}</div>
        )}
        {nextOrders && (
          <div className="btn previous-page" onClick={() => handleClickNextPage(nextOrders.page)}>{nextOrders.page}</div>
        )}
      </div>
    );
  }

  // Handle previous/next button for Users
  function handlePreviousNextUsersPage() {
    if (nextUsers) currentUsersPage = nextUsers.page - 1;
    if (previousUsers) currentUsersPage = previousUsers.page + 1;

    return (
      <div>
        {previousUsers && (
          <div className="btn next-page" onClick={() => handleClickPreviousPage(previousUsers.page)}>{previousUsers.page}</div>
        )}
        {currentUsersPage && (
          <div className="btn current-page highlight">{currentUsersPage}</div>
        )}
        {nextUsers && (
          <div className="btn previous-page" onClick={() => handleClickNextPage(nextUsers.page)}>{nextUsers.page}</div>
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
            onClick={() => dispatch(getOrders(currentOrdersPage))}
            style={{ background: orderType === 'All' ? 'rgba(255, 96, 10, 0.2)' : '#e4e3e3' }}
          >
            All Orders
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(getNewOrders(currentOrdersPage))}
            style={{ background: orderType === 'New' ? 'rgba(255, 96, 10, 0.2)' : '#e4e3e3' }}
          >
            New Orders
          </button>
          {handleOrders()}
          {handlePreviousNextOrdersPage()}
        </div>

        <div className="users">
          <h2>All Users</h2>
          {handleUsers()}
          {handlePreviousNextUsersPage()}
        </div>
      </div>

      <button type="button" className="btn log-out" onClick={handleLogOut}>
        Log out
        <i className="las la-sign-out-alt" />
      </button>
    </div>
  );
}
