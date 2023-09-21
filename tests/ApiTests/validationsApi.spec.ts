import test from '../testRestApi';

test('Validation 2.1', async ({ restApi }) => {
  await test.step('Get a list of users, validate that the response code is `200` and print all users with odd ID numbers', 
  async () => {
    const users = await restApi.getUserList();
    console.log(users);
  });
});

test('Validation 2.2', async ({ restApi }) => {
  await test.step('Get single user 13', async () => {
    const idUser = '13';
    await restApi.getNotExistingUser(idUser);
  });
  // await test.step('Validate that the user not found', async () => {

  // });
  // await test.step('Validate that the response code is `404`', async () => {

  // });
});

test('Validation 2.3', async ({ restApi }) => {
  await test.step('Create a new user, validate that the response code is `201` and validate that the creation date is today', async () => {
    const name = 'Jan';
    const job = 'developer';
    await restApi.createSingleUser(name,job);
  });
});

test('Validation 2.4', async ({ restApi }) => {
  await test.step('Update a user, validate that the response code is `200` and validate that the response body matches the request body where applicable', async () => {
    const name = 'morpheus';
    const job = 'zion resident';
    await restApi.updateUser(name,job);
  });
});

test('Validation 2.5', async ({ restApi }) => {
  await test.step('Write a parameterized validation with the values `0` and `3`', async () => {
    const delayValue = '2';

    restApi.getUserListWithDelayedResponse(delayValue);
    
  });
  await test.step('Get a list of users passing a delay query parameter with the provided value for the validation', async () => {

  });
  await test.step('Validate that the response time is no longer than `1` second', async () => {

  });
});

test('Validation 2.6', async ({ restApi }) => {
  await test.step('Use whatever asynchronous technique you prefer to get `10` single users and validate, asynchronously as well, that all response codes are `200s`', async () => {
    const numberOfUsers = 10;

    restApi.createUsers(numberOfUsers);
  });
});

test('Validation 2.7', async ({ restApi }) => {
  await test.step('Login user without password', async () => {
    const mail = 'peter@klaven';
    const errorMessage = 'Missing password';

    restApi.loginUserWithoutPassword(mail,errorMessage);
  });
  await test.step('Validate that the user could not login', async () => {

  });
  await test.step('Validate that the response code is `404`', async () => {

  });
  await test.step('Validate that the error message is ` Missing password`', async () => {

  });
});


