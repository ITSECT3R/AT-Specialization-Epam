import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from 'chai';

setDefaultTimeout(60 * 1000);

// Test data storage
let testUser;
let loggedInUser;
let loginPage;

Given('I am on the Practice Software Testing homepage', async function () {
  const { pages } = await this.loadModules();

  const { homePage } = pages(this.page);
  await homePage.navigateTo(this.baseURL);

  // Verify we're on the homepage
  const currentUrl = await homePage.getCurrentUrl();
  expect(currentUrl).to.include(this.baseURL);
});

When('I register a new account with valid credentials', async function () {
  const { getTestUser, registerUser } = await this.loadModules();

  // Step 1: Get a test user
  testUser = getTestUser('cucumber-login-test-session');

  // Step 2: Register user using the utility function
  await registerUser(this.page, testUser);
});

When('I login with the newly created account credentials', async function () {
  const { pages, loginUser } = await this.loadModules();

  // Step 3: Login using the utility function
  loggedInUser = await loginUser(this.page, testUser);

  // Get login page instance for verification
  loginPage = pages(this.page).loginPage;
});

Then('I should be successfully logged in and see my account dashboard', async function () {
  const { urls } = await this.loadModules();

  // Step 4: Verify we're logged in successfully using LoginPage
  await loginPage.waitForLoad();

  const accountUrl = await loginPage.getCurrentUrl();
  expect(accountUrl).to.equal(urls.account);
});

Then('I should see my name displayed in the navigation menu', async function () {
  await this.loadModules();

  // Verify name in navigation menu
  const navMenuText = await loginPage.getNavMenuText();
  expect(navMenuText).to.include(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
});
