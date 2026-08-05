function isGuest(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/");
}

module.exports = {
  isGuest,
  isAuth,
};
