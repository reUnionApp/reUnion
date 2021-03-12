const router = require('express').Router();
const { User } = require('../db/models');
const adminsOnly = require('../auth/adminsOnly');

// GET /api/users "All Users"
router.get('/', adminsOnly, async (req, res, next) => {
  try {
    let user = await User.findAll({
      include: [
        {
          model: Event,
          include: [Product],
        },
      ],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
