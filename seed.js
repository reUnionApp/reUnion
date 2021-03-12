const db = require("./server/db/db");
const { User, Event, Activity } = require("./server/db/models/");

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  const users = await Promise.all([
    User.create({
      firstName: "Sung",
      lastName: "Lee",
      email: "sungyonglee414@gmail.com",
      isAdmin: true,
    }),
  ]);

  const event = await Promise.all([
    Event.create({
      eventName: "Purple Socks Reunion",
      eventType: "class reunion",
      owner: "Sung Lee",
      coordinator: "Sung Lee",
      description: "Reunion for wearing purple socks.",
      location: "online",
      startDate: 3 / 13 / 2021,
      endDate: 3 / 15 / 2021,
      startTime: "7:00AM",
      endTime: "5:00PM",
    }),
  ]);
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

runSeed();
module.exports = seed;
