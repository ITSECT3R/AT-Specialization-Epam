import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from '../utils/login';
import { ProfilePage } from '../po/profile.page';

test.describe('Profile', () => {
  test('Update user profile information', async ({ page }) => {
    const profilePage = new ProfilePage(page);

    // Given I am logged in to my account
    await loginUser(page);
    
    // When I navigate to my profile page using ProfilePage
    await profilePage.navigateToProfile();
    
    // Verify we're on profile page using ProfilePage method
    assert.match(profilePage.getCurrentUrl(), /.*\/profile/, 'URL should match profile page');

    // And I update my personal information with new valid data
    const updatedFirstName = 'Christopher';
    const updatedLastName = 'Hopkins';
    const updatedPhone = '9876543210';
    
    await profilePage.updatePersonalInfo(updatedFirstName, updatedLastName, updatedPhone);
    
    // And I save the changes
    await profilePage.clickSave(); // this click does not work :(

    // Additional verification: Check if the updated data persists using ProfilePage
    const personalInfo = await profilePage.getPersonalInfoValues();

    expect(personalInfo.firstName).to.equal(updatedFirstName);
    (personalInfo.lastName as any).should.equal(updatedLastName);
    assert.equal(personalInfo.phone, updatedPhone, 'Phone value should match updated phone');
  });
});
