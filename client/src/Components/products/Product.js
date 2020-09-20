import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  // Return new product label
  function newProduct(date) {
    const curDate = new Date();
    const productDate = new Date(date);

    // 30 days
    if (curDate - (30 * 24 * 60 * 60 * 1000) < productDate) {
      return <span className="new">new</span>
    }

    return null;
  }

  // Return discount price 
  function discountPrice(price, discount) {
    const discountPrice = +(price - discount).toFixed(2);

    if (price !== discount) {
      return <span className="discount">-{discountPrice}€</span>
    }

    return null;
  }

  return (
    <div className="product">
      <img src={'http://localhost:8080/' + product.image} alt={product.name} />
      {newProduct(product.date)}
      {discountPrice(product.price, product.discountPrice)}
      <Link to={`/products/${product._id}`}>
        <h1>{product.name}</h1>
        <p>{product.price} €</p>
      </Link>
    </div>
  );
}
