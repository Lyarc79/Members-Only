const { Router } = require("express");
const { validateSignup } = require("../middlewares/formsValidation");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});
indexRouter.get("/signup", (req, res) => {
  res.render("signup");
});
indexRouter.post("/signup", validateSignup, indexController.postSignupForm);
