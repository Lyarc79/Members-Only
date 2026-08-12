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
    .withMessage(
      "You must enter a valid email adress (e.g., example@mail.com).",
    )
    .custom(async (value) => {
      const user = await db.getUserByUsername(value);
      if (user) {
        throw new Error("E-mail is already in use.");
      }
    }),

  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be longer than 5 characters."),

  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords don't match."),
];

const validateClubPasscode = [
  body("password")
    .trim()
    .toLowerCase()
    .isLength({ min: 2, max: 10 })
    .withMessage("The answer is longer than 2 characters and shorter than 10.")
    .custom((value) => {
      const correctPasscode = process.env.CLUB_PASSCODE;
      if (value !== correctPasscode) {
        throw new Error("That's not the answer to the riddle!");
      }
      return true;
    }),
];

const validateMessage = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Title must be between 1 and 30 characters long."),

  body("body")
    .trim()
    .isLength({ min: 10, max: 400 })
    .withMessage("Message content must be between 10 and 400 characters long."),
];

const validateAdminPasscode = [
  body("password")
    .trim()
    .custom((value) => {
      const correctPasscode = process.env.ADMIN_PASSCODE;
      if (value !== correctPasscode) {
        throw new Error("That's not the admin password.");
      }
      return true;
    }),
];

module.exports = {
  validateSignup,
  validateClubPasscode,
  validateMessage,
  validateAdminPasscode,
};
