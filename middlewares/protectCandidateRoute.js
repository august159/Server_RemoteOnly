module.exports = function protectCandidateRoute(req, res, next) {
  const { id, role } = req.session.currentUser;
  if (id && role === "candidate") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
