module.exports = function protectPrivateRoute(req, res, next) {
  const { id, role } = req.session.currentUser;
  if (id && role === "recruiter") next();
  else res.redirect("/signin");
};
