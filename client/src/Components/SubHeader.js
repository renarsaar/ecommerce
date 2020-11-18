import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { sortProducts } from '../actions/sortActions';

export default function SubHeader() {
  const dispatch = useDispatch();
  const { paginatedProducts, selectedProduct } = useSelector((state) => state.products);
  const { sortValue } = useSelector((state) => state.sort);
  const { filteredProducts } = useSelector((state) => state.filter);
  const location = useLocation();

  // Sort products again on next/previous page click
  useEffect(() => {
    if (sortValue && !selectedProduct) {
      if (filteredProducts) {
        dispatch(sortProducts(sortValue, filteredProducts));
      } else {
        dispatch(sortProducts(sortValue, paginatedProducts));
      }
    }
  }, [paginatedProducts]);

  // Sort filtered products again on render
  useEffect(() => {
    if (filteredProducts && sortValue) {
      dispatch(sortProducts(sortValue, filteredProducts));
    }
  }, [sortValue, filteredProducts]);

  // Display breadcrumb menu items
  function handleBreadcrumb() {
    const { category, gender, subCategory } = selectedProduct || '';

    if (category && gender && subCategory) {
      return (
        <ul className="breadcrumb">
          <li>{gender}</li>
          <li>{category}</li>
          <li>{subCategory}</li>
        </ul>
      );
    }

    return <ul className="breadcrumb" />;
  }

  // Handle products sorting
  function handleChange(e) {
    const { value } = e.target;

    if (filteredProducts) {
      dispatch(sortProducts(value, filteredProducts));
    } else {
      dispatch(sortProducts(value, paginatedProducts));
    }
  }

  // Do not render on login/register page
  if (
    location.pathname === '/account/login'
    || location.pathname === '/account/register'
  ) {
    return <></>;
  }

  return (
    <div className="subheader">
      <div className="container">
        {handleBreadcrumb()}
        <div className={selectedProduct ? 'hide' : 'sort show'}>
          Sort by
          <select onChange={handleChange} defaultValue={sortValue}>
            <option value="SORT_OLDEST" />
            <option value="SORT_NEWEST">Newest first</option>
            <option value="SORT_CHEAPEST">Cheapest first</option>
            <option value="SORT_EXPENSIVEST">Expensivest first</option>
            <option value="SORT_NAME">Name</option>
            <option value="SORT_DISCOUNT">Discount price</option>
          </select>
        </div>
      </div>
    </div>
  );
}
