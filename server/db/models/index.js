const User = require('./user');
const Event = require('./event');
const Activity = require('./activity');
const UserEvent = require('./userEvent');

User.belongsToMany(Event, { through: UserEvent });
Event.belongsToMany(User, { through: UserEvent });

Event.hasMany(Activity);
Activity.belongsTo(Event);

module.exports = {
  User,
  Event,
  Activity,
  UserEvent,
};
