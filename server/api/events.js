const router = require("express").Router();
const adminsOnly = require("../auth/adminsOnly");
const coordinatorsOnly = require("../auth/coordinatorsOnly");
const ownersOnly = require("../auth/ownersOnly");
const userOrAdminOnly = require("../auth/userOrAdminOnly");
const { Event, Activity } = require("../db/models");
module.exports = router;

// All Events: GET /api/events
// adminsOnly
router.get("/", async (req, res, next) => {
  try {
    console.log("hello world");
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

// Single Event: GET /api/events/:eventID
// userOrAdminOnly
router.get("/:eventID", async function (req, res, next) {
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
// adminsOnly
router.delete("/:eventID", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    await event.destroy();
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

// Single Event: POST /api/events/

router.post("/", async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});

// Single Event: PUT /api/events/:eventID

// Separated authentication into 3 seperate files. If this doesn't work we'll have to combine them into admin, admin+owner, admin+owner+coordinator
// adminsOnly,
// ownersOnly,
// coordinatorsOnly,
router.put("/:eventID", async (req, res, next) => {
  const id = req.params.eventID;
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      res.sendStatus(404);
    } else {
      await event.update(req.body);
      res.status(200).json(event);
    }
  } catch (error) {
    next(error);
  }
});
