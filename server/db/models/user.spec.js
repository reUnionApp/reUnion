const db = require("../db");
const { User } = require("./index");

describe("User Model", () => {
  beforeAll(() => {
    db.sync();
  });

  // afterAll(async (done) => {
  //   db.close();
  //   done();
  // });

  const user = {
    firstName: "Any",
    lastName: "Other",
    email: "anyother@gmail.com",
    isAdmin: false,
  };

  const nullUser = {
    firstName: null,
    lastName: "test",
    email: "test@gmail.com",
    isAdmin: true,
  };

  const emptyUser = {
    firstName: "",
    lastName: "test",
    email: "test@gmail.com",
    isAdmin: true,
  };

  describe("User Model Field Validation", () => {
    afterEach(async () => {
      try {
        const user = await User.destroy({
          where: {
            email: "anyother@gmail.com",
          },
        });
      } catch (error) {
        console.log(error);
      }
    });

    it("has fields firstName, lastName, email, isAdmin", async () => {
      try {
        const testUser = await User.create(user);
        expect(testUser.firstName).toEqual("Any");
        expect(testUser.lastName).toEqual("Other");
        expect(testUser.email).toEqual("anyother@gmail.com");
        expect(testUser.isAdmin).toEqual(false);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("User Model Validation", () => {
    afterEach(async () => {
      try {
        const user = await User.destroy({
          where: {
            email: "testd@gmail.com",
          },
        });
      } catch (error) {
        console.log(error);
      }
    });

    it("firstName should not be null", async () => {
      const newUser = await User.build(nullUser);
      try {
        await newUser.validate();
        throw "validation should check that no required fields are null";
      } catch (err) {
        expect(err.message).toContain(
          "notNull Violation: Users.firstName cannot be null"
        );
      }
    });

    it("firstName cannot be empty", async () => {
      const emptyFields = await User.build(emptyUser);
      try {
        await emptyFields.validate();
        throw "validation should have failed with empty firstName";
      } catch (err) {
        expect(err.message).toContain(
          "Validation error: Validation notEmpty on firstName failed"
        );
      }
    });
  });
});
