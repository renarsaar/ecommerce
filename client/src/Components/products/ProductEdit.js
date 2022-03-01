import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import ProductPreview from './ProductPreview';
import ProductChangeForm from './ProductChangeForm';
import {
  editProductAction, clearProductReducer, fetchProducts,
} from '../../actions/productsActions';

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

Modal.setAppElement('#modal');

class ProductEdit extends React.Component {
  state = {
    modalIsOpen: true,
    brand: '',
    description: [''],
    discountPrice: '',
    gender: 'Male',
    name: '',
    previewImage: '',
    uploadedImage: '',
    imagePath: '',
    price: '',
    sizes: [''],
    stock: [''],
    subCategory: '',
    category: 'Apparels',
    otherCategory: false,
  };

  componentDidMount = () => {
    const {
      brand, description, discountPrice, gender, name,
      image, price, sizes, stock, subCategory, category,
    } = this.props.selectedProduct;

    this.setState({
      brand,
      description,
      discountPrice,
      gender,
      name,
      imagePath: image,
      price,
      sizes,
      stock,
      subCategory,
      category,
    });
  }

  // Clear product reducer
  componentWillUnmount = () => this.props.clearProductReducer();

  // Handle form fields change
  handleChange = (e, index) => {
    const { name, value, files } = e.target;
    const { sizes, stock, description } = this.state;
    const newSizesArray = [...sizes];
    const newStockArray = [...stock];
    const newDesctiptionArray = [...description];

    switch (name) {
      case 'sizes':
        newSizesArray[index] = value;

        this.setState({ sizes: newSizesArray });
        break;

      case 'stock':
        newStockArray[index] = +value;

        this.setState({ stock: newStockArray });
        break;

      case 'description':
        newDesctiptionArray[index] = value;

        this.setState({ description: newDesctiptionArray });
        break;

      case 'image':
        this.setState({ uploadedImage: files[0] });
        this.setState({ previewImage: window.URL.createObjectURL(files[0]) });
        break;

      case 'price':
      case 'discountPrice':
        this.setState({ [name]: +value });
        break;

      case 'subCategory':
        if (value === '') {
          this.setState({ otherCategory: false });
        }

        if (value === 'Other') {
          this.setState({ [name]: value, otherCategory: true });
        }

        this.setState({ [name]: value });

        break;

      default:
        this.setState({ [name]: value });
    }
  }

  // Close modal
  closeModal = () => this.props.clearProductReducer();

  // Remove description item
  removeDescription = (index) => {
    const { description } = this.state;
    const newDesctiptionArray = [...description];

    newDesctiptionArray.splice(index, 1);

    this.setState({ description: newDesctiptionArray });
  }

  // Add a new empty description item
  addDescription = (index) => {
    const { description } = this.state;

    // Prevent adding another column if fields empty
    if (Object.values(description).includes('')) {
      return false;
    }

    const newDesctiptionArray = [...description];
    newDesctiptionArray.splice(index + 1, 0, '');

    this.setState({ description: newDesctiptionArray });
  }

  // Add an empty column of stock and size
  addStockColumn = (index) => {
    const { stock, sizes } = this.state;

    // Prevent adding another column if fields empty
    if (Object.values(stock).includes('') || Object.values(sizes).includes('')) {
      return false;
    }

    const newSizesArray = [...sizes];
    const newStockArray = [...stock];

    // Add empty fields after selected column
    newStockArray.splice(index + 1, 0, '');
    newSizesArray.splice(index + 1, 0, '');

    this.setState({ sizes: newSizesArray, stock: newStockArray });
  }

  // Remove an empty column of stock and size
  removeStockColumn = (index) => {
    const { stock, sizes } = this.state;
    const newSizesArray = [...sizes];
    const newStockArray = [...stock];

    // Remove fields
    newStockArray.splice(index, 1);
    newSizesArray.splice(index, 1);

    this.setState({ sizes: newSizesArray, stock: newStockArray });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {
      brand, description, discountPrice, gender, name,
      uploadedImage, category, price, sizes, stock, subCategory,
    } = this.state;
    const { selectedProduct, editProductAction } = this.props;

    const formData = new FormData();
    formData.append('image', uploadedImage);
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('gender', gender);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('description', JSON.stringify(description));
    formData.append('stock', JSON.stringify(stock));
    formData.append('price', price);
    formData.append('discountPrice', discountPrice);

    editProductAction(selectedProduct._id, sessionStorage.token, formData);
  }

  render() {
    const {
      brand, description, discountPrice, gender, name,
      imagePath, previewImage, price, sizes, stock, subCategory,
      category, modalIsOpen, uploadedImage, otherCategory,
    } = this.state;
    const { editProductError, products } = this.props;
    const product = {
      name,
      imagePath,
      previewImage,
      uploadedImage,
      brand,
      category,
      subCategory,
      gender,
      sizes,
      description,
      stock,
      price,
      discountPrice,
    };

    return (
      <>
        <div className="container-high product-edit">
          <h1>Edit product</h1>

          <ProductChangeForm
            product={product}
            products={products}
            otherCategory={otherCategory}
            handleChange={this.handleChange}
            addDescription={this.addDescription}
            removeDescription={this.removeDescription}
            addStockColumn={this.addStockColumn}
            removeStockColumn={this.removeStockColumn}
            handleSubmit={this.onSubmit}
          />
        </div>

        {editProductError && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.closeModal}
            style={customModalStyles}
          >
            <h2>{editProductError}</h2>
          </Modal>
        )}

        <ProductPreview product={product} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  selectedProduct: state.products.selectedProduct,
  editProductError: state.products.editProductError,
  editProduct: state.products.editProduct,
});

export default connect(mapStateToProps, {
  editProductAction, clearProductReducer, fetchProducts,
})(ProductEdit);
