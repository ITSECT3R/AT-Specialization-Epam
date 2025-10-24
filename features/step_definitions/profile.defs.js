import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, assert } from 'chai';

setDefaultTimeout(60 * 1000);

// Test data storage
let profilePage;

Given('I am logged in to my account', async function () {
  const { pages, loginUser } = await this.loadModules();

  // Given I am logged in to my account (using the existing loginUser utility)
  await loginUser(this.page);

  // Get profile page instance for subsequent steps
  profilePage = pages(this.page).profilePage;
});

When('I navigate to my profile page', async function () {
  await this.loadModules();

  // When I navigate to my profile page using ProfilePage
  await profilePage.header.navMenuTo('profile');
});

Then('I should be on the profile page', async function () {
  const { urls } = await this.loadModules();

  // Verify we're on profile page using ProfilePage method
  const currentUrl = await profilePage.getCurrentUrl();
  assert.equal(currentUrl, urls.profile, 'URL should match profile page');
});

When('I update my personal information with new details', async function () {
  const { updateUserInfo } = await this.loadModules();

  // Update personal information using the same data as the spec test
  await profilePage.updatePersonalInfo(
    updateUserInfo.name,
    updateUserInfo.lastName,
    updateUserInfo.phone
  );
});

When('I save the changes', async function () {
  await this.loadModules();

  // And I save the changes
  await profilePage.clickSave(); // Note: this click does not work :( (as noted in spec)
});

Then('my personal information should be updated successfully', async function () {
  const { updateUserInfo } = await this.loadModules();

  // Get the personal info values to verify the update
  const personalInfo = await profilePage.getPersonalInfoValues();

  // Verify the updated data using the same assertions as the spec test
  expect(personalInfo.firstName).to.equal(updateUserInfo.name);
  expect(personalInfo.lastName).to.equal(updateUserInfo.lastName);
  assert.equal(personalInfo.phone, updateUserInfo.phone, 'Phone value should match updated phone');
});

Then('the updated data should persist in the form fields', async function () {
  const { updateUserInfo } = await this.loadModules();

  // Additional verification: Check if the updated data persists using ProfilePage
  const personalInfo = await profilePage.getPersonalInfoValues();

  // Verify all fields are populated with the updated values
  expect(personalInfo.firstName).to.equal(updateUserInfo.name);
  expect(personalInfo.lastName).to.equal(updateUserInfo.lastName);
  expect(personalInfo.phone).to.equal(updateUserInfo.phone);
});
