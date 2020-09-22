import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sortOldest,
  sortCheapest,
  sortExpensivest,
  sortNewest,
  sortName,
  sortDiscount
} from '../actions';

export default function SubHeader() {
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);

  // Handle sorting
  function handleChange(e) {
    const { value } = e.target;

    if (value === 'oldest') dispatch(sortOldest());
    if (value === 'newest') dispatch(sortNewest());
    if (value === 'cheapest') dispatch(sortCheapest());
    if (value === 'expensivest') dispatch(sortExpensivest());
    if (value === 'name') dispatch(sortName());
    if (value === 'discount') dispatch(sortDiscount());
  }

  // Display breadcrumb menu items
  function handleBreadcrumb() {
    const { category, gender, subCategory } = selectedProduct || '';

    if (category && gender && subCategory) return (
      <ul className="breadcrumb">
        <li>{gender}</li>
        <li>{category}</li>
        <li>{subCategory}</li>
      </ul>
    )

    return <ul className="breadcrumb"></ul>;
  }

  return (
    <div className="subheader">
      <div className="container">
        {handleBreadcrumb()}
        <div className="sort">
          Sort by
          <select onChange={handleChange}>
            <option value="oldest"></option>
            <option value="newest">Newest first</option>
            <option value="cheapest">Cheapest first</option>
            <option value="expensivest">Expensivest first</option>
            <option value="name">Name</option>
            <option value="discount">Discount price</option>
          </select>
        </div>
      </div>
    </div>
  );
}
