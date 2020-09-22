import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({ product }) {
  const {
    image, name, date, price, discountPrice, _id,
  } = product;

  // Return new product label
  function newProduct() {
    const curDate = new Date();
    const productDate = new Date(date);

    // 30 days
    if (curDate - (30 * 24 * 60 * 60 * 1000) < productDate) {
      return <span className="new">new</span>;
    }

    return null;
  }

  // Return discount amount label
  function discountAmount() {
    const discount = +(price - discountPrice).toFixed(2);

    if (price !== discountPrice) {
      return (
        <span className="discount">
          -
          {discount}
          €
        </span>
      );
    }

    return null;
  }

  return (
    <div className="product-list-item">
      <img src={`http://localhost:8080/${image}`} alt={name} />
      {newProduct()}
      {discountAmount()}
      <Link to={`/products/${_id}`}>
        <h1>{name}</h1>
        <p>
          {discountPrice === price ? price : discountPrice}
          €
        </p>
      </Link>
    </div>
  );
}
