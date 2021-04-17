import React from 'react';

export default function ProductChangeForm({
  product, handleChange, handleSubmit, addDescription,
  removeDescription, addStockColumn, removeStockColumn,
  otherCategory, products,
}) {
  const {
    brand, description, discountPrice, gender, name,
    price, sizes, stock, subCategory, category,
  } = product;

  // Return select options
  function handleSubCategories() {
    const apparels = [];

    if (products) {
      products.forEach((product) => {
        if (product.category === 'Apparels') {
          // Do not add duplicates
          if (!apparels.includes(product.subCategory)) {
            apparels.push(product.subCategory);
          }
        }

        return false;
      });

      apparels.push('Other');

      return (
        <>
          <label>Sub category</label>
          <select
            name="subCategory"
            onChange={(e) => handleChange(e)}
            value={apparels.includes(subCategory) || subCategory === '' ? subCategory : 'Other'}
          >
            {apparels.map((apparel) => <option key={apparel}>{apparel}</option>)}
          </select>
        </>
      );
    }
  }

  return (
    <form className="product-edit-form mt-1" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        defaultValue={name}
        onChange={(e) => handleChange(e)}
      />

      <label>Brand</label>
      <input
        type="text"
        name="brand"
        defaultValue={brand}
        onChange={(e) => handleChange(e)}
      />

      <label>Description</label>
      {description.map((item, index) => (
        <div className="description-item" key={item}>
          <input
            type="text"
            name="description"
            defaultValue={item}
            onBlur={(e) => handleChange(e, index)}
          />

          <div className="ml-1">
            <i className="tooltip las red la-minus-circle" onClick={() => removeDescription(index)} >
              <span className="tooltiptext">Delete this row</span>
            </i>

            <i className="tooltip las green la-plus-circle" onClick={() => addDescription(index)} >
              <span className="tooltiptext">Add a field after this row</span>
            </i>
          </div>
        </div>
      ))}

      <div className="flex-inputs">
        <div>
          <label>Sizes</label>
          {sizes.map((item, index) => (
            <input
              type="text"
              name="sizes"
              key={item}
              defaultValue={item}
              onBlur={(e) => handleChange(e, index)}
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
                onBlur={(e) => handleChange(e, index)}
              />

              <i className="tooltip las red la-minus-circle" onClick={() => removeStockColumn(index)} >
                <span className="tooltiptext">Delete this row</span>
              </i>

              <i className="tooltip las green la-plus-circle" onClick={() => addStockColumn(index)} >
                <span className="tooltiptext">Add a field after this row</span>
              </i>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-inputs">
        <div>
          {handleSubCategories()}

          {otherCategory === true && (
            <>
              <h4>Please specify</h4>
              <input
                type="text"
                name="subCategory"
                onChange={(e) => handleChange(e)}
              />
            </>
          )}
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            onChange={(e) => handleChange(e)}
            defaultValue={category}
          >
            <option>Apparels</option>
          </select>
        </div>
      </div>

      <div className="flex-inputs">
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            defaultValue={price}
            min="0"
            step=".01"
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div className="flex-inputs mb-2">
        <div>
          <label>Gender</label>
          <select
            name="gender"
            onChange={(e) => handleChange(e)}
            defaultValue={gender}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Unisex</option>
          </select>
        </div>

        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <input type="submit" className="btn" value="Confirm Changes" />
    </form>
  );
}
