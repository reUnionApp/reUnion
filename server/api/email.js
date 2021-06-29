const router = require('express').Router();
const adminOwnerCoordinator = require('../auth/adminOwnerCoordinator');
const { Event, Activity, User, UserEvent } = require('../db/models');
const { sendOrderConfirmation } = require('./invitation');
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

// router.post("/invitation", async (req, res, next) => {
//   try {
//     console.log('in post route for email')
//     let emailRep = await sendOrderConfirmation();
//     console.log(emailRep);
//     res.json(emailRep)
//     // res.json(await email.sendEventInvitation(req.body));
//   } catch (error) {
//     next(error);
//   }
// });

// Post /api/email/invitation
router.post("/invitation", (req, res, next) => {
  const allEmails = req.body.map((guest) => {
    return { "email": `${guest.email}` }
  })
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    "personalizations": [
      {
        "to": [
          {
            "email": "myreunionapp2021@outlook.com"
          }
        ],
        "bcc": allEmails,
      }
    ],
    // to: 'greta.dakers@gmail.com', // Change to your recipient
    from: 'myreunionapp2021@outlook.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
  // sgMail
  //   .send(msg)
  //   .then(() => { }, error => {
  //     console.error(error);

  //     if (error.response) {
  //       console.error(error.response.body)
  //     }
  //   });
  res.send(msg);
});


// const sendGridMail = require('@sendgrid/mail');
// sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

// function getMessage() {
//   const body = 'This is a test email using SendGrid from Node.js';
//   return {
//     to: 'myreunionapp@gmail.com',
//     from: 'myreunionapp@gmail.com',
//     subject: 'Test email with Node.js and SendGrid',
//     text: body,
//     html: `<strong>${body}</strong>`,
//   };
// }

// async function sendEmail() {
//   try {
//     await sendGridMail.send(getMessage());
//     console.log('Test email sent successfully');
//   } catch (error) {
//     console.error('Error sending test email');
//     console.error(error);
//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// }

// (async () => {
//   console.log('Sending test email');
//   await sendEmail();
// })();
