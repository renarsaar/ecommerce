import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterApparelTerm, setFilterBrandTerm, resetFilters } from '../actions/filterActions';
import { sortProducts } from '../actions/sortActions';

export default function Filter() {
  const dispatch = useDispatch();
  const { products, paginatedProducts } = useSelector((state) => state.products);
  const { apparelTerm, brandTerm } = useSelector((state) => state.filter);
  const { sortValue } = useSelector((state) => state.sort);
  const [showApparelsMenu, setShowApparelsMenu] = useState(true);
  const [showBrandsMenu, setShowBrandsMenu] = useState(false);
  const [apparelsList, setApparelsList] = useState([]);
  const [brandsList, setBrandsList] = useState([]);

  // Set Filter menu items
  useEffect(() => {
    const apparels = [];
    const brands = [];

    if (products) {
      products.forEach((product) => {
        if (product.category === 'Apparels') {
          // Do not add duplicates
          if (!apparels.includes(product.subCategory)) {
            apparels.push(product.subCategory);
          }
        }

        return false;
      });

      products.forEach((product) => {
        // Do not add duplicates
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
      });

      setApparelsList(apparels);
      setBrandsList(brands);
    }
  }, [products]);

  // Reset filter terms
  function handleResetFilters() {
    dispatch(resetFilters());
    if (sortValue) {
      // Reset both filters and return sorted products
      dispatch(sortProducts(sortValue, paginatedProducts));
    }
  }

  // Handle click on appareal
  function handleClickApparel(category, products) {
    // Reset filtering if click on the same category
    if (apparelTerm === category) {
      if (sortValue) {
        // Reset filter and return sorted paginatedProducts
        dispatch(setFilterApparelTerm('', products));
        dispatch(sortProducts(sortValue, paginatedProducts));
      } else {
        // Reset Brand filter term
        dispatch(setFilterApparelTerm('', products));
      }
    } else {
      dispatch(setFilterApparelTerm(category, products));
    }
  }

  // Handle click on brand
  function handleCLickBrand(brand, products) {
    // Reset filtering if click on the same brand
    if (brandTerm === brand) {
      if (sortValue) {
        // Reset filters and return sorted paginatedProducts
        dispatch(setFilterBrandTerm('', products));
        dispatch(sortProducts(sortValue, paginatedProducts));
      } else {
        // Reset Apparel filter term
        dispatch(setFilterBrandTerm('', products));
      }
    } else {
      dispatch(setFilterBrandTerm(brand, products));
    }
  }

  // Render apparels list
  function renderApparels(apparels) {
    return apparels.map((category) => (
      <li
        style={{ color: apparelTerm === category ? '#ff600a' : '#0a0a0a' }}
        key={category}
        value={category}
        onClick={() => handleClickApparel(category, products)}
      >
        {category}
      </li>
    ));
  }

  // Render brands list
  function renderBrands(brands) {
    return brands.map((brand) => (
      <li
        style={{ color: brandTerm === brand ? '#ff600a' : '#0a0a0a' }}
        key={brand}
        value={brand}
        onClick={() => handleCLickBrand(brand, products)}
      >
        {brand}
      </li>
    ));
  }

  return (
    <div className="filter">
      <div className="heading">
        <h4>Filters</h4>
        <h4 onClick={handleResetFilters}>Reset</h4>
      </div>

      <div className="apparels">
        <h2 onClick={() => setShowApparelsMenu(!showApparelsMenu)}>
          Apparels
          <i className={showApparelsMenu ? 'las la-angle-down rotate' : 'las la-angle-down'} />
        </h2>
        <ul className={showApparelsMenu ? 'show' : 'hide'}>
          {products && renderApparels(apparelsList)}
        </ul>
      </div>

      <div className="brands">
        <h2 onClick={() => setShowBrandsMenu(!showBrandsMenu)}>
          Brands
          <i className={showBrandsMenu ? 'las la-angle-down rotate' : 'las la-angle-down'} />
        </h2>
        <ul className={showBrandsMenu ? 'show' : 'hide'}>
          {products && renderBrands(brandsList)}
        </ul>
      </div>
    </div>
  );
}
