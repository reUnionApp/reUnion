const router = require('express').Router();
// const { default: userEvent } = require('@testing-library/user-event');
const adminOwnerCoordinator = require('../auth/adminOwnerCoordinator');
const { Event, Activity, User, UserEvent } = require('../db/models');
const sgMail = require('@sendgrid/mail');
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

// Single Event Guest List: PUT /api/events/:eventID/guestList
// adminOwnerCoordinator
router.put('/:eventId/guestList/', adminOwnerCoordinator, async function (req, res, next) {
  const eventId = Number(req.params.eventId);
  try {
    const guest = await User.findByPk(req.body.guestId);
    await guest.removeEvent(eventId);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// router.post('/:eventId/guestList/', adminOwnerCoordinator, (req, res, next) => {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//   const msg = {
//     to: 'myreunionapp@gmail.com', // Change to your recipient
//     from: 'myreunionapp@gmail.com', // Change to your verified sender
//     subject: 'You\'re Invited!',
//     text: `Hello from reUnion!`,
//     html: '<h1>Hello from reUnion!</h1>'
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent')
//     })
//     .catch((error) => {
//       console.error(error)
//     });
// });

