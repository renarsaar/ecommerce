import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function UserShow() {
  const history = useHistory();
  const location = useLocation();
  const { orders } = useSelector((state) => state.orders);
  const { user } = location.state;
  const {
    isAdmin, isBanned, banComment, date, email, name,
  } = user;
  const userOrders = orders.filter((order) => order.email === email);

  function handleUserOrders() {
    if (userOrders.length === 0) {
      return <h2>This user has not made any orders</h2>;
    }

    return userOrders.map((order) => (
      <div className="order" key={order._id}>
        <Link className="order-info" to={`/order/${order._id}`}>
          <div>
            {'Order '}
            <span className="mr-1">{order._id}</span>
            <span>{new Date(order.date).toLocaleDateString('en-GB')}.</span>
          </div>

          <div className="order-actions">
            <span className="mr-2">Status: {order.status}</span>
          </div>
        </Link>
      </div>
    ));
  }

  return (
    <div className="user-show container-high">
      <h1 className="mb-2">User information</h1>
      <h2 className="mb-1">Username: {name}</h2>
      <h2 className="mb-1">Email: {email}</h2>
      <h2 className="mb-1">User since: {new Date(date).toLocaleDateString('en-GB')}</h2>
      {isAdmin && (
        <h2 className="mb-2">Account Status: Admin</h2>
      )}
      {isBanned && (
        <h2 className="mb-2">Account Status: Banned</h2>
      )}
      {banComment && (
        <h2 className="mb-2">Reason for banned: {banComment}</h2>
      )}
      {orders && handleUserOrders()}

      <button
        type="button"
        className="btn"
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </div>
  );
}
