const { ApolloError } = require("apollo-server-express");
const yup = require("yup");
const registerCridentialsSchema = yup.object().shape({
  nick: yup
    .string()
    .required("Nick is required")
    .min(4, "Nick must be atleast 4 characters long")
    .max(16, "Nick cannot be longer than 16 characters")
    .trim(),
  email: yup.string().required().email().trim(),
  password: yup
    .string()
    .required()
    .min(6, "Password must be atleast 6 characters long")
    .max(32, "Nick cannot be longer than 16 characters")
    .trim(),
});

const loginCridentialsSchema = yup.object().shape({
  email: yup.string().required().email().trim(),
  password: yup.string().required().trim(),
});

const validateSchema = (data, type) => {
  switch (type) {
    case "LOGIN":
      return loginCridentialsSchema.validate(data);
    case "REGISTER":
      return registerCridentialsSchema.validate(data);
    default:
      return null;
  }
};

const createValidationError = (error) => {
  throw new ApolloError(capitlize(error.errors[0]), 400);
};

const capitlize = ([first, ...rest]) => {
  return first.toUpperCase() + rest.join("");
};

module.exports = { validateSchema, createValidationError };
