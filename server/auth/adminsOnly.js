module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};
