module.exports = function protectRoute(req, res, next) {
  const { id } = req.session.currentUser;
  if (id) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
