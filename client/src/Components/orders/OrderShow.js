import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrder } from '../../actions/orderActions';

export default function OrderShow({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const { ordersLoading, selectedOrder, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  // Fetch single order
  useEffect(() => {
    dispatch(getOrder(id, sessionStorage.getItem('token')));
  }, [dispatch, id]);

  // Render order
  function renderOrder() {
    return (
      <div className="order-container">
        <div className="order-single">
          <div className="order-info">
            <h3>Order made at {new Date(selectedOrder.date).toLocaleDateString('en-GB')}</h3>
            <h3>Orderer: {selectedOrder.user}</h3>
            <h3>Email: {selectedOrder.email}</h3>
            <h3>Delivery: {selectedOrder.delivery}</h3>
            <h3>Total Price: {selectedOrder.totalPrice}€</h3>
          </div>
          <div className="order-products">
            {selectedOrder.products.map((product) => (
              <Link
                to={`/products/${product.id}`}
                className="order-product"
                key={product.key}
              >
                <div>
                  <h3>{product.name} x {product.quantity}</h3>
                  <h3>Size: {product.size}</h3>
                  <h3>{product.totalPrice} €</h3>
                </div>
                <img src={`http://localhost:8080/${product.image}`} alt={product.name} />
              </Link>
            ))}
          </div>

        </div>
        {user && (
          <Link to={user.admin ? `/account/dashboard/admin/${user.id}` : `/account/dashboard/user/${user.id}`}>
            <button type="button" className="btn">Back</button>
          </Link>
        )}
      </div>
    );
  }

  // Placeholder for order content
  function renderPlaceHolder() {
    return (
      <div className="placeholder-container">
        <div className="placeholder-block">
          <div className="placeholder-heading placeholder" />
          <div className="placeholder-heading placeholder" />
          <div className="placeholder-heading placeholder" />
          <div className="placeholder-heading placeholder" />
        </div>

        <div className="placeholder-flex">
          <div>
            <div className="placeholder-heading placeholder" />
            <div className="placeholder-heading placeholder" />
            <div className="placeholder-heading placeholder" />
            <div className="placeholder-heading placeholder" />
          </div>

          <div className="placeholder-image-small placeholder" />
        </div>
      </div>
    );
  }

  return (
    <>
      {ordersLoading && <>{renderPlaceHolder()}</>}
      {selectedOrder && <>{renderOrder()}</>}
      {error && (
        <div className="order-container">
          <h3 className="err">Order not found.</h3>
        </div>
      )}
    </>
  );
}
