const router = require('express').Router();
const adminsOnly = require('../auth/adminsOnly');
const coordinatorsOnly = require('../auth/coordinatorsOnly');
const ownersOnly = require('../auth/ownersOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');
const { Event } = require('../db/models');

// All Events: GET /api/events

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// Single Event: GET /api/events/:eventID

router.get('/:eventID', userOrAdminOnly, async function (req, res, next) {
  const id = req.params.eventID;
  try {
    const thisEvent = await Event.findByPk(id);
    if (!thisEvent) {
      res.sendStatus(404).end();
    }
    res.json(thisEvent);
  } catch (error) {
    next(error);
  }
});

// Single Event: DELETE /api/events/:eventID

router.delete('/:eventID', adminsOnly, ownersOnly, async (req, res, next) => {
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

router.put(
  '/:eventID',
  adminsOnly,
  ownersOnly,
  coordinatorsOnly,
  async (req, res, next) => {
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
  }
);
