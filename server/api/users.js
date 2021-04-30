const router = require('express').Router();
const { User, Event, UserEvent } = require('../db/models');
const adminsOnly = require('../auth/adminsOnly');
const ownersOnly = require('../auth/ownersOnly');
const coordinatorsOnly = require('../auth/coordinatorsOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');
const { FindInPageOutlined } = require('@material-ui/icons');
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
        'specialRequests',
        'isAdmin',
      ],
      include: {
        model: Event,
      },
    });
    if (!user) {
      res.sendStatus(404).end();
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Single User's Events: GET /api/users/:userId/events
// userOrAdminOnly
router.get('/:userID/events', async (req, res, next) => {
  const id = req.params.userID;
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Event,
      },
    });
    if (!user) {
      res.sendStatus(404).end();
    }
    res.json(user.Events);
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

// Create Psuedo-User: POST /api/users/

router.post('/', async (req, res, next) => {
  try {
    // **** should we seperate findOrCreate and first try to find the User with email and if they exist .addEvent, if they don't exist create user, update, then addEvent?
    console.log(req.body);
    await User.findOrCreate({ where: { email: req.body.email } });
    const endUser = await User.findOne({
      where: { email: req.body.email },
    });
    console.log('END USER --------->', endUser.userType);

    if (endUser.userType === 'basic') {
      await endUser.update(
        { firstName: req.body.firstName, lastName: req.body.lastName },
        { where: { userType: 'basic' } }
      );
      res.status(201).json(endUser);
    }

    // await endUser.update(
    //   { firstName: req.body.firstName, lastName: req.body.lastName },
    //   { where: { userType: 'basic' }, returning: true }
    // );
    await endUser.addEvent(req.body.eventId);

    // ******* if the user exists we shouldn't send a post request ******
    // res.status(201).json(endUser);
  } catch (error) {
    next(error);
  }
});

// Single User: PUT /api/users/:userID
// userOrAdminOnly
router.put('/:userID', async (req, res, next) => {
  const id = req.params.userID;

  req.body.specialRequests = [req.body.specialRequests];
  req.body.dietaryRestrictions = [req.body.dietaryRestrictions];

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.sendStatus(404);
    } else {
      await user.update(req.body);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});
