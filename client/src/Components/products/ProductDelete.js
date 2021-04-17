import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, clearProductReducer } from '../../actions/productsActions';

export default function ProductDelete() {
  const dispatch = useDispatch();
  const { selectedProduct, deleteProductError } = useSelector((state) => state.products);

  useEffect(() => {
    return () => {
      if (deleteProductError) dispatch(clearProductReducer());
    }
  }, []);

  // useEffect(() => {
  //   if (deleteProductError) dispatch(clearProductReducer());
  // }, []);

  return (
    <div className="product-delete container-high">
      Are you sure you want to delete this product?

      <div className="delete-actions">
        <button
          type="button"
          className="btn mr-2"
          onClick={() => dispatch(deleteProduct(selectedProduct._id, sessionStorage.token))}
        >
          Yes, delete
        </button>
        <Link to={`/products/${selectedProduct._id}`} className="btn">No, return</Link>
      </div>

      <h3 className="err mt-1">{deleteProductError}</h3>
    </div>
  );
}
