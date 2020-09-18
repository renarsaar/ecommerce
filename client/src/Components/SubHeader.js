import React from 'react';

export default function SubHeader() {
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
          <select>
            <option value="price">Price</option>
            <option value="newest">Newest first</option>
            <option value="brand">Brand</option>
            <option value="brand">Discount percentage</option>
          </select>
        </div>
      </div>
    </div>
  );
}
