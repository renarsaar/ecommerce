import React from 'react';

export default function ProductPreview({ product }) {
  const {
    name, imagePath, previewImage, price, discountPrice, description, sizes, stock,
  } = product;

  return (
    <div className="product-show">
      <h2>Preview</h2>
      <div className="product-show-item">

        <div className="gallery">
          {previewImage
            ? <img src={previewImage} alt={name} />
            : <img src={`http://localhost:8080/${imagePath}`} alt={name} />}

          <div className="share">
            <h3>Share this product</h3>
            <i className="tooltip las la-question-circle" />
            <i className="mobile las la-share-alt-square" />
            <i className="desktop las la-link" />
          </div>
        </div>

        <div className="details">
          <h1 className="name">
            {name}
          </h1>

          <h2 className="price">
            {discountPrice === 0
              ? price
              : discountPrice}
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
                    value={item}
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
                  {stock[0]}
                </p>
              </h2>
            </div>

            <div className="product-actions">
              <button type="button" className="increment">-</button>
              <span>1</span>
              <button type="button" className="decrement">+</button>

              <button type="button" className="btn add-cart">Add to cart</button>

              <div>
                <i className="tooltip las la-question-circle" />

                <button type="button" className="btn add-wishlist">Add to wishlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
