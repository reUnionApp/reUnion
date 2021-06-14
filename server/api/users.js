const router = require('express').Router();
const { User, Event, UserEvent, Activity } = require('../db/models');
const adminsOnly = require('../auth/adminsOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');
const { FindInPageOutlined } = require('@material-ui/icons');
const adminOwnerCoordinator = require('../auth/adminOwnerCoordinator');
module.exports = router;


// All Users: GET /api/users

router.get('/', adminsOnly, async (req, res, next) => {
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

router.get('/:userID', userOrAdminOnly, async (req, res, next) => {
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

router.get('/:userID/events', userOrAdminOnly, async (req, res, next) => {
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

// Single User's Single Event: GET /api/users/:userId/events/:eventId

router.get('/:userId/events/:eventId', userOrAdminOnly, async (req, res, next) => {
  console.log('our NEW route has been HIT!!!');
  const eventId = req.params.eventId;
  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      res.sendStatus(404).end();
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
});

// Single User: DELETE /api/users/:userID

router.delete('/:userID', userOrAdminOnly, async (req, res, next) => {
  try {

    const getUserEvents = await User.findByPk(req.params.userID, {
      include: {
        model: Event,
        include: {
          model: Activity
        }
      },
    });

    await getUserEvents.dataValues.Events.forEach(async (event) => {
      event.Activities.forEach(async (activity) => {
        await activity.destroy();
      });
      await event.destroy();
    })
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
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      await existingUser.addEvent(req.body.eventId);
      res.status(201).json(existingUser);
    } else {
      const newUser = await User.create(req.body);
      await newUser.addEvent(req.body.eventId);
      res.status(201).json(newUser);
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Email is already in guest list');
    } else {
      next(error);
    }
  }
});

// Single Pseudo User: PUT /api / users /: userID/psuedo

router.put('/pseudo/:eventID', adminOwnerCoordinator, async (req, res, next) => {
  console.log('magic methodsssss', Object.keys(User.prototype))
  console.log(88888888, req.body)
  const id = req.body.updatedInfo.id;
  try {
    const user = await User.findByPk(id);

    const eventInstance = await UserEvent.findOne({
      where: {
        EventId: req.params.eventID,
        UserId: req.body.updatedInfo.id
      }
    })

    if (!user) {
      res.sendStatus(404);
    } else if (
      user.dataValues.userType === 'registered' &&
      req.session.passport.user !== id
    ) {
      res.status(401).send('Cannot update registered user');
    } else {
      await eventInstance.update({ isCoordinator: req.body.updatedInfo.coordStatus })
      await user.update(req.body.updatedInfo);
      console.log('user in pseudo api route', user);
      res.status(200).json(user);
    }
  } catch (error) {
    if (error.errors) {
      if (error.errors[0].message === 'email must be unique') {
        res.status(401).send('Email is already registered');
      }
    } else {
      next(error);
    }
  }
});


// Single User: PUT /api/users/:userID

router.put('/:userID', userOrAdminOnly, async (req, res, next) => {
  const id = req.params.userID;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.sendStatus(404);
    } else if (
      user.dataValues.userType === 'registered' &&
      req.session.passport.user !== Number(id)
    ) {
      res.status(401).send('Cannot update registered user');
    } else {
      await user.update(req.body);
      res.status(200).json(user);
    }
  } catch (error) {
    if (error.errors) {
      if (error.errors[0].message === 'email must be unique') {
        res.status(401).send('Email is already registered');
      }
    } else {
      next(error);
    }
  }
});
