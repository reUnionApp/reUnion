const router = require('express').Router();
const { default: userEvent } = require('@testing-library/user-event');
const adminsOnly = require('../auth/adminsOnly');
const coordinatorsOnly = require('../auth/coordinatorsOnly');
const ownersOnly = require('../auth/ownersOnly');
const userOrAdminOnly = require('../auth/userOrAdminOnly');
const { Event, Activity, User, UserEvent } = require('../db/models');
module.exports = router;

// Single Event Guest List: GET /api/events/:eventID/guestList
// userOrAdminOnly
router.get('/:eventID/guestList', async function (req, res, next) {
  const id = req.params.eventID;
  try {
    const guestList = await User.findAll({
      include: { model: Event, where: { id: id } },
    });
    if (!guestList) {
      res.sendStatus(404).end();
    }
    res.status(200).json(guestList);
  } catch (error) {
    next(error);
  }
});

router.put('/:eventId/guestList/', async function (req, res, next) {
  const eventId = Number(req.params.eventId);
  try {
    const guest = await User.findByPk(req.body.guestId);
    console.log(777, guest);
    await guest.removeEvent(eventId);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
