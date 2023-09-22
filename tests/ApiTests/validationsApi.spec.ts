import test from '../testRestApi';

const chance = require('chance').Chance();

test('TEST-7 Validation 2.1', async ({ restApi }) => {
  await test.step('Get a list of users, validate that the response code is `200` and print all users with odd ID numbers', 
  async () => {
    const users = await restApi.getUserList();
    console.log(users);
  });
});

test('TEST-8 Validation 2.2', async ({ restApi }) => {
  await test.step('Get single user 13, validate: that the user not found and that the response code is `404`', async () => {
    const idUser = '13';
    await restApi.getNotExistingUser(idUser);
  });
});

test('TEST-9 Validation 2.3', async ({ restApi }) => {
  await test.step('Create a new user, validate that the response code is `201` and validate that the creation date is today', async () => {
    const name = 'Jan';
    const job = 'developer';
    await restApi.createSingleUser(name,job);
  });
});

test('TEST-10 Validation 2.4', async ({ restApi }) => {
  await test.step('Update a user, validate that the response code is `200` and validate that the response body matches the request body where applicable', async () => {
    const name = 'morpheus';
    const job = 'zion resident';
    await restApi.updateUser(name,job);
  });
});

test('TEST-11 Validation 2.5', async ({ restApi }) => {
  await test.step('Write a parameterized validation with the values `0` and `3` and get a list of users passing a delay query parameter with the provided value for the validation', async () => {
    const delayValue = chance.integer({ min: 0, max: 3 });

    await restApi.getUserListWithDelayedResponse(delayValue.toString()); 
  });
  await test.step('Validate that the response time is no longer than `1` second', async () => {
//not done
  });
});

test('TEST-12 Validation 2.6', async ({ restApi }) => {
  await test.step('Use whatever asynchronous technique you prefer to get `10` single users and validate, asynchronously as well, that all response codes are `200s`', async () => {
    const numberOfUsers = 10;

    await restApi.createUsers(numberOfUsers);
  });
});

test('TEST-13 Validation 2.7', async ({ restApi }) => {//according to the site: https://reqres.in/ response code should be 400 for failed login
  await test.step('Login user without password, validate: that the user could not login,the response code is `404` and the error message is ` Missing password`', async () => {
    const email = 'peter@klaven';
    const errorMessage = 'Missing password';

    await restApi.loginUserWithoutPassword(email,errorMessage);
  });
});


