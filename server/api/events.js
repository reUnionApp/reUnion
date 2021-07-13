const router = require('express').Router();
const adminsOnly = require('../auth/adminsOnly');
const adminOwnerCoordinator = require('../auth/adminOwnerCoordinator');
const userOrAdminOnly = require('../auth/userOrAdminOnly');
const guestOrAdmin = require('../auth/guestOrAdmin');
const ownerOrAdmin = require('../auth/ownerOrAdmin');
const { Event, Activity, User, UserEvent } = require('../db/models');
module.exports = router;

// All Events: GET /api/events

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const events = await Event.findAll({ include: User });
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

// Single Event: GET /api/events/:eventID

router.get('/:eventID', guestOrAdmin, async function (req, res, next) {
  const id = req.params.eventID;
  try {
    const thisEvent = await Event.findByPk(id);

    if (!thisEvent) {
      res.sendStatus(404).end();
    }
    res.status(200).json(thisEvent);
  } catch (error) {
    next(error);
  }
});

// Single Event: DELETE /api/events/:eventID

router.delete('/:eventID', ownerOrAdmin, async (req, res, next) => {
  try {
    await Activity.destroy({
      where: {
        EventId: req.params.eventID,
      },
    });
    const event = await Event.findByPk(req.params.eventID);
    await event.destroy();
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

// Single Event: POST /api/events/

router.post('/', async (req, res, next) => {
  try {
    req.body.eventName = `${req.body.eventName}~${req.body.ownerId}`;
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
    newEvent.setUsers(req.body.ownerId, { through: { isOwner: true, rsvpStatus: 'accepted' } });
  } catch (error) {
    next(error);
  }
});

// Single Event: PUT /api/events/:eventID

router.put('/:eventID', adminOwnerCoordinator, async (req, res, next) => {
  const id = req.params.eventID;
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      res.sendStatus(404);
    } else {
      req.body.eventName = `${req.body.eventName}~${req.body.ownerId}`;
      await event.update(req.body);
      res.status(200).json(event);
    }
  } catch (error) {
    next(error);
  }
});
