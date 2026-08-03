const { body } = require("express-validator");
const db = require("../db/queries");

const validateSignup = [
  body("firstName")
    .trim()
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage("Name cannot contain numbers.")
    .isLength({ min: 1, max: 20 })
    .withMessage("Name must be between 1 and 20 characters."),

  body("lastName")
    .trim()
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage("Last name cannot contain numbers.")
    .isLength({ min: 1, max: 20 })
    .withMessage("Last name must be between 1 and 20 characters."),

  body("username")
    .trim()
    .isEmail()
    .withMessage("You must enter a valid email adress (e.g., example@mail.com)")
    .custom(async (value) => {
      const user = await db.findUserByUsername(value);
      if (user) {
        throw new Error("E-mail is already in use");
      }
    }),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 5 characters."),

  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords don't match"),
];

module.exports = {
  validateSignup,
};
