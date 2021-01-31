import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeWishlist } from '../../actions/wishListActions';

export default function WishListModal({ showWishList, products }) {
  const dispatch = useDispatch();
  const wishListProducts = useSelector((state) => state.wishList);
  const modalClassName = showWishList === true ? 'wishlist-modal visible' : 'wishlist-modal hidden';

  // Return wishlist items
  function renderWishListItems() {
    return wishListProducts.map((id, index) => {
      let name;
      let image;

      // Find the name & image for Id's in the wishlist
      products.map((item) => {
        if (item._id === id) {
          name = item.name;
          image = item.image;
        }
      });

      if (image && name) {
        return (
          <li key={id}>
            <div className="wishlist-product">
              <img src={`http://localhost:8080/${image}`} alt={name} />
              <Link to={`/products/${id}`} className="info">
                <h1>{name}</h1>
              </Link>
            </div>

            <div>
              <i className="las la-trash" onClick={() => dispatch(removeWishlist(id))} />
            </div>
          </li>
        );
      }
    });
  }

  return ReactDOM.createPortal(
    <div className={modalClassName}>
      <div className="modal-main">
        <h2>Wishlist</h2>

        <ul className="modal-items">
          {wishListProducts && renderWishListItems()}
        </ul>

      </div>
    </div>,
    document.getElementById('wishlist'),
  );
}
