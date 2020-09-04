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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editUserValidation = editUserValidation;
