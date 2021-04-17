import React from 'react';

export default function ProductPreview({ product }) {
  const {
    name, imagePath, previewImage, price, discountPrice, description, sizes, stock,
  } = product;

  return (
    <div className="container">
      <h2>Preview</h2>
      <div className="product-show flex">

        <div className="gallery">
          {previewImage || imagePath
            ? <img src={previewImage || imagePath} alt={name} />
            : <div className="img placeholder" />}

          <div className="share mb-2">
            <h3>Share this product</h3>
            <i className="tooltip las la-question-circle" />
            <i className="mobile las la-share-alt-square" />
            <i className="desktop las la-link" />
          </div>
        </div>

        <div className="details ml-3">
          <h1 className="name">
            {name}
          </h1>

          <h2 className="price orange">
            {discountPrice === 0
              ? price
              : discountPrice}
            €
          </h2>

          <div className="details-container">
            <div className="description">
              <h2>Description</h2>
              <ul>
                {description.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="size">
              <h3 className="txt-uppercase mt-2 mb-1">Size</h3>
              <ul className="mb-2">
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
              <h3 className="mt-2 mb-1 txt-uppercase">
                Quantity
                <p className="inline">
                  Stock:
                  {' '}
                  {stock[0]}
                </p>
              </h3>
            </div>

            <div className="product-actions">
              <button type="button" className="increment">-</button>
              <span>1</span>
              <button type="button" className="decrement">+</button>

              <button type="button" className="btn add-cart">Add to cart</button>

              <div className="add-wishlist-container inline">
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
