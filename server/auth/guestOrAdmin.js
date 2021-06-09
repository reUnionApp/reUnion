const { Event, Activity, User, UserEvent } = require('../db/models');

module.exports = async (req, res, next) => {
  const eventId = req.params.eventID;
  const userId = req.user.id;

  const userCheck = await Event.findByPk(eventId,
    {
      include: {
        model: User,
        where: {
          id: userId
        }
      }
    });

  if ((req.user && req.user.isAdmin === true) || userCheck) {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};
