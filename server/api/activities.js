const router = require('express').Router();
const adminsOnly = require('../auth/adminsOnly');
const coordinatorsOnly = require('../auth/coordinatorsOnly');
const ownersOnly = require('../auth/ownersOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');
const { Activity } = require('../db/models');
module.exports = router;

// All Activities: GET /api/:eventID/activities
// adminsOnly
router.get('/:eventID/activities', async (req, res, next) => {
  try {
    const id = req.params.eventID;
    console.log('req.params', req.params);
    const activities = await Activity.findAll({
      where: {
        EventId: id,
      },
    });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// Single Event: GET /api/events/:eventID/activities/:activityID
// userOrAdminOnly
router.get('/:eventID/activities/:activityID', async function (req, res, next) {
  const id = req.params.activityID;
  console.log('params in single activity', req.params);
  try {
    const thisActivity = await Activity.findByPk(id);
    if (!thisActivity) {
      res.sendStatus(404).end();
    }
    res.json(thisActivity);
  } catch (error) {
    next(error);
  }
});

// Single Event: DELETE /api/events/:eventID
// adminsOnly
router.delete('/:eventID', ownersOnly, async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    await event.destroy();
    res.json(event);
  } catch (error) {
    next(error);
  }
});

// Single Event: POST /api/events/

router.post('/', async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    res.json(newEvent);
  } catch (error) {
    next(error);
  }
});

// Single Event: PUT /api/events/:eventID

// Separated authentication into 3 seperate files. If this doesn't work we'll have to combine them into admin, admin+owner, admin+owner+coordinator
// adminsOnly,
// ownersOnly,
// coordinatorsOnly,
router.put('/:eventID', async (req, res, next) => {
  const id = req.params.eventID;
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      res.sendStatus(404);
    } else {
      await event.update(req.body);
      res.json(event);
    }
  } catch (error) {
    next(error);
  }
});
