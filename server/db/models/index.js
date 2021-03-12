const User = require("./user");
const Event = require("./event");
const Activity = require("./activity");

User.belongsToMany(Event, { through: User_Event });
Event.belongsToMany(User, { through: User_Event });

Event.hasMany(Activity);
Activity.belongsTo(Event);

module.exports = {
  User,
  Event,
  Activity,
};
