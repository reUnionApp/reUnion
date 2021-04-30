const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
// activities needs to be associated with the particular event
// router.use('/events/:eventID/activities', require('./activities'));
router.use('/events', require('./events'));
router.use('/events', require('./activities'));
router.use('/events', require('./guestList'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
