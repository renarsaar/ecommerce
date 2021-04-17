import React from 'react';
import { useSelector } from 'react-redux';

import Filter from './Filter';
import ProductList from './products/ProductList';

export default function Catalog() {
  const {
    shop,
    fabric,
    journal,
    about,
  } = useSelector((state) => state.menu);

  return (
    <div className="catalog container-high flex">
      {shop && (
        <>
          <Filter />
          <ProductList />
        </>
      )}

      {fabric && (
        <>
          Fabric
        </>
      )}

      {journal && (
        <>
          Journal
        </>
      )}

      {about && (
        <>
          About
        </>
      )}
    </div>
  );
}
