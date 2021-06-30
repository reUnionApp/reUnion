const router = require('express').Router();
const adminOwnerCoordinator = require('../auth/adminOwnerCoordinator');
const { Event, Activity, User, UserEvent } = require('../db/models');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
module.exports = router;

// Get /api/email
router.get('/', async (req, res, next) => {
  try {
    console.log('in the index backend routes')
    res.send("It's working")
  } catch (error) {
    next(error);
  }
});

// POST /api/email/invitation
router.post("/invitation", async (req, res, next) => {
  // const allEmails = req.body.map((guest) => {
  //   return { "email": `${guest.email}` }
  // });
  console.log(111111, req.body.guests)
  console.log(22222222, req.user)
  console.log(333333, req.body.event)

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  const testText = `${req.user.firstName} invited you to the event ${req.body.event.eventName} event on ${dateFormat(new Date(req.body.event.startDateTime))}. To see the details for this event, click on the link below. https://myreunionapp.herokuapp.com/
  `

  console.log({ testText })

  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // const msg = {
  //   "personalizations": [
  //     {
  //       "to": [
  //         {
  //           "email": "myreunionapp2021@outlook.com"
  //         }
  //       ],
  //       // "bcc": allEmails,
  //     }
  //   ],
  //   from: 'myreunionapp2021@outlook.com', // Change to your verified sender
  //   subject: 'You\'re Invited! Get Excited!',
  //   text: `${req.user.firstName} invited you to the event ${req.body.event.eventName} event on ${dateFormat(new Date(req.body.event.startDateTime)}`,
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log('Email sent')
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })
});
