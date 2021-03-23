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

  const nullUser = {
    firstName: null,
    lastName: 'test',
    email: 'test@gmail.com',
    isAdmin: true,
  };

  const emptyUser = {
    firstName: '',
    lastName: 'test',
    email: 'test@gmail.com',
    isAdmin: true,
  };

  it('has fields firstName, lastName, email, isAdmin', async () => {
    const testUser = await User.create(user);
    expect(testUser.firstName).toEqual('Any');
    expect(testUser.lastName).toEqual('Other');
    expect(testUser.email).toEqual('anyother@gmail.com');
    expect(testUser.isAdmin).toEqual(false);
  });

  it('firstName should not be null', async () => {
    const newUser = User.build(nullUser);
    try {
      await newUser.validate();
      throw Error('validation should check that no required fields are null');
    } catch (err) {
      expect(err.message).toContain(
        'notNull Violation: Users.firstName cannot be null'
      );
    }

    await User.destroy({
      where: {
        email: 'testd@gmail.com',
      },
    });
  });

  it('firstName cannot be empty', async () => {
    const emptyFields = User.build(emptyUser);
    try {
      await emptyFields.validate();
      throw Error('validation should have failed with empty firstName');
    } catch (err) {
      expect(err.message).toContain(
        'Validation error: Validation notEmpty on firstName failed'
      );
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
