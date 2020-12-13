const router = require('express').Router();
const multer = require('multer');
const Product = require('../model/Product');
const { addProductValidation } = require('../validation');

// Store files to /uploads
const storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, './uploads/');
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});

// Reject files that are not images
const fileFilter = (req, file, res) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    res(null, true);
  } else {
    res(new Error('Only PNG, JPG & JPEG files allowed'), false);
  }
};

// Init multer
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

// @desc    Get all products
// @route   GET /products
router.get('/', paginatedResults(Product), async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get single product
// @route   GET /products/:id
router.get('/:id', getProduct, async (req, res) => {
  try {
    const product = await res.product;
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Add a product
// @route   POST /products
router.post('/', upload.single('image'), async (req, res) => {
  // Validation
  const { error } = addProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    subCategory: req.body.subCategory,
    gender: req.body.gender,
    sizes: req.body.sizes,
    description: req.body.description,
    stock: req.body.stock,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    image: req.file.path,
  });

  // Add a product
  try {
    await product.save();
    res.status(201).send({ product });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }

  product.save().then((item) => res.json(item));
});

// @desc    Edit a product
// @route   PATCH /products/:id
router.patch('/:id', getProduct, async (req, res) => {
  // Check for user input
  if (req.body.name) res.product.name = req.body.name;
  if (req.body.brand) res.product.brand = req.body.brand;
  if (req.body.category) res.product.category = req.body.category;
  if (req.body.subCategory) res.product.subCategory = req.body.subCategory;
  if (req.body.gender) res.product.gender = req.body.gender;
  if (req.body.sizes) res.product.sizes = req.body.sizes;
  if (req.body.description) res.product.description = req.body.description;
  if (req.body.stock) res.product.stock = req.body.stock;
  if (req.body.price) res.product.price = req.body.price;
  if (req.body.discountPrice) res.product.discountPrice = req.body.discountPrice;

  // Validation
  const { error } = addProductValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update product
  try {
    const updatedProduct = await res.product.save();
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Delete a product
// @route   POST /products/:id
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Product by ID Middleware
async function getProduct(req, res, next) {
  let product;

  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }

  res.product = product;
  next();
}

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }
    try {
      results.results = await model.find();
      results.paginatedResults = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = router;
