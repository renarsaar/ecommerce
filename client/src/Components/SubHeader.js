import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { sortProducts } from '../actions/sortActions';

export default function SubHeader() {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);
  const { sortValue } = useSelector((state) => state.sort);
  const location = useLocation();

  // Display breadcrumb menu items
  function handleBreadcrumb() {
    const { category, gender, subCategory } = selectedProduct || '';

    return (
      <ul className="breadcrumb flex">
        {selectedProduct && (
          <>
            <li>{gender}</li>
            <li>{category}</li>
            <li>{subCategory}</li>
          </>
        )}
      </ul>
    );
  }

  // Handle products sorting
  function handleChange(e) {
    const { value } = e.target;

    dispatch(sortProducts(value));
  }

  // Render select menu conditionally
  function handleSortingMenu() {
    if (selectedProduct) return 'hide';
    if (location.pathname.includes('/account/dashboard')) return 'hide';
    if (location.pathname.includes('/cart/checkout')) return 'hide';
    if (location.pathname.includes('/cart/success')) return 'hide';
    if (location.pathname.includes('/order')) return 'hide';

    return 'sort show';
  }

  // Do not render on login/register/validation page
  if (
    location.pathname.includes('/account/login')
    || location.pathname.includes('/account/register')
    || location.pathname.includes('/account/validation')
  ) {
    return <></>;
  }

  return (
    <div className="subheader">
      <div className="container">
        {handleBreadcrumb()}

        <div className={handleSortingMenu()}>
          <h3 className="inline">Sort by</h3>

          <select
            onChange={handleChange}
            defaultValue={sortValue}
            className="txt-uppercase"
          >
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
