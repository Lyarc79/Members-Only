const { Router } = require("express");
const {
  validateSignup,
  validateClubPasscode,
} = require("../middlewares/formsValidation");
const indexController = require("../controllers/indexController");
const passport = require("passport");
const { isGuest, isAuth } = require("../middlewares/login-check");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});
indexRouter.get("/signup", isGuest, indexController.getSignupForm);
indexRouter.post("/signup", validateSignup, indexController.postSignupForm);
indexRouter.get("/login", isGuest, indexController.getLoginForm);
indexRouter.post("/login", indexController.postLoginForm);
indexRouter.get("/logout", indexController.logoutUser);
indexRouter.get("/join-club", isAuth, indexController.getJoinClubForm);
indexRouter.post(
  "/join-club",
  validateClubPasscode,
  indexController.postJoinClubForm,
);

module.exports = indexRouter;
