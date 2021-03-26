module.exports = function protectRecruiterRoute(req, res, next) {
  const { id, role } = req.session.currentUser;
  if (id && role === "recruiter") {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
