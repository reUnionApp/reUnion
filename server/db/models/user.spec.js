const request = require('supertest');
const db = require('../db');
const { User } = require('./index');

describe('User Model', () => {
  beforeAll(() => {
    db.sync();
  });

  const user = {
    firstName: 'Any',
    lastName: 'Other',
    email: 'anyother@gmail.com',
    isAdmin: false,
  };

  it('has fields firstName, lastName, email, isAdmin', async () => {
    const testUser = await User.create(user);
    expect(testUser.firstName).toEqual('Any');
    expect(testUser.lastName).toEqual('Other');
    expect(testUser.email).toEqual('anyother@gmail.com');
    expect(testUser.isAdmin).toEqual(false);
  });

  it('firstName should not be null', async () => {
    const newUser = User.build();
    try {
      await newUser.validate();
      throw Error('validation should have failed without firstName');
    } catch (err) {
      expect(err.message).toContain('firstName cannot be null');
    }

    await User.destroy({
      where: {
        email: 'testd@gmail.com',
      },
    });
  });

  afterEach(async () => {
    const user = await User.destroy({
      where: {
        email: 'anyother@gmail.com',
      },
    });
  });

  // afterAll(async (done) => {
  //   await db.close(done);
  // });
});
