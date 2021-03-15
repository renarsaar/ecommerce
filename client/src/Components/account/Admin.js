import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {
  getOrders, getNewOrders, changeOrderStatus, deleteOrder,
} from '../../actions/orderActions';
import {
  logOut, getUsers, makeAdminAction, banUserAction, resetUserActions,
} from '../../actions/authActions';
import useRippleButton from '../Hooks/useRippleButton';
import useHandleOrderBackground from '../Hooks/useHandleOrderBackground';

import ChangePasswordForm from './ChangePasswordForm';

const customModalStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -10%)',
  },
};

export default function Admin() {
  const dispatch = useDispatch();
  const {
    ordersLoading, orders, nextOrders, previousOrders, getOrdersError,
    orderStatusLoading, deleteOrderLoading, deleteOrderMessage, orderType,
  } = useSelector((state) => state.orders);
  const {
    authLoading, user, users, nextUsers, previousUsers,
    getUsersError, makeAdmin, banUser,
  } = useSelector((state) => state.auth);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [cancelledOrderId, setCancelledOrderId] = useState('');
  const [banUserId, setBanUserId] = useState('');
  const [banComment, setBanComment] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);
  let currentOrdersPage = 1;
  let currentUsersPage = 1;

  Modal.setAppElement('#modal');

  // Fetch orders on page change || status change
  useEffect(() => {
    if (orderType === 'All') dispatch(getOrders(currentOrdersPage, sessionStorage.token));
    if (orderType === 'New') dispatch(getNewOrders(currentOrdersPage, sessionStorage.token));
  }, [currentOrdersPage, orderStatusLoading, deleteOrderMessage]);

  useEffect(() => {
    dispatch(getUsers(sessionStorage.token));

    return () => {
      dispatch(resetUserActions());
    };
  }, []);

  // Open modal on makeAdminAction
  useEffect(() => {
    setModalIsOpen(true);
    dispatch(getUsers(sessionStorage.token));
  }, [makeAdmin, banUser]);

  // Change order completed status
  function handleOrderStatus(currStatus, newStatus, orderId, statusComment) {
    if (orderStatusLoading || deleteOrderLoading) return false;

    // If click on the same icon, set status to 'Recieved'
    if (!statusComment && currStatus === newStatus) {
      dispatch(changeOrderStatus('Recieved', orderId, sessionStorage.token));
    }

    dispatch(changeOrderStatus(newStatus, orderId, sessionStorage.token, statusComment));

    // Reset id && status comment
    setCancelledOrderId('');
    setStatusComment('');
  }

  // Return user orders
  function handleOrders() {
    if (orders) {
      return orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map((order) => (
        <div key={order._id}>
          <div
            className="order"
            style={{
              borderRight: `5px solid #${Math.floor(Math.random() * 16777215).toString(16)}`,
              background: useHandleOrderBackground(order.status),
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
                style={{ color: order.status === 'Cancelled' ? '#d50d0d' : '#0a0a0a' }}
                onClick={() => setCancelledOrderId(cancelledOrderId === order._id ? '' : order._id)}
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
          {cancelledOrderId === order._id && (
            <div className="order-cancelled">
              <div>
                <label>Please specify the reason</label>
                <select onChange={(e) => setStatusComment(e.target.value)} name="statusComment">
                  <option value="" />
                  <option value="One of the products has run out of Stock">One of the products has run out of Stock</option>
                  <option value="Transaction failed">Transaction failed</option>
                  <option value="Invalid Delivery Address">Invalid Delivery Address</option>
                  <option value="Technical problems proccesing order">Technical problems proccesing order</option>
                </select>
              </div>
              <button
                className="btn"
                type="button"
                onClick={() => handleOrderStatus(order.status, 'Cancelled', order._id, statusComment)}
              >
                Cancel this order
              </button>
            </div>
          )}
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
    if (users) {
      return users.map((user) => (
        <div key={user._id}>
          <div className="user">
            <div>
              <p>{user.name},</p>
              <p>{user.email},</p>
              <p>User since {new Date(user.date).toLocaleDateString('en-GB')}.</p>
            </div>
            <div>
              {!user.isAdmin && !user.isBanned && (
                <>
                  <i
                    className="las la-user-cog tooltip"
                    onClick={() => dispatch(makeAdminAction(user._id, sessionStorage.token))}
                  >
                    <span className="tooltiptext">Make this user Admin</span>
                  </i>
                  <i
                    className="las la-user-lock tooltip"
                    onClick={() => setBanUserId(banUserId === user._id ? '' : user._id)}
                  >
                    <span className="tooltiptext">Ban this user</span>
                  </i>
                </>
              )}
              {!user.isAdmin && user.isBanned && (
                <>
                  <i
                    className="las la-unlock tooltip"
                    onClick={() => dispatch(banUserAction(user._id, sessionStorage.token))}
                  >
                    <span className="tooltiptext">Unban this user</span>
                  </i>
                </>
              )}
              {user.isAdmin && (
                <p>Admin</p>
              )}
              {user.isBanned && (
                <p className="err">Banned. {user.banComment}</p>
              )}
            </div>
          </div>
          {banUserId === user._id && (
            <div className="ban-user">
              <div>
                <label>Please specify the reason</label>
                <textarea onChange={(e) => setBanComment(e.target.value)} name="banComment" rows="3" cols="50" />
              </div>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  dispatch(banUserAction(user._id, sessionStorage.token, banComment));
                  setBanUserId('');
                  setBanComment('');
                }}
              >
                Ban this User
              </button>
            </div>
          )}
        </div>
      ));
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
    dispatch(getOrders(previousPage, sessionStorage.token));
  }

  // Get next page of orders
  function handleClickNextPage(nextPage) {
    dispatch(getOrders(nextPage, sessionStorage.token));
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
            onClick={() => dispatch(getOrders(currentOrdersPage, sessionStorage.token))}
            style={{ background: orderType === 'All' ? 'rgba(255, 96, 10, 0.2)' : '#e4e3e3' }}
          >
            All Orders
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(getNewOrders(currentOrdersPage, sessionStorage.token))}
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

      {makeAdmin && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{makeAdmin}</h2>
        </Modal>
      )}

      {banUser && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{banUser}</h2>
        </Modal>
      )}
    </div>
  );
}
