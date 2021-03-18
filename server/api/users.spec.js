const request = require("supertest");
const app = require("../../index");
const db = require("../db");

// describe("User API", () => {
//   beforeAll(() => {
//     db.sync();
//   });

//   describe("Create User Route", () => {
//     it("should create a new user", async () => {
//       const res = await request(app).post("/api/users").send({
//         firstName: "Harry",
//         lastName: "Potter",
//         email: "harryPotter14@gmail.com",
//         isAdmin: true,
//       });
//       expect(res.status).toEqual(201);
//     });
//   });

//   describe("Get All Users Route", () => {
//     it("should get all users", async () => {
//       const res = await request(app).get("/api/users");
//       expect(res.status).toEqual(200);
//     });
//   });

//   describe("Get Single User Route", () => {
//     it("should get a single user", async () => {
//       const res = await request(app).get("/api/users/1");
//       expect(res.status).toEqual(200);
//     });
//   });

//   describe("Delete Single User Route", () => {
//     it("should delete a single user", async () => {
//       const res = await request(app).delete("/api/users/2");
//       expect(res.status).toEqual(200);
//     });
//   });

//   describe("Update User Route", () => {
//     it("should update a single user", async () => {
//       const res = await request(app).put("/api/users/1").send({
//         firstName: "Ron",
//         lastName: "Weasley",
//         email: "rwe@gmail.com",
//         isAdmin: true,
//       });
//       expect(res.status).toEqual(200);
//     });
//   });

//   afterAll(async (done) => {
//     db.close(done);
//   });
// });
