import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../actions';

import Product from './Product';

export default function Catalog() {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const { oldest, newest, cheapest, expensivest, name, discount } = useSelector((state) => state.sort);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sort products by oldest
  function sortOldest() {
    return products
      .sort((previous, current) => new Date(previous.date) - new Date(current.date))
      .map((product) => <Product product={product} key={product._id} />);
  }

  // Sort products by newest
  function sortNewest() {
    return products
      .sort((previous, current) => new Date(current.date) - new Date(previous.date))
      .map((product) => <Product product={product} key={product._id} />);
  }

  // Sort products by cheapest
  function sortCheapest() {
    return products
      .sort((previous, current) => previous.price - current.price)
      .map((product) => <Product product={product} key={product._id} />);
  }

  // Sort products by expensivest
  function sortExpensivest() {
    return products
      .sort((previous, current) => current.price - previous.price)
      .map((product) => <Product product={product} key={product._id} />);
  }

  // Sort products by name
  function sortName() {
    return products
      .sort((previous, current) => previous.name.localeCompare(current.name))
      .map((product) => <Product product={product} key={product._id} />);
  }

  // Sort products by discount amount
  function sortDiscount() {
    return products
      .sort((previous, current) => {
        const currentDiscount = current.price - current.discountPrice;
        const previousDiscount = previous.price - previous.discountPrice;

        return currentDiscount - previousDiscount;
      })
      .map((product) => <Product product={product} key={product._id} />);
  }

  return (
    <div className="products">
      {loading && <div>Loading</div>}
      {products && <>
        {oldest && <>{sortOldest()}</>}
        {newest && <>{sortNewest()}</>}
        {cheapest && <>{sortCheapest()}</>}
        {expensivest && <>{sortExpensivest()}</>}
        {name && <>{sortName()}</>}
        {discount && <>{sortDiscount()}</>}
      </>}
      {error && <div>error</div>}
    </div>
  );
}
