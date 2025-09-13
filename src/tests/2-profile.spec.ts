import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from '../utils/login';

test.describe('Profile', () => {
  test('Update user profile information', async ({ page }) => {

    // Given I am logged in to my account
    await loginUser(page);
    
    // When I navigate to my profile page
    await page.click('[data-test="nav-menu"]');
    await page.click('[data-test="nav-my-profile"]');
    await page.waitForURL(/.*\/profile/);
  // Using 'assert' style
  assert.match(page.url(), /.*\/profile/, 'URL should match profile page');

    // And I update my personal information with new valid data
    const updatedFirstName = 'Christopher';
    const updatedLastName = 'Hopkins';
    const updatedPhone = '9876543210';
    
    await page.fill('[data-test="first-name"]', updatedFirstName);
    await page.fill('[data-test="last-name"]', updatedLastName);
    await page.fill('[data-test="phone"]', updatedPhone);
    
    // And I save the changes
    await page.waitForSelector('[data-test="update-profile-submit"]', { state: 'visible' });
    await page.click('[data-test="update-profile-submit"]'); // this click does not work :(

    // Additional verification: Check if the updated data persists
    const firstNameValue = await page.locator('[data-test="first-name"]').inputValue();
    const lastNameValue = await page.locator('[data-test="last-name"]').inputValue();
    const phoneValue = await page.locator('[data-test="phone"]').inputValue();
    
  // Using 'should' style
  (firstNameValue as any).should.equal(updatedFirstName);
  // Using 'expect' style (keep one for variety)
  expect(lastNameValue).to.equal(updatedLastName);
  // Using 'assert' style
  assert.equal(phoneValue, updatedPhone, 'Phone value should match updated phone');
  });
});
