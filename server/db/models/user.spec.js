const request = require('supertest');
const db = require('../db');
const { User } = require('./index');

describe('User Model', () => {
  beforeAll(() => {
    db.sync();
  });

  afterAll(async (done) => {
    db.close(done);
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

  afterEach(async () => {
    const user = User.destroy({
      where: {
        email: 'anyother@gmail.com',
      },
    });
  });
});
