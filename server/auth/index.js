const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser && existingUser.userType === 'registered') {
      res.status(401).send('User already exists');
    } else if (existingUser && existingUser.userType === 'basic') {
      await existingUser.update(req.body);
      await existingUser.update({ userType: 'registered' });
      req.login(existingUser, (err) =>
        err ? next(err) : res.json(existingUser)
      );
    } else {
      const user = await User.create(req.body);
      await user.update({ userType: 'registered' });
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

//replace this with amazon cognito
// router.use("/google", require("./google"));
