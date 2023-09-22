# playwright-automation-tests
This repository contain several examples of automation tests written using Playwright and TypeScript

## Helpful instruction before run the test
1. Clone playwright-automation-tests repository from git [https://github.com/justynabkumortester896412/playwright-automation-tests]
2. Run `npm install` in root folder to initialize the project
3. Run `npx playwright install-deps` in root folder to get all playwright dependencies

## How to run test suite?
- you can run test by `npm run test` commend in terminal - configuration for this is located in package.json file in root folder. Default configuration for 'headless' mode is set

You can add additional options to command as provided below:
- tests in 'headed' mode: `npm run test -- --headed`
- single test: `npm run test -- -g TEST-1` - where 'TEST-1' is the key of test which you want to run, you can find it in the summary of tests
- test with disable parallelization: `npm run test -- --workers 1`

## Used tools
- Playwright
- ESlint
- chance


