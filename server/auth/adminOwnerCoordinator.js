const { Event, Activity, User, UserEvent } = require('../db/models');

module.exports = async (req, res, next) => {
  const eventId = Number(req.params.eventID);
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

  const coordinatorStatus = ocCheck.dataValues.Events[0].UserEvent.dataValues.isCoordinator;

  if ((req.user && req.user.isAdmin === true) || ownerStatus || coordinatorStatus) {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};
