import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import ProductPreview from './ProductPreview';
import { editProductAction, clearEditProduct } from '../../actions/productsActions';

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
    description: [],
    discountPrice: '',
    gender: '',
    name: '',
    previewImage: '',
    uploadedImage: '',
    imagePath: '',
    price: '',
    sizes: [],
    stock: [],
    subCategory: '',
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
  componentWillUnmount = () => this.props.clearEditProduct();

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

      default:
        this.setState({ [name]: value });
    }
  }

  // Close modal
  closeModal = () => this.props.clearEditProduct();

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
      category, modalIsOpen, uploadedImage,
    } = this.state;
    const { editProductError } = this.props;
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
        <div className="product-edit">
          <h1>Edit product</h1>

          <form className="product-edit-form" onSubmit={this.onSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Brand</label>
            <input
              type="text"
              name="brand"
              defaultValue={brand}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Description</label>
            {description.map((item, index) => (
              <div className="description-item" key={item}>
                <input
                  type="text"
                  name="description"
                  defaultValue={item}
                  onBlur={(e) => this.handleChange(e, index)}
                />

                <div>
                  <i className="tooltip las red la-minus-circle" onClick={() => this.removeDescription(index)} >
                    <span className="tooltiptext">Delete this row</span>
                  </i>

                  <i className="tooltip las green la-plus-circle" onClick={() => this.addDescription(index)} >
                    <span className="tooltiptext">Add a field after this row</span>
                  </i>
                </div>
              </div>
            ))}

            <div className="flex-between">
              <div>
                <label>Sizes</label>
                {sizes.map((item, index) => (
                  <input
                    type="text"
                    name="sizes"
                    key={item}
                    defaultValue={item}
                    onBlur={(e) => this.handleChange(e, index)}
                  />
                ))}
              </div>

              <div>
                <label>Stock</label>
                {stock.map((item, index) => (
                  <div
                    className="stock-item"
                    key={stock.includes(item) ? `${item}-${sizes[index]}` : item}
                  >
                    <input
                      type="text"
                      name="stock"
                      defaultValue={item}
                      onBlur={(e) => this.handleChange(e, index)}
                    />

                    <i className="tooltip las red la-minus-circle" onClick={() => this.removeStockColumn(index)} >
                      <span className="tooltiptext">Delete this row</span>
                    </i>

                    <i className="tooltip las green la-plus-circle" onClick={() => this.addStockColumn(index)} >
                      <span className="tooltiptext">Add a field after this row</span>
                    </i>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-between">
              <div>
                <label>Sub category</label>
                <input
                  type="text"
                  name="subCategory"
                  defaultValue={subCategory}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>

              <div>
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={category}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>

            <div className="flex-between">
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={price}
                  min="0"
                  step=".01"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>

              <div>
                <label>Discount price</label>
                <input
                  type="number"
                  name="discountPrice"
                  min="0"
                  step=".01"
                  defaultValue={discountPrice}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>

            <div className="flex-between">
              <div>
                <label>Gender</label>
                <input
                  type="text"
                  name="gender"
                  defaultValue={gender}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>

              <div>
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>

            <input className="btn" type="submit" value="Confirm Changes" />
          </form>

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
  selectedProduct: state.products.selectedProduct,
  editProductError: state.products.editProductError,
  editProduct: state.products.editProduct,
});

export default connect(mapStateToProps, { editProductAction, clearEditProduct })(ProductEdit);
