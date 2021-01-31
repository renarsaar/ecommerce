import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart } from '../../actions/cartActions';

export default function CartModal({ showCart }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const modalClassName = showCart === true ? 'cart-modal visible' : 'cart-modal hidden';

  // Return shopping cart products
  function renderCartItems() {
    return cartProducts.map((product, index) => (
      <li key={product.key}>
        <div className="cart-product">
          <img src={`http://localhost:8080/${product.image}`} alt={product.name} />
          <div className="info">
            <h1>{product.name} x {product.quantity}</h1>
            <div>
              <p>Size: {product.size}</p>
              <p>{product.totalPrice.toFixed(2)} €</p>
            </div>
          </div>
        </div>

        <div>
          <i className="las la-trash" onClick={() => dispatch(removeCart(index))} />
        </div>
      </li>
    ));
  }

  // Return cart total price
  function handleCartPrice() {
    const totalCartPrice = cartProducts.reduce((acc, cv) => acc + cv.totalPrice, 0);

    return totalCartPrice.toFixed(2);
  }

  return ReactDOM.createPortal(
    <div className={modalClassName}>
      <div className="modal-main">
        <h2>Shopping Cart</h2>

        <ul className="modal-items">
          {cartProducts && renderCartItems()}
        </ul>

        <h1 className="price-total">
          {cartProducts.length >= 1 && `Total Price: ${handleCartPrice()} €`}
        </h1>

        {cartProducts.length >= 1 && <Link className="link" to="/cart/checkout">Proceed to Checkout</Link>}
      </div>
    </div>,
    document.getElementById('cart'),
  );
}
