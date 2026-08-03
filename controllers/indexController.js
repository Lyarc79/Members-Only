const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

async function postSignupForm(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup");
  }
  const { firstName, lastName, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.createUser(firstName, lastName, username, hashedPassword);
  res.redirect("/login");
}
