import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../../actions/productsActions';

import Product from './Product';

export default function Catalog() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    loading, next, previous, paginatedProducts, error,
  } = useSelector((state) => state.products);
  const { sortValue } = useSelector((state) => state.sort);
  const { filteredProducts } = useSelector((state) => state.filter);

  useEffect(() => {
    if (sortValue) {
      dispatch(fetchProducts(1, sortValue));
    } else {
      dispatch(fetchProducts(1));
    }
  }, [dispatch, sortValue]);

  // Handle products rendering
  function renderProducts() {
    if (filteredProducts) {
      return filteredProducts.map((product) => <Product product={product} key={product._id} />);
    }

    return paginatedProducts.map((product) => <Product product={product} key={product._id} />);
  }

  // Fetch previous page products
  function handleClickPreviousPage(previousPage) {
    if (sortValue) {
      dispatch(fetchProducts(previousPage, sortValue));
    } else {
      dispatch(fetchProducts(previousPage));
    }
  }

  // Fetch next page products
  function handleClickNextPage(nextPage) {
    if (sortValue) {
      dispatch(fetchProducts(nextPage, sortValue));
    } else {
      dispatch(fetchProducts(nextPage));
    }
  }

  function handlePreviousNextPage() {
    let currentPage;

    if (next) currentPage = next.page - 1;
    if (previous) currentPage = previous.page + 1;

    return (
      <div className={filteredProducts ? 'hide' : 'product-page-nav'}>
        {previous && (
          <div className="btn" onClick={() => handleClickPreviousPage(previous.page)}>{previous.page}</div>
        )}
        {currentPage && (
          <div className="btn highlight">{currentPage}</div>
        )}
        {next && (
          <div className="btn" onClick={() => handleClickNextPage(next.page)}>{next.page}</div>
        )}
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {location.state && (
        <div className="success-container">
          New product added.
        </div>
      )}

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
        {paginatedProducts && renderProducts()}
        {error && <div>error</div>}
      </div>
      {paginatedProducts && handlePreviousNextPage()}
    </div>
  );
}
