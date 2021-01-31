import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  showShop, showFabric, showJournal, showAbout,
} from '../actions/menuActions';
import { fetchProducts } from '../actions/productsActions';

import CartModal from './CartModal';
import WishListModal from './WishListModal';

export default function Header() {
  const dispatch = useDispatch();
  const {
    shop,
    fabric,
    journal,
    about,
  } = useSelector((state) => state.menu);
  const { products } = useSelector((state) => state.products);
  const wishListProducts = useSelector((state) => state.wishList);
  const cartProducts = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.auth);
  const [showCart, setShowCart] = useState(false);
  const [showWishList, setShowWishList] = useState(false);
  const location = useLocation();

  // Close cart modal if Link to checkout page
  useEffect(() => {
    if (location.pathname === '/cart/checkout') {
      setShowCart(false);
    }
  }, [location.pathname]);

  // Load products if link directly to ProductShow
  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
    }
  }, [products]);

  // Handle menu
  const handleShop = () => dispatch(showShop());
  const handleFabric = () => dispatch(showFabric());
  const handleJournal = () => dispatch(showJournal());
  const handleAbout = () => dispatch(showAbout());

  // Handle show shopping cart
  function handleCart() {
    if (showWishList) {
      setShowWishList(false);
    }

    setShowCart(!showCart);
  }

  // Handle show wishlist
  function handleWishlist() {
    if (showCart) {
      setShowCart(false);
    }

    setShowWishList(!showWishList);
  }

  // Do not render on login/register/validation page
  if (
    location.pathname.includes('/account/login')
    || location.pathname.includes('/account/register')
    || location.pathname.includes('/account/validation')
  ) {
    return <></>;
  }

  return (
    <div className="header">
      <ul className="header-navbar">
        <Link to="/">
          <svg viewBox="0 0 40 80">
            <path d="M38.9811 65.6179L0.972576 79.0502L0.981143 67.4909L38.9896 54.0625M38.9811 65.6179L38.9896 54.0625M38.9811 65.6179L0.989563 52.1291L0.99813 40.5792L19.9939 47.3208L38.9896 54.0625" />
            <path d="M1.01001 26.0827C15.8466 31.3683 24.1649 34.3317 39.0015 39.6173L39.01 28.063C24.1734 22.777 15.8552 19.8133 1.01858 14.5273M1.01001 26.0827L1.01858 14.5273M1.01001 26.0827C15.8533 20.822 24.1753 17.8725 39.0185 12.6117C39.0219 8.08807 39.0238 5.55183 39.0271 1.02817C24.1838 6.29992 15.8618 9.25558 1.01858 14.5273" />
          </svg>
        </Link>
        <li className={shop ? 'item active' : 'item'} onClick={handleShop}>
          Shop
        </li>
        <li className={fabric ? 'item active' : 'item'} onClick={handleFabric}>
          Fabric
        </li>
        <li className={journal ? 'item active' : 'item'} onClick={handleJournal}>
          Journal
        </li>
        <li className={about ? 'item active' : 'item'} onClick={handleAbout}>
          About
        </li>
      </ul>

      <div className="header-actions">
        <Link to="/account/login" style={{ color: 'inherit' }}>
          <span>
            <h1 className={loading ? 'placeholder' : ''}>
              {user && `Welcome, ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}`}
              {loading && ''}
              {!user && !loading && 'Account'}
            </h1>
            <i className="lar la-user-circle" />
          </span>
        </Link>

        <i className="las la-search" />

        <i
          className={showWishList ? 'lar la-heart orange' : 'lar la-heart'}
          onClick={handleWishlist}
        >
          {wishListProducts.length > 0 && (
            <p className="wishlist-length-number">
              {wishListProducts.length}
            </p>
          )}
          {products && <WishListModal products={products} showWishList={showWishList} />}
        </i>

        <i
          className={showCart ? 'cart-icon las la-shopping-bag orange' : 'cart-icon las la-shopping-bag'}
          onClick={handleCart}
        >
          {cartProducts.length > 0 && <p className="cart-length-number">{cartProducts.length}</p>}
        </i>
        <CartModal showCart={showCart} />
      </div>
    </div>
  );
}
