const Joi = require('joi');

// Register validation
function registerValidation(data) {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
  });

  return schema.validate(data);
}

// Login validation
function loginValidation(data) {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required(),
  });

  return schema.validate(data);
}

// Edit user validation
function editUserValidation(data) {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .required(),
  });

  return schema.validate(data);
}

// Add product validation
function addProductValidation(data) {
  const schema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    subCategory: Joi.string().required(),
    gender: Joi.string(),
    sizes: Joi.array(),
    description: Joi.array().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
    discountPrice: Joi.number(),
    image: Joi.string(),
  });

  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editUserValidation = editUserValidation;
module.exports.addProductValidation = addProductValidation;