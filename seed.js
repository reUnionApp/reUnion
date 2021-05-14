const db = require('./server/db/db');
const { User, Event, Activity, UserEvent } = require('./server/db/models/');
const faker = require('faker');

async function seed() {
  // getting tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  await db.sync({ force: true });
  console.log('db synced!');

  function generateUser() {
    let users = [];
    for (let id = 1; id <= 5; id++) {
      users.push(
        User.create({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(faker.name.firstName()),
          isAdmin: faker.random.boolean(),
          userType: 'basic',
        })
      );
    }
    return users;
  }

  function generateEvent() {
    const eTypes = [
      'class reunion',
      'family reunion',
      'anniversary party',
      'baby shower',
      'other gathering',
    ];
    let events = [];
    for (let id = 1; id <= 5; id++) {
      events.push(
        Event.create({
          eventName: faker.lorem.words(4),
          eventType: faker.random.arrayElement(eTypes),
          owner: faker.name.findName(),
          ownerId: id,
          // coordinator: [`${faker.name.findName()}`],
          description: faker.lorem.words(8),
          location: faker.name.jobArea(),
          startDateTime: Date.now(),
          endDateTime: tomorrow,
        })
      );
    }
    return events;
  }

  function generateActivity() {
    let activities = [];
    for (let id = 1; id <= 5; id++) {
      activities.push(
        Activity.create({
          activityName: faker.lorem.words(3),
          description: faker.lorem.words(8),
          location: faker.name.jobArea(),
          startDateTime: Date.now(),
          endDateTime: tomorrow,
        })
      );
    }
    return activities;
  }

  const users = await Promise.all(generateUser());
  const activities = await Promise.all(generateActivity());
  const events = await Promise.all(generateEvent());

  // populate UserEvents through table
  for (let i = 0; i < 5; i++) {
    await users[i].setEvents(i + 1);
    await events[i].addActivity(i + 1);
  }
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (error) {
    console.log('error:', error);
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

runSeed();
module.exports = seed;
