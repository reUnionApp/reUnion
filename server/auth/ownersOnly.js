module.exports = (req, res, next) => {
  if (req.user.type === 'owner') {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};



// req.user &&
//   (req.user.isAdmin === true || req.user.userID === +req.params.userID)
