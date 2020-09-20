import React from 'react';
import { useDispatch } from 'react-redux';
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

  // Hnadle sorting
  function handleChange(e) {
    const { value } = e.target;

    if (value === 'oldest') dispatch(sortOldest());
    if (value === 'newest') dispatch(sortNewest());
    if (value === 'cheapest') dispatch(sortCheapest());
    if (value === 'expensivest') dispatch(sortExpensivest());
    if (value === 'name') dispatch(sortName());
    if (value === 'discount') dispatch(sortDiscount());
  }

  return (
    <div className="subheader">
      <div className="container">
        <ul className="breadcrumb">
          <li>Men</li>
          <li>Appareal</li>
          <li>Shirts</li>
        </ul>
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
