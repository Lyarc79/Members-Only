const { Router } = require("express");
const {
  validateSignup,
  validateClubPasscode,
  validateMessage,
  validateAdminPasscode,
} = require("../middlewares/formsValidation");
const indexController = require("../controllers/indexController");
const passport = require("passport");
const { isGuest, isAuth, isAdmin } = require("../middlewares/login-check");

const indexRouter = Router();

indexRouter.get("/", indexController.getIndexInfo);
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
indexRouter.get("/new-message", isAuth, indexController.getNewMessageForm);
indexRouter.post(
  "/new-message",
  validateMessage,
  indexController.postNewMessageForm,
);
indexRouter.get("/become-admin", isAuth, indexController.getBecomeAdminForm);
indexRouter.post(
  "/become-admin",
  validateAdminPasscode,
  indexController.postBecomeAdminForm,
);
indexRouter.post(
  "/messages/:id/delete",
  isAdmin,
  indexController.deleteMessage,
);

module.exports = indexRouter;
