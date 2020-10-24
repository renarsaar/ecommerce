import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../actions';

import Product from './Product';

export default function Catalog() {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const { sortedProducts } = useSelector((state) => state.sort);
  const { filteredProducts } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle products rendering
  function renderProducts() {
    if (filteredProducts) {
      return filteredProducts.map((product) => <Product product={product} key={product._id} />);
    }

    if (sortedProducts) {
      return sortedProducts.map((product) => <Product product={product} key={product._id} />);
    }

    return products.map((product) => <Product product={product} key={product._id} />);
  }

  return (
    <div className="product-list">
      {loading
        && (
          <>
            <div className="product-list-item">
              <div className="img placeholder" />
              <div className="heading placeholder" />
              <div className="heading placeholder" />
            </div>
            <div className="product-list-item">
              <div className="img placeholder" />
              <div className="heading placeholder" />
              <div className="heading placeholder" />
            </div>
            <div className="product-list-item">
              <div className="img placeholder" />
              <div className="heading placeholder" />
              <div className="heading placeholder" />
            </div>
            <div className="product-list-item">
              <div className="img placeholder" />
              <div className="heading placeholder" />
              <div className="heading placeholder" />
            </div>
            <div className="product-list-item">
              <div className="img placeholder" />
              <div className="heading placeholder" />
              <div className="heading placeholder" />
            </div>
            <div className="product-list-item">
              <div className="img placeholder" />
              <div className="heading placeholder" />
              <div className="heading placeholder" />
            </div>
          </>
        )}
      {products && renderProducts()}
      {error && <div>error</div>}
    </div>
  );
}
