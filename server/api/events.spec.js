const request = require("supertest");
const app = require("../../index");
const db = require("../db");

// getting tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);

describe("Event API", () => {
  beforeAll(() => {
    db.sync();
  });

  describe("Create Event Route", () => {
    it("should create a new event", async () => {
      const res = await request(app)
        .post("/api/events")
        .send({
          eventName: "Farhads Free Fajitas Party",
          eventType: ["class reunion"],
          owner: "Farhad",
          coordinator: ["Greta", "Sveta"],
          description: "Reunion for gobbling up skittles.",
          location: "Sungs Beverly Hills Mansion",
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: "07:00 AM",
          endTime: "05:00 PM",
        });
      expect(res.status).toEqual(201);
    });
  });

  describe("Get All Events Route", () => {
    it("should get all events", async () => {
      const res = await request(app).get("/api/events");
      expect(res.status).toEqual(200);
    });
  });

  describe("Get Single Event Route", () => {
    it("should get a single event", async () => {
      const res = await request(app).get("/api/events/1");
      expect(res.status).toEqual(200);
    });
  });

  describe("Delete Single Event Route", () => {
    it("should delete a single event", async () => {
      const res = await request(app).delete("/api/events/2");
      expect(res.status).toEqual(200);
    });
  });

  describe("Update Event Route", () => {
    it("should update a single event", async () => {
      const res = await request(app)
        .put("/api/events/1")
        .send({
          eventName: "Gretas Green Berets Reunion",
          eventType: ["class reunion"],
          owner: "Greta",
          coordinator: ["Sung Lee", "Abbie Stauffer"],
          description: "Reunion for vegan food.",
          location: "online",
          startDate: Date.now(),
          endDate: tomorrow,
          startTime: "07:00 AM",
          endTime: "05:00 PM",
        });
      expect(res.status).toEqual(200);
    });
  });

  afterAll(async (done) => {
    db.close(done);
  });
});
