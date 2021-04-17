import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartOne, removeCart } from '../../../actions/cartActions';

export default function FormCartProducts({ values, nextStep, handleCartTotalPrice }) {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);

  useEffect(() => {
    // Total price of shopping cart
    const cartPrice = cartProducts.reduce((acc, cv) => acc + cv.totalPrice, 0).toFixed(2);

    handleCartTotalPrice(cartPrice);
  }, [cartProducts]);

  function handleCartProducts() {
    if (cartProducts.length === 0) {
      return (
        <div className="cart-products-empty">
          <h1 className="mb-1">Shopping cart is empty...</h1>
          <Link className="link" to="/">Back to Home</Link>
        </div>
      );
    }

    return cartProducts.map((item, index) => {
      const {
        id, key, image, name, productPrice, quantity, size, stock,
      } = item;

      return (
        <div key={key} className="cart-products flex">
          <img src={`http://localhost:8080/${image}`} alt={key} />

          <Link to={`/products/${id}`} className="cart-products-info">
            <h2>{name}</h2>
            <h4>Size: {size}</h4>
            <h4>Price: {productPrice} €</h4>
          </Link>

          <div className="cart-products-options">
            <div className="quantity">
              <i className="las la-plus" onClick={() => dispatch(addCartOne(index))} />
              <p>{quantity}</p>
              <i className="las la-minus" onClick={() => dispatch(removeCart(index, productPrice))} />
            </div>

            <h4 className="stock mt-1">Stock: {stock}</h4>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="order-create container">
      {handleCartProducts()}
      {cartProducts.length >= 1 && (
        <>
          <h3>Total price {values.totalPrice} €</h3>
          <div className="actions">
            <button type="button" onClick={nextStep}>Proceed</button>
          </div>
        </>
      )}
    </div>
  );
}
