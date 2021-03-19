const request = require('supertest');
const app = require('../../index');
const db = require('../db');
const { Event } = require('../db/models');

// getting tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

describe('Event API', () => {
  beforeAll(() => {
    db.sync();
  });

  afterAll(async (done) => {
    db.close(done);
  });

  describe('Create Event Route', () => {
    afterEach(async () => {
      const event = Event.destroy({
        where: {
          eventName: 'Farhads Free Fajitas Fiesta',
        },
      });
    });

    it('should create a new event', async () => {
      const res = await request(app)
        .post('/api/events')
        .send({
          eventName: 'Farhads Free Fajitas Fiesta',
          eventType: ['class reunion'],
          owner: 'Farhad',
          coordinator: ['Greta', 'Sveta'],
          description: 'Reunion for gobbling up skittles.',
          location: 'Sungs Beverly Hills Mansion',
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: '07:00 AM',
          endTime: '05:00 PM',
        });
      expect(res.status).toEqual(201);
    });
  });

  describe('Get All Events Route', () => {
    it('should get all events', async () => {
      const res = await request(app).get('/api/events');
      expect(res.status).toEqual(200);
    });
  });

  describe('Get Single Event Route', () => {
    it('should get a single event', async () => {
      const res = await request(app).get('/api/events/1');
      expect(res.status).toEqual(200);
    });
  });

  describe('Delete Single Event Route', () => {
    beforeEach(async () => {
      const event = await Event.create({
        eventName: 'Red Sweater Reunion',
        eventType: ['class reunion'],
        owner: 'Sung Lee',
        coordinator: ['Sung Lee'],
        description: 'Reunion for wearing red sweater.',
        location: 'online',
        startDate: Date.now(),
        endDate: tomorrow,
        startTime: '07:00 AM',
        endTime: '05:00 PM',
      });
    });

    it('should delete a single event', async () => {
      const testEvent = await Event.findOne({
        where: {
          eventName: 'Red Sweater Reunion',
        },
      });
      const res = await request(app).delete(`/api/events/${testEvent.id}`);
      expect(res.status).toEqual(200);
    });
  });

  describe('Update Event Route', () => {
    beforeEach(async () => {
      const event = await Event.create({
        eventName: 'Red Sweater Reunion',
        eventType: ['class reunion'],
        owner: 'Sung Lee',
        coordinator: ['Sung Lee'],
        description: 'Reunion for wearing red sweater.',
        location: 'online',
        startDate: Date.now(),
        endDate: tomorrow,
        startTime: '07:00 AM',
        endTime: '05:00 PM',
      });
    });

    afterEach(async () => {
      const event = Event.destroy({
        where: {
          eventName: 'Gretas Green Berets Reunion',
        },
      });
    });

    it('should update a single event', async () => {
      const testEvent = await Event.findOne({
        where: {
          eventName: 'Red Sweater Reunion',
        },
      });
      const res = await request(app)
        .put(`/api/events/${testEvent.id}`)
        .send({
          eventName: 'Gretas Green Berets Reunion',
          eventType: ['class reunion'],
          owner: 'Greta',
          coordinator: ['Sung Lee', 'Abbie Stauffer'],
          description: 'Reunion for vegan food.',
          location: 'online',
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: '07:00 AM',
          endTime: '05:00 PM',
        });
      expect(res.status).toEqual(200);
    });
  });
});
