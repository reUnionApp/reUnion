const router = require("express").Router();
const { User, Event, UserEvent } = require("../db/models");
const adminsOnly = require("../auth/adminsOnly");
const ownersOnly = require("../auth/ownersOnly");
const coordinatorsOnly = require("../auth/coordinatorsOnly");
const userOrAdminOnly = require("../auth/userOrAdminOnly");
const { FindInPageOutlined } = require("@material-ui/icons");
module.exports = router;

// All Users: GET /api/users

//adminsOnly
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "id",
        "firstName",
        "lastName",
        "alias",
        "email",
        "dietaryRestrictions",
        "specialRequests",
        "isAdmin",
      ],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Single User: GET /api/users/:userId
// userOrAdminOnly
router.get("/:userID", async (req, res, next) => {
  const id = req.params.userID;
  try {
    const user = await User.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "alias",
        "email",
        "dietaryRestrictions",
        "specialRequests",
        "isAdmin",
      ],
      include: {
        model: Event,
      },
    });
    if (!user) {
      res.sendStatus(404).end();
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Single User's Events: GET /api/users/:userId/events
// userOrAdminOnly
router.get("/:userID/events", async (req, res, next) => {
  const id = req.params.userID;
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Event,
      },
    });
    if (!user) {
      res.sendStatus(404).end();
    }
    res.json(user.Events);
  } catch (error) {
    next(error);
  }
});

// Single User: DELETE /api/users/:userID
// adminsOnly
router.delete("/:userID", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userID);
    await user.destroy();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Create Psuedo-User: POST /api/users/
// error appears when we add an existing user, newUser is not defined error appears on guestList page even though the user has been added to the guestList.

router.post("/", async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      // if an existing user is added to an event that they are already part of we need to display an error message saying this email is already on the guestlist.
      await existingUser.addEvent(req.body.eventId);
      res.status(201).json(existingUser);
    } else {
      const newUser = await User.create(req.body);
      await newUser.addEvent(req.body.eventId);
      res.status(201).json(newUser);
    }
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("Email is already in guest list");
    } else {
      next(error);
    }
  }
});

// Single User: PUT /api/users/:userID
// userOrAdminOnly
router.put("/:userID", async (req, res, next) => {
  const id = req.params.userID;

  req.body.specialRequests = [req.body.specialRequests];
  req.body.dietaryRestrictions = [req.body.dietaryRestrictions];

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.sendStatus(404);
    } else if (user.dataValues.userType === 'registered') {
      res.status(401).send("Cannot update registered user");
    } else {
      await user.update(req.body);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});
