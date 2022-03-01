import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { getOrders, getUserOrders } from '../../actions/orderActions';

export default function UserShow() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders } = useSelector((state) => state.orders);
  const { user } = location.state;
  const {
    isAdmin, isBanned, banComment, date, email, name,
    _id,
  } = user;

  useEffect(() => {
    dispatch(getUserOrders(_id, 1, sessionStorage.token));

    return () => {
      dispatch(getOrders(1, sessionStorage.token));
    };
  }, []);

  function handleUserOrders() {
    if (orders.length === 0) {
      return <h2>This user has not made any orders</h2>;
    }

    return orders.map((order) => (
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
