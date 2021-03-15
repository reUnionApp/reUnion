const router = require('express').Router();
const { User } = require('../db/models');
const adminsOnly = require('../auth/adminsOnly');
const ownersOnly = require('../auth/ownersOnly');
const coordinatorsOnly = require('../auth/coordinatorsOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');

// All Users: GET /api/users

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'userID',
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
router.get('/:userID', userOrAdminOnly, async (req, res, next) => {
  const id = req.params.userID;
  try {
    const user = await User.findByPk(id, {
      attributes: [
        'userID',
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

router.delete('/:userID', adminsOnly, async (req, res, next) => {
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

router.put('/:userID', userOrAdminOnly, async (req, res, next) => {
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
