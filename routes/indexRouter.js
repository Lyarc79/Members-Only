const { Router } = require("express");
const { validateSignup } = require("../middlewares/formsValidation");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});
indexRouter.get("/signup", indexController.getSignupForm);
indexRouter.post("/signup", validateSignup, indexController.postSignupForm);

module.exports = indexRouter;
