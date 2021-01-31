import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../actions/productsActions';
import { addWishlist } from '../../actions/wishListActions';
import { addCart } from '../../actions/cartActions';
import RippleButton from '../../Helpers/RippleButton';

export default function ProductShow({ match, location }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const { loading, selectedProduct, error } = useSelector((state) => state.products);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [copyLink, setCopyLink] = useState(false);

  // Fetch single product
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  // Set default size
  useEffect(() => {
    if (selectedProduct) {
      setSize(selectedProduct.sizes[0]);
    }
  }, [selectedProduct]);

  // Clear clipboard link timeout
  useEffect(() => {
    const linkTimeOut = window.setTimeout(() => {
      setCopyLink(false);
    }, 4000);

    return () => {
      window.clearTimeout(linkTimeOut);
    };
  }, [copyLink]);

  // Copy link to clipboard
  function handleShareLink() {
    navigator.clipboard.writeText(location.pathname);
    setCopyLink(true);
  }

  // Web Share API
  async function handleWebShare(name) {
    const shareData = {
      title: name,
      text: 'VRA Ecommerce',
      url: location.pathname,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle product quantity
  function handleQuantity(e) {
    RippleButton(e);

    const { value } = e.target;

    // Find the index of the size in the stock array
    const index = selectedProduct.sizes.findIndex((itemSize) => itemSize === size);

    if (value === 'increment') {
      setQuantity((currQuantity) => currQuantity + 1);
      if (quantity >= selectedProduct.stock[index]) setQuantity(selectedProduct.stock[index]);
    }

    if (value === 'decrement') {
      setQuantity((currQuantity) => currQuantity - 1);
      if (quantity <= 1) setQuantity(1);
    }
  }

  // Add product to wishlist
  function handlewishList(e) {
    RippleButton(e);

    dispatch(addWishlist(selectedProduct._id));
  }

  // Add product to shopping cart
  function handleCart(e) {
    const { stock, sizes } = selectedProduct;
    const product = {
      id: selectedProduct._id,
      key: `${selectedProduct._id}-${size}`,
      name: selectedProduct.name,
      image: selectedProduct.image,
      productPrice: selectedProduct.discountPrice,
      totalPrice: selectedProduct.discountPrice * quantity,
      stock: stock[sizes.indexOf(size)],
      quantity,
      size,
    };

    RippleButton(e);

    dispatch(addCart(product));
  }

  // Placeholder for product
  function renderPlaceHolder() {
    return (
      <div className="product-show-item">
        <div className="gallery">
          <div className="img placeholder" />
        </div>

        <div className="details">
          <h1 className="name placeholder" />
          <h2 className="price placeholder" />

          <div className="container">
            <div className="size">
              <h2 className="placeholder" />
              <h2 className="placeholder" />
              <h2 className="placeholder" />
              <h2 className="placeholder" />
              <h2 className="placeholder" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderProduct() {
    const {
      description, discountPrice, image, name, price, sizes, stock,
    } = selectedProduct;

    return (
      <div className="product-show-item">
        <div className="gallery">
          <img src={`http://localhost:8080/${image}`} alt={name} />
          <div className="share">
            <h3>Share this product</h3>
            <i className="tooltip las la-question-circle">
              <span className="tooltiptext">Share this product via shareable link</span>
            </i>
            <i className="mobile las la-share-alt-square" onClick={() => handleWebShare(name)} />
            <i className="desktop las la-link" onClick={handleShareLink} />
            <div className={copyLink ? 'clipboard show' : 'clipboard'}>
              <h4>Link copied to clipboard</h4>
            </div>
          </div>
        </div>

        <div className="details">
          <h1 className="name">{name}</h1>
          <h2 className="price">
            {discountPrice === price ? price : discountPrice}
            €
          </h2>
          <div className="container">
            <div className="description">
              <h2>Description</h2>
              <ul>
                {description.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="size">
              <h2>Size</h2>
              <ul>
                {sizes.map((item) => (
                  <li
                    className={size === item ? 'selected' : ''}
                    value={item}
                    onClick={() => setSize(item)}
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="quantity">
              <h2>
                Quantity
                <p>
                  Stock:
                  {' '}
                  {stock[sizes.indexOf(size)] === 0 ? 'Out of Stock' : stock[sizes.indexOf(size)]}
                </p>
              </h2>
            </div>

            <div className="product-actions" style={{ display: stock[sizes.indexOf(size)] == 0 ? 'none' : 'block' }}>
              <button type="button" value="decrement" className="increment" onClick={handleQuantity}>-</button>
              <span>{quantity}</span>
              <button type="button" value="increment" className="decrement" onClick={handleQuantity}>+</button>

              <button type="button" className="btn add-cart" onClick={handleCart}>Add to cart</button>

              <div>
                <i className="tooltip las la-question-circle">
                  <span className="tooltiptext">All the products in wishlist can be accessed via heart icon</span>
                </i>

                <button type="button" className="btn add-wishlist" onClick={handlewishList}>Add to wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-show">
      {loading && <div>{renderPlaceHolder()}</div>}
      {selectedProduct && <>{renderProduct()}</>}
      {error && <div>error</div>}
    </div>
  );
}
