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
    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
});

// Single Event: GET /api/events/:eventID/activities/:activityID
// userOrAdminOnly
router.get('/:eventID/activities/:activityID', async function (req, res, next) {
  try {
    const activityId = req.params.activityID;
    const eventId = req.params.eventID;

    const thisActivity = await Activity.findOne({
      where: {
        EventId: eventId,
        id: activityId,
      },
    });
    if (!thisActivity) {
      res.sendStatus(404).end();
    }
    res.status(200).json(thisActivity);
  } catch (error) {
    next(error);
  }
});

// Single Activity: DELETE /api/events/:eventID/activities/:activityID
// adminsOnly
router.delete('/:eventID/activities/:activityID', async (req, res, next) => {
  try {
    const activityId = req.params.activityID;
    const eventId = req.params.eventID;

    const thisActivity = await Activity.findOne({
      where: {
        EventId: eventId,
        id: activityId,
      },
    });
    await thisActivity.destroy();
    res.sendStatus(200).end();
  } catch (error) {
    next(error);
  }
});

// Single Activity: POST /api/events/:eventID/activities

router.post('/:eventID/activities', async (req, res, next) => {
  try {
    const event = req.params.eventID;
    const newActivity = await Activity.create({
      ...req.body,
      EventId: event,
    });
    res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
});

// Single Activity: PUT /api/events/:eventID/activities/:activityID

// Separated authentication into 3 seperate files. If this doesn't work we'll have to combine them into admin, admin+owner, admin+owner+coordinator
// adminsOnly,
// ownersOnly,
// coordinatorsOnly,
router.put('/:eventID/activities/:activityID', async (req, res, next) => {
  try {
    const activityId = req.params.activityID;
    const eventId = req.params.eventID;

    const thisActivity = await Activity.findOne({
      where: {
        EventId: eventId,
        id: activityId,
      },
    });
    if (!thisActivity) {
      res.sendStatus(404);
    } else {
      await thisActivity.update(req.body);
      res.json(thisActivity);
    }
  } catch (error) {
    next(error);
  }
});
