import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterTerm } from '../actions/filterActions';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(false);
  const { products } = useSelector((state) => state.products);
  const { apparelTerm, brandTerm } = useSelector((state) => state.filter);

  useEffect(() => {
    // Set searchTerm to empty string if searchbar is closed
    if (!searchBar) dispatch(setFilterTerm(apparelTerm, brandTerm, '', products));
  }, [searchBar]);

  // Search product from user search term
  function searchProducts(e) {
    const { key } = e;
    const { value } = e.target;

    if (key === 'Enter' && value === '') {
      dispatch(setFilterTerm(apparelTerm, brandTerm, value, products));
    } else if (key === 'Enter') {
      dispatch(setFilterTerm(apparelTerm, brandTerm, value, products));
    }
  }

  return (
    <>
      {searchBar && (
        <input
          type="text"
          className="searchbar"
          placeholder="Search.."
          onKeyDown={(e) => searchProducts(e)}
        />
      )}

      <i
        className="las la-search"
        onClick={() => setSearchBar(!searchBar)}
      />
    </>
  );
}
