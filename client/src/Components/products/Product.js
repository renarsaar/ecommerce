import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Product({ product }) {
  const {
    image, name, date, price, discountPrice, _id,
  } = product;
  const { wishListProducts } = useSelector((state) => state.wishList);

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

  // Return heart icon if product is wishlisted
  function wishListedProduct() {
    if (wishListProducts.includes(_id)) {
      return (
        <span className="wishlisted lar la-heart orange" />
      );
    }

    return null;
  }

  return (
    <div className="product-list-item">
      <img src={`http://localhost:8080/${image}`} alt={name} />
      {newProduct()}
      {discountAmount()}
      {wishListedProduct()}
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
