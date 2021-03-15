const router = require('express').Router();
const { User } = require('../db/models');
const adminsOnly = require('../auth/adminsOnly');
const ownersOnly = require('../auth/ownersOnly');
const coordinatorsOnly = require('../auth/coordinatorsOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');
module.exports = router;

// All Users: GET /api/users

//adminsOnly
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'firstName',
        'lastName',
        'alias',
        'email',
        'dietaryRestrictions',
        'specialRequests',
        'isAdmin',
      ],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Single User: GET /api/users/:userId
// userOrAdminOnly
router.get('/:userID', async (req, res, next) => {
  const id = req.params.userID;
  try {
    const user = await User.findByPk(id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'alias',
        'email',
        'dietaryRestrictions',
        'accessibility',
        'isAdmin',
      ],
      // include: [
      //   {
      //     model: Order,
      //     include: [{ model: Product, through: OrderProduct }],
      //   },
      // ],
    });
    if (!user) {
      res.sendStatus(404).end();
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Single User: DELETE /api/users/:userID
// adminsOnly
router.delete('/:userID', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userID);
    await user.destroy();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Single User: POST /api/users/

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

// Single User: PUT /api/users/:userID
// userOrAdminOnly
router.put('/:userID', async (req, res, next) => {
  const id = req.params.userID;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.sendStatus(404);
    } else {
      await user.update(req.body);
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});
