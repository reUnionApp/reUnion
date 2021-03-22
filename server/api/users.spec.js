const request = require("supertest");
const app = require("../../index");
const db = require("../db");
const { User } = require("../db/models");

describe("User API", () => {
  beforeAll(() => {
    db.sync();
  });

  describe("Create User Route", () => {
    afterEach(async () => {
      const user = User.destroy({
        where: {
          email: "harryPotter14@gmail.com",
        },
      });
    });

    it("should create a new user", async () => {
      const res = await request(app).post("/api/users").send({
        firstName: "Harry",
        lastName: "Potter",
        email: "harryPotter14@gmail.com",
        isAdmin: true,
      });
      expect(res.status).toEqual(201);
    });
  });

  describe("Get All Users Route", () => {
    it("should get all users", async () => {
      const res = await request(app).get("/api/users");
      expect(res.status).toEqual(200);
    });
  });

  describe("Get Single User Route", () => {
    it("should get a single user", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.status).toEqual(200);
    });
  });

  describe("Delete Single User Route", () => {
    beforeEach(async () => {
      const testUser = await User.create({
        firstName: "Harry",
        lastName: "Potter",
        email: "harryPotter14@gmail.com",
        isAdmin: true,
      });
    });

    it("should delete a single user", async () => {
      const testUser = await User.findOne({
        where: {
          email: "harryPotter14@gmail.com",
        },
      });

      const res = await request(app).delete(`/api/users/${testUser.id}`);
      expect(res.status).toEqual(200);
    });
  });

  describe("Update User Route", () => {
    beforeEach(async () => {
      const user = await User.create({
        firstName: "Harry",
        lastName: "Potter",
        email: "harryPotter14@gmail.com",
        isAdmin: true,
      });
    });

    afterEach(async () => {
      const user = User.destroy({
        where: {
          email: "harryPotter14@gmail.com",
        },
      });
    });

    it("should update a single user", async () => {
      const testUser = await User.findOne({
        where: {
          email: "rwe@gmail.com",
        },
      });
      const res = await request(app).put(`/api/users/${testUser.id}`).send({
        firstName: "Ron",
        lastName: "Weasley",
        email: "rwe@gmail.com",
        isAdmin: true,
      });
      expect(res.status).toEqual(200);
    });
  });

  afterAll(async (done) => {
    db.close(done);
  });
});
