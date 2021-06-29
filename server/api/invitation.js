const sendGridMail = require('@sendgrid/mail');
require('dotenv').config();
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);


// sendGridMail.setApiKey('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')


function getOrderConfirmationEmailHtml() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>Test reUnion Email</title> </head>
  <body><div><h1>I'm coming!</h1></body></html>`;
}

function getMessage() {
  return {
    to: 'myreunionapp@gmail.com',
    from: 'myreunionapp@gmail.com',
    subject: 'We received your rsvp',
    text: `Hey, we have received your rsvp . We will ship it soon`,
    html: getOrderConfirmationEmailHtml(),
  };
}

async function sendOrderConfirmation() {
  try {
    await sendGridMail.send(getMessage());
    console.log(getMessage());
    return { message: `We received your rsvp!` };
  } catch (error) {
    const message = `Error sending rsvp confirmation email`;
    console.error(message);
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
    return { message };
  }
}

module.exports = {
  sendOrderConfirmation
}
