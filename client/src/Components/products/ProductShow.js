import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchProduct } from '../../actions/productsActions';
import { addWishlistLS, changeWishListDB, clearWishListReducer } from '../../actions/wishListActions';
import { addCart } from '../../actions/cartActions';
import { getReviewsAction, postReviewAction, clearReviewReducer } from '../../actions/reviewActions';
import useRippleButton from '../Hooks/useRippleButton';

const customModalStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -10%)',
  },
};

export default function ProductShow({ match, location }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const { loading, selectedProduct, error } = useSelector((state) => state.products);
  const {
    reviewsLoading, reviews, reviewsError, postReviewLoading, postReview, postReviewError,
  } = useSelector((state) => state.reviews);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { wishListError } = useSelector((state) => state.wishList);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [copyLink, setCopyLink] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Close modal and clear reducer messages
  const closeModal = () => {
    if (wishListError) dispatch(clearWishListReducer());
    if (postReviewError || postReview) dispatch(clearReviewReducer());

    setModalIsOpen(false);
  };

  Modal.setAppElement('#modal');

  // Fetch single product
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  // Fetch product reviews
  useEffect(() => {
    selectedProduct && dispatch(getReviewsAction(selectedProduct._id));
  }, [dispatch, selectedProduct]);

  // Set default size
  useEffect(() => {
    if (selectedProduct) {
      setSize(selectedProduct.sizes[0]);
    }
  }, [selectedProduct]);

  // Open modal when posting a review
  useEffect(() => {
    setModalIsOpen(true);

    if (selectedProduct) {
      dispatch(getReviewsAction(selectedProduct._id));
    }
  }, [postReview, postReviewError]);

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
    useRippleButton(e);

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
    useRippleButton(e);

    setModalIsOpen(true);

    if (isLoggedIn) {
      dispatch(changeWishListDB(selectedProduct._id, sessionStorage.token, user.id));
      return;
    }

    dispatch(addWishlistLS(selectedProduct._id));
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

    useRippleButton(e);

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

  // Return all product information
  function renderProduct() {
    const {
      _id, description, discountPrice, image, name, price, sizes, stock,
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
          {isLoggedIn && user.admin && (
            <Link to={`/products/edit/${_id}`} className="btn">Edit this product</Link>
          )}
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

  // Call post review action
  function handlePostReviewAction(e) {
    e.preventDefault();
    dispatch(postReviewAction(selectedProduct._id, reviewerName, review, rating));
  }

  // Return form for posting reviews
  function renderPostReviewForm() {
    return (
      <form className="review-form" style={{ opacity: postReviewLoading ? '0.5' : '1' }}>
        <h3>Write a review</h3>

        <label>Rating</label>
        <div className="rating">
          <span
            style={{ color: rating >= 5 ? '#ff600a' : '' }}
            onClick={() => setRating(5)}
            className="las la-star star s1"
          />
          <span
            style={{ color: rating >= 4 ? '#ff600a' : '' }}
            onClick={() => setRating(4)}
            className="las la-star star s2"
          />
          <span
            style={{ color: rating >= 3 ? '#ff600a' : '' }}
            onClick={() => setRating(3)}
            className="las la-star star s3"
          />
          <span
            style={{ color: rating >= 2 ? '#ff600a' : '' }}
            onClick={() => setRating(2)}
            className="las la-star star s4"
          />
          <span
            style={{ color: rating >= 1 ? '#ff600a' : '' }}
            onClick={() => setRating(1)}
            className="las la-star star s5"
          />
        </div>

        <label htmlFor="review">Name</label>
        <input type="text" name="review" onChange={(e) => setReviewerName(e.target.value)} />

        <label>Review</label>
        <textarea cols="40" rows="4" onChange={(e) => setReview(e.target.value)} />

        <input type="submit" className="btn" value="Submit review" onClick={(e) => handlePostReviewAction(e)} />
        {postReviewLoading && (
          <div className="loading-container">
            <div className="loading">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
      </form>
    );
  }

  // Return product reviews
  function renderReviews() {
    if (reviews.length === 0) {
      return <h4 className="no-reviews"> No reviews yet. Be the first one to write a review</h4>;
    }

    if (reviewsLoading) {
      return (
        <div className="reviews-placeholder">
          <div className="loading-container">
            <div className="loading">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      );
    }

    if (reviewsError) {
      return <h3 className="no-reviews">Error loading reviews. Please try to refresh the page</h3>;
    }

    return reviews.map((review) => (
      <div className="product-show-review" key={review._id}>
        <div>
          <h3>
            {review.reviewerName} at {new Date(review.date).toLocaleDateString()}
          </h3>
          <span style={{ color: review.rating >= 1 ? '#ff600a' : '' }} className="las la-star star" />
          <span style={{ color: review.rating >= 2 ? '#ff600a' : '' }} className="las la-star" />
          <span style={{ color: review.rating >= 3 ? '#ff600a' : '' }} className="las la-star" />
          <span style={{ color: review.rating >= 4 ? '#ff600a' : '' }} className="las la-star" />
          <span style={{ color: review.rating >= 5 ? '#ff600a' : '' }} className="las la-star" />
        </div>
        <p className="review">{review.review}</p>
      </div>
    ));
  }

  return (
    <div className="product-show">
      {location.state && location.state.editProduct && (
        <div className="success-container">
          Product changes has been made
        </div>
      )}

      {loading && <div>{renderPlaceHolder()}</div>}
      {selectedProduct && <>{renderProduct()}</>}
      {error && <div>error</div>}
      {reviews && (
        <>
          {renderPostReviewForm()}
          {renderReviews()}
        </>
      )}
      {postReview && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{postReview}</h2>
        </Modal>
      )}

      {postReviewError && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{postReviewError}</h2>
        </Modal>
      )}

      {wishListError && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{wishListError}</h2>
        </Modal>
      )}
    </div>
  );
}
