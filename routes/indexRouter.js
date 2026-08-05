const { Router } = require("express");
const { validateSignup } = require("../middlewares/formsValidation");
const indexController = require("../controllers/indexController");
const passport = require("passport");
const { isGuest } = require("../middlewares/login-check");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});
indexRouter.get("/signup", isGuest, indexController.getSignupForm);
indexRouter.post("/signup", validateSignup, indexController.postSignupForm);
indexRouter.get("/login", isGuest, indexController.getLoginForm);
indexRouter.post("/login", indexController.postLoginForm);
indexRouter.get("/logout", indexController.logoutUser);

module.exports = indexRouter;
