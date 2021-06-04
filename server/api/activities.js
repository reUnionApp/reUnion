const router = require('express').Router();
const guestOrAdmin = require('../auth/guestOrAdmin');
const adminOwnerCoordinator = require('../auth/adminOwnerCoordinator');
const { Activity } = require('../db/models');
module.exports = router;

// All Activities: GET /api/events/:eventID/activities
// adminsOnly
router.get('/:eventID/activities', guestOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.eventID;
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
router.get('/:eventID/activities/:activityID', guestOrAdmin, async function (req, res, next) {
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
router.delete('/:eventID/activities/:activityID', adminOwnerCoordinator, async (req, res, next) => {
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

router.post('/:eventID/activities', adminOwnerCoordinator, async (req, res, next) => {
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

router.put('/:eventID/activities/:activityID', adminOwnerCoordinator, async (req, res, next) => {
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

// Delete All Activities: /api/events/:eventID/activities

router.delete('/:eventID/activities', adminOwnerCoordinator, async (req, res, next) => {
  try {
    await Activity.destroy({
      where: {
        EventId: req.params.eventId,
      },
    });
    res.redirect('/:eventID');
  } catch (error) {
    next(error);
  }
});
