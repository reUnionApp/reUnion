module.exports = (req, res, next) => {
  if (req.user.type === 'owner') {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};
