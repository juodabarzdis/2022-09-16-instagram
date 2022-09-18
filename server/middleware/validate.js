import Joi from "joi";

const validate = (schema, req, res, next) => {
  const options = {
    abortEarly: true, // jei true, radus klaida, netikrina kitu laukeliu
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);

  let message = "";

  console.log(message);
  if (error) {
    switch (error.details[0].path[0]) {
      case "username":
        message = "Incorrect username";
        break;
      case "first_name":
        message = "Incorrectly entered first name";
        break;
      case "last_name":
        message = "Incorrectly entered last name";
        break;
      case "email":
        message = "Email is format is incorrect";
        break;
      case "password":
        message = "Password is too short";
        break;
      default:
        message = "Incorrectly entered data";
        break;
    }
    return res.status(500).send(message);
  }
  console.log(value);
  req.body = value;
  next();
};

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().min(2).max(50).required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().min(2).max(50).required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const postValidator = (req, res, next) => {
  const schema = Joi.object({
    caption: Joi.string().max(255).allow(""),
    author_image: Joi.string().max(255).allow(""),
    username: Joi.string().min(2).max(50).required(),
    userId: Joi.number().required(),
    image: Joi.string().allow(""),
  });

  validate(schema, req, res, next);
};

export const commentsValidator = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string().min(1).max(100).required(),
    username: Joi.string().min(2).max(50).required(),
    postId: Joi.number().required(),
    userId: Joi.number().required(),
  });

  validate(schema, req, res, next);
};

export const ratingsValidator = (req, res, next) => {
  const schema = Joi.object({
    like: Joi.number().required(),
    userId: Joi.number().required(),
  });
  validate(schema, req, res, next);
};

export default validate;
