const db = require("./server/db/db");
const { User, Event, Activity, UserEvent } = require("./server/db/models/");
const faker = require("faker");

// getting tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

// console.log(tomorrow);

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  function generateUsers() {
    let users = [];
    for (let id = 1; id <= 100; id++) {
      users.push(
        User.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(faker.name.firstName()),
          isAdmin: faker.random.boolean(),
        })
      );
    }
    return users;
  }
  const users = await Promise.all(generateUsers());

  const event = await Promise.all([
    Event.create({
      eventName: "Purple Socks Reunion",
      eventType: ["class reunion"],
      owner: "Sung Lee",
      coordinator: ["Sung Lee"],
      description: "Reunion for wearing purple socks.",
      location: "online",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "07:00 AM",
      endTime: "05:00 PM",
    }),
    Event.create({
      eventName: "Blue Hats Reunion",
      eventType: ["class reunion"],
      owner: "Sung Lee",
      coordinator: ["Sung Lee", "Abbie Stauffer"],
      description: "Reunion for wearing blue hats.",
      location: "online",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "07:00 AM",
      endTime: "05:00 PM",
    }),
    Event.create({
      eventName: "Yellow Shirts Reunion",
      eventType: ["class reunion"],
      owner: "Abbie Stauffer",
      coordinator: ["Sung Lee", "Abbie Stauffer"],
      description: "Reunion for wearing yellow shirts.",
      location: "online",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "07:00 AM",
      endTime: "05:00 PM",
    }),
    Event.create({
      eventName: "Green Jackets Reunion",
      eventType: ["class reunion"],
      owner: "Svetlana Leonova ",
      coordinator: ["Sung Lee", "Abbie Stauffer"],
      description: "Reunion for wearing green jackets.",
      location: "online",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "07:00 AM",
      endTime: "05:00 PM",
    }),
  ]);

  // Filler seed, how to seed a through table?

  const activity = await Promise.all([
    Activity.create({
      activityName: "Pin the tail on the donkey",
      description: "Let's pin the tail on the donkey",
      location: "online",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "07:00 AM",
      endTime: "05:00 PM",
      EventId: 1,
    }),
    Activity.create({
      activityName: "Bobbing for Apples",
      description: "Who's Bob and why is he bobbing for apples",
      location: "Old Orchid",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "09:00 AM",
      endTime: "07:00 PM",
      EventId: 1,
    }),
    Activity.create({
      activityName: "Sack Race",
      description: "Get in a sack and race",
      location: "Idaho Potato Form",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "10:00 AM",
      endTime: "09:00 PM",
      EventId: 2,
    }),
    Activity.create({
      activityName: "Kissing Booth",
      description: "Kiss Charlie Brown in a booth",
      location: "Snoopy dog house",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "11:00 AM",
      endTime: "10:00 PM",
      EventId: 2,
    }),
    Activity.create({
      activityName: "Waterballon Toss",
      description: "Toss a ballon to a friend and hope to not get wet!",
      location: "Pool",
      startDate: Date.now(),
      endDate: tomorrow,
      startTime: "11:00 AM",
      endTime: "10:00 PM",
      EventId: 3,
    }),
  ]);

  await users[0].setEvents(1);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (error) {
    console.log("error:", error);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

runSeed();
module.exports = seed;
