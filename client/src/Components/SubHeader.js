import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProducts } from '../actions';

export default function SubHeader() {
  const dispatch = useDispatch();
  const { products, selectedProduct } = useSelector((state) => state.products);
  const { sortValue } = useSelector((state) => state.sort);
  const { filteredProducts } = useSelector((state) => state.filter);

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
      dispatch(sortProducts(value, products));
    }
  }

  return (
    <div className="subheader">
      <div className="container">
        {handleBreadcrumb()}
        <div className="sort">
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
