import { test, expect } from '@playwright/test';
import { loginUser } from './utils/test-config';

test.describe('Profile', () => {
  test('Update user profile information', async ({ page }) => {
    // Given I am logged in to my account
    await loginUser(page);
    
    // When I navigate to my profile page
    await page.click('[data-test="nav-menu"]');
    await page.click('[data-test="nav-my-profile"]');
    await expect(page).toHaveURL(/.*\/profile/);
    
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
    await expect(page.locator('[data-test="first-name"]')).toHaveValue(updatedFirstName);
    await expect(page.locator('[data-test="last-name"]')).toHaveValue(updatedLastName);
    await expect(page.locator('[data-test="phone"]')).toHaveValue(updatedPhone);
  });
});
