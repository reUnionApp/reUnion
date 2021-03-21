const request = require("supertest");
const app = require("../../index");
const db = require("../db");
const { Activity } = require("../db/models");

// getting tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

describe("Activities API", () => {
  beforeAll(() => {
    db.sync();
  });

  describe("Create Activity Route", () => {
    afterEach(async () => {
      const activity = Activity.destroy({
        where: {
          activityName: "Spin the bottle",
        },
      });
    });
    it("should create a new activity", async () => {
      const res = await request(app).post("/api/events/1/activities").send({
        activityName: "Spin the bottle",
        description:
          "Let's spin the bottle and whoever it points to has to debug code",
        location: "asylum",
        startDate: Date.now(),
        endDate: tomorrow,
        startTime: "07:00 AM",
        endTime: "05:00 PM",
        EventId: 1,
      });
      expect(res.status).toEqual(201);
    });
  });

  describe("Get All Activities Route", () => {
    it("should get all activities", async () => {
      const res = await request(app).get("/api/events/1/activities");
      expect(res.status).toEqual(200);
    });
  });

  describe("Get Single Activity Route", () => {
    it("should get a single activity", async () => {
      const res = await request(app).get("/api/events/1/activities/1");
      expect(res.status).toEqual(200);
    });
  });

  describe("Delete Single Activity Route", () => {
    beforeEach(async () => {
      const testActivity = await Activity.create({
        activityName: "Tacos Speed Eating Competition",
        description: "See who can Beat Svetas record of 3 tacos per second",
        location: "asylum",
        startDate: Date.now(),
        endDate: tomorrow,
        startTime: "07:00 AM",
        endTime: "05:00 PM",
        EventId: 1,
      });
    });
    it("should delete a single activity", async () => {
      const testActivity = await Activity.findOne({
        where: { activityName: "Tacos Speed Eating Competition" },
      });
      const res = await request(app).delete(
        `/api/events/${testActivity.EventId}/activities/${testActivity.id}`
      );
      expect(res.status).toEqual(200);
    });
  });

  describe("Update activity Route", () => {
    beforeEach(async () => {
      const testActivity = await Activity.create({
        activityName: "Tacos Speed Eating Competition",
        description: "See who can Beat Svetas record of 3 tacos per second",
        location: "asylum",
        startDate: Date.now(),
        endDate: tomorrow,
        startTime: "07:00 AM",
        endTime: "05:00 PM",
        EventId: 1,
      });
    });

    afterEach(async () => {
      const testActivity = Activity.destroy({
        where: {
          activityName: "Tacos Speed Eating Competition",
        },
      });
    });

    it("should update a single activity", async () => {
      const testActivity = await Activity.findOne({
        where: { activityName: "Tacos Speed Eating Competition" },
      });
      const res = await request(app)
        .put(
          `/api/events/${testActivity.EventId}/activities/${testActivity.id}`
        )
        .send({
          activityName: "3-Legged Race",
          description: "Get tied up to Charlie Brown and try to win the race",
          location: "Snoopy dog house",
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: "11:00 AM",
          endTime: "10:00 PM",
          EventId: 1,
        });
      expect(res.status).toEqual(200);
    });
  });

  afterAll(async (done) => {
    db.close(done);
  });
});
