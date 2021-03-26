module.exports = function protectPrivateRoute(req, res, next) {
  const { id, role } = req.session.currentUser;
  if (id && role === "candidate") next();
  else res.redirect("/signin");
};
