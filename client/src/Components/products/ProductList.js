import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../actions';
import Filter from '../Filter';

import Product from './Product';

export default function Catalog() {
  const { loading, products, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="catalog">
      <Filter />
      <div className="products">
        {loading && <div>Loading</div>}
        {products && <>{products.map((product) => <Product product={product} key={product._id} />)}</>}
        {error && <div>error</div>}
      </div>
    </div>
  );
}
