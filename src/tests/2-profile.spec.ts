import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from '../utils/index.utils';
import { pages } from '../po/index.page';
import { urls, updateUserInfo } from '../data/index.data';

test.describe('Profile', () => {
  test('Update user profile information', async ({ page }) => {
    const { profilePage } = pages(page);

    // Given I am logged in to my account
    await loginUser(page);
    
    // When I navigate to my profile page using ProfilePage
    await profilePage.navigateTo(urls.profile);

    await profilePage.clickSave()
    
    // Verify we're on profile page using ProfilePage method
    assert.equal(await profilePage.getCurrentUrl(), urls.profile, 'URL should match profile page');

    await profilePage.updatePersonalInfo(updateUserInfo.name, updateUserInfo.lastName, updateUserInfo.phone);

    // And I save the changes
    await profilePage.clickSave(); // this click does not work :(

    // Additional verification: Check if the updated data persists using ProfilePage
    const personalInfo = await profilePage.getPersonalInfoValues();

    expect(personalInfo.firstName).to.equal(updateUserInfo.name);
    (personalInfo.lastName as any).should.equal(updateUserInfo.lastName);
    assert.equal(personalInfo.phone, updateUserInfo.phone, 'Phone value should match updated phone');
  });
});
