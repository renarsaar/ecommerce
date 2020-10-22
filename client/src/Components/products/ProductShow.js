import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../actions';

export default function ProductShow({ match, location }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const { loading, selectedProduct, error } = useSelector((state) => state.products);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [copyLink, setCopyLink] = useState(false);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch]);

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
    const { value } = e.target;

    if (value === 'increment') {
      setQuantity((currQuantity) => currQuantity + 1);
      if (quantity >= selectedProduct.stock) setQuantity(selectedProduct.stock);
    }

    if (value === 'decrement') {
      setQuantity((currQuantity) => currQuantity - 1);
      if (quantity <= 1) setQuantity(1);
    }
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
                  {stock}
                </p>
              </h2>
              <button type="button" value="decrement" className="increment" onClick={handleQuantity}>-</button>
              <span>{quantity}</span>
              <button type="button" value="increment" className="decrement" onClick={handleQuantity}>+</button>
              <button type="button" className="btn add-cart">Add to cart</button>
              <div>
                <i className="tooltip las la-question-circle">
                  <span className="tooltiptext">All the products in wishlist can be accessed via heart icon</span>
                </i>
                <button type="button" className="btn add-wishlist">Add to wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-show">
      {loading && <div>Loading</div>}
      {selectedProduct && <>{renderProduct()}</>}
      {error && <div>error</div>}
    </div>
  );
}
