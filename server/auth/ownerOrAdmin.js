const { Event, Activity, User, UserEvent } = require('../db/models');

module.exports = async (req, res, next) => {
  const eventId = req.params.eventID;
  const userId = req.user.id;

  const ocCheck = await User.findByPk(userId, {
    include: {
      model: Event,
      where: {
        id: eventId
      }
    }
  });

  const ownerStatus = ocCheck.dataValues.Events[0].UserEvent.dataValues.isOwner;

  if ((req.user && req.user.isAdmin === true) || ownerStatus) {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};
