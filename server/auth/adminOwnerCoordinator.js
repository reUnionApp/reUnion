module.exports = (req, res, next) => {
  console.log('eventIDDDDD', req.params.eventId);
  console.log('req.user.id', req.body.guestId);
  if (
    req.user &&
    (req.user.isAdmin === true || req.user.userID === +req.params.userID)
  ) {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};
