const db = require('./server/db/db');
const { User, Event, Activity, UserEvent } = require('./server/db/models/');
const faker = require('faker');
const { fake } = require('faker');

// getting tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

// console.log(tomorrow);

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // function generateData() {
  //   const eTypes = [
  //     'class reunion',
  //     'family reunion',
  //     'anniversary party',
  //     'baby shower',
  //     'other gathering',
  //   ];
  //   let users = [];
  //   let events = [];
  //   let activities = [];
  //   for (let id = 1; id <= 5; id++) {
  //     users.push(
  //       User.create({
  //         firstName: faker.name.firstName(),
  //         lastName: faker.name.lastName(),
  //         email: faker.internet.email(faker.name.firstName()),
  //         isAdmin: faker.random.boolean(),
  //       })
  //     );
  //     events.push(
  //       Event.create({
  //         eventName: faker.lorem.words(4),
  //         // eventType: faker.random.arrayElement(eTypes),
  //         eventType: ['class reunion'],
  //         owner: faker.name.findName(),
  //         coordinator: [`${faker.name.findName()}`],
  //         description: faker.lorem.words(8),
  //         location: faker.name.jobArea(),
  //         startDate: Date.now(),
  //         endDate: tomorrow,
  //         startTime: '07:00 AM',
  //         endTime: '05:00 PM',
  //       })
  //     );
  //     activities.push(
  //       Activity.create({
  //         activityName: faker.lorem.words(3),
  //         description: faker.lorem.words(8),
  //         location: faker.name.jobArea(),
  //         startDate: Date.now(),
  //         endDate: tomorrow,
  //         startTime: '07:00 AM',
  //         endTime: '05:00 PM',
  //         // EventId: faker.random.number({ min: 1, max: 100, precision: 1 }),
  //       })
  //     );
  //   }
  //   // console.log( users, events, activities);
  //   let data = [users, activities, events];
  //   return data;
  // }

  function generateUser() {
    let users = [];
    for (let id = 1; id <= 5; id++) {
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
          // eventType: faker.random.arrayElement(eTypes),
          eventType: ['class reunion'],
          owner: faker.name.findName(),
          coordinator: [`${faker.name.findName()}`],
          description: faker.lorem.words(8),
          location: faker.name.jobArea(),
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: '07:00 AM',
          endTime: '05:00 PM',
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
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: '07:00 AM',
          endTime: '05:00 PM',
          // EventId: faker.random.number({ min: 1, max: 100, precision: 1 }),
        })
      );
    }
    return activities;
  }

  const users = await Promise.all(generateUser());
  const activities = await Promise.all(generateActivity());
  const events = await Promise.all(generateEvent());
  // console.log(users.length);
  // console.log(activities);
  // console.log(events);

  for (let i = 0; i < 5; i++) {
    console.log(users[i]);
    await users[i].setEvents(i + 1);
  }
  // await users[0].setEvents(1);
  // await data[0].setEvents(1);

  // function generateEvents() {
  //   let events = [];
  //   for (let id = 1; id <= 100; id++) {
  //     events.push(
  //       Event.create({
  //         eventName: faker.lorem.words(4),
  //         eventType: faker.random.arrayElement([
  //           'class reunion',
  //           'family reunion',
  //           'anniversary party',
  //           'baby shower',
  //           'other gathering',
  //         ]),
  //         eventType: ['class reunion'],
  //         owner: faker.name.findName(),
  //         coordinator: [`${faker.name.findName()}`],
  //         description: faker.lorem.words(8),
  //         location: faker.name.jobArea(),
  //         startDate: Date.now(),
  //         endDate: tomorrow,
  //         startTime: '07:00 AM',
  //         endTime: '05:00 PM',
  //       })
  //     );
  //   }
  //   return event;
  // }

  // const events = await Promise.all(generateEvents());

  // Filler seed, how to seed a through table?

  // const activity = await Promise.all([
  //   Activity.create({
  //     activityName: 'Pin the tail on the donkey',
  //     description: "Let's pin the tail on the donkey",
  //     location: 'online',
  //     startDate: Date.now(),
  //     endDate: tomorrow,
  //     startTime: '07:00 AM',
  //     endTime: '05:00 PM',
  //     EventId: 1,
  //   }),
  //   Activity.create({
  //     activityName: 'Bobbing for Apples',
  //     description: "Who's Bob and why is he bobbing for apples",
  //     location: 'Old Orchid',
  //     startDate: Date.now(),
  //     endDate: tomorrow,
  //     startTime: '09:00 AM',
  //     endTime: '07:00 PM',
  //     EventId: 1,
  //   }),
  //   Activity.create({
  //     activityName: 'Sack Race',
  //     description: 'Get in a sack and race',
  //     location: 'Idaho Potato Form',
  //     startDate: Date.now(),
  //     endDate: tomorrow,
  //     startTime: '10:00 AM',
  //     endTime: '09:00 PM',
  //     EventId: 2,
  //   }),
  //   Activity.create({
  //     activityName: 'Kissing Booth',
  //     description: 'Kiss Charlie Brown in a booth',
  //     location: 'Snoopy dog house',
  //     startDate: Date.now(),
  //     endDate: tomorrow,
  //     startTime: '11:00 AM',
  //     endTime: '10:00 PM',
  //     EventId: 2,
  //   }),
  //   Activity.create({
  //     activityName: 'Waterballon Toss',
  //     description: 'Toss a ballon to a friend and hope to not get wet!',
  //     location: 'Pool',
  //     startDate: Date.now(),
  //     endDate: tomorrow,
  //     startTime: '11:00 AM',
  //     endTime: '10:00 PM',
  //     EventId: 3,
  //   }),
  // ]);
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
