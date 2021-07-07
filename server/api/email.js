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
  let emailsSent = false;

  let returnList = async function (arr) {
    let newList = [];
    for (let i = 0; i < arr.length; i++) {
      let allEvents = arr[i].Events;
      for (let j = 0; j < allEvents.length; j++) {
        let event = allEvents[j];
        if (event.id === req.body.event.id) {
          let userEventList = event.UserEvent;
          if (userEventList.receivedInvite === false) {
            newList.push(await arr[i])
          }
        }
      }
    }
    return newList;
  }

  let finalList = await returnList(req.body.guests);
  const allEmails = finalList.map((guest) => {
    return { "email": `${guest.email}` }
  });
  console.log('finallisssttt!!!!!', finalList)
  // console.log(111111, req.body.guests)
  // console.log(22222222, req.user)
  // console.log(333333, req.body.event)

  const dateFormat = (date) => {
    let dateObj = date;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return month + '/' + day + '/' + year;
  };

  // const testText = `${req.user.firstName} invited you to the event ${req.body.event.eventName} event on ${dateFormat(new Date(req.body.event.startDateTime))}. To see the details for this event, click on the link below. https://myreunionapp.herokuapp.com/
  // `

  // console.log({ testText })

  let updateInviteStatus = async function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let allEvents = arr[i].Events;
      for (let j = 0; j < allEvents.length; j++) {
        let event = allEvents[j];
        if (event.id === req.body.event.id) {
          let userEventList = event.UserEvent;
          if (userEventList.receivedInvite === false) {
            let currGuest = await UserEvent.findOne({
              where: {
                EventId: userEventList.EventId,
                UserId: userEventList.UserId
              }
            });
            currGuest.update({ receivedInvite: true });
            console.log(11111, currGuest)
          }
        }
      }
    }
  }

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
    from: 'myreunionapp2021@outlook.com', // Change to your verified sender
    subject: 'You\'re Invited! Get Excited!',
    text: `${req.user.firstName} invited you to the event ${req.body.event.eventName} event on ${dateFormat(new Date(req.body.event.startDateTime))}. To see the details for this event, click on the link below. https://myreunionapp.herokuapp.com/
  `,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title></title><meta name="description" content=""><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href=""></head><body style="font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;"><div><h2 style="margin: 2rem 0;">You\'re Invited! Get excited!</h2><div><p>${req.user.firstName} invited you to the event ${req.body.event.eventName}</p><div style="text-align: center; margin: 5rem auto; "><div style="margin: auto;"><p><span style="font-weight: bold;">Event Name:</span> ${req.body.event.eventName}</p><p><span style="font-weight: bold;">Event Start Date:</span> ${dateFormat(new Date(req.body.event.startDateTime))}</p><p><span style="font-weight: bold;">Event Start Time:</span> ${new Date(req.body.event.startDateTime).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}</p><p><span style="font-weight: bold;">Event End Date:</span> ${dateFormat(new Date(req.body.event.endDateTime))}</p><p><span style="font-weight: bold;">Event End Time:</span> ${new Date(req.body.event.endDateTime).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}</p><p><span style="font-weight: bold;">Event Location:</span> ${req.body.event.location}</p><p><span style="font-weight: bold;">Event Description:</span> ${req.body.event.description}</p></div><div><p>To respond to this invitation, <a href="https://myreunionapp.herokuapp.com/">click here</a></p><p>https://myreunionapp.herokuapp.com</p></div></div></div></div></body></html>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email(s) sent');
    }).then(async () => {
      await updateInviteStatus(finalList);
    })
    .catch((error) => {
      console.error(error)
    })
});
