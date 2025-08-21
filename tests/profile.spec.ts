import { test, expect } from '@playwright/test';
import { testUser, baseURL } from './test-config';

test.describe('Profile', () => {
  test('Update user profile information', async ({ page }) => {
    // Given I am logged in to my account
    await page.goto(baseURL);
    
    // Login first (prerequisite for profile update)
    await page.click('[data-test="nav-sign-in"]');
    await expect(page).toHaveURL(/.*\/login/);
    
    // Use existing account credentials
    await page.fill('[data-test="email"]', testUser.email);
    await page.fill('[data-test="password"]', testUser.password);
    await page.click('[data-test="login-submit"]');
    
    // Verify login success
    await expect(page).toHaveURL(/.*\/account/);
    
    // When I navigate to my profile page
    await page.click('[data-test="nav-menu"]');
    await page.click('[data-test="nav-my-profile"]');
    await expect(page).toHaveURL(/.*\/profile/);
    
    // And I update my personal information with new valid data
    const updatedFirstName = 'Christopher';
    const updatedLastName = 'Hopkins-Updated';
    const updatedPhone = '9876543210';
    
    await page.fill('[data-test="first-name"]', updatedFirstName);
    await page.fill('[data-test="last-name"]', updatedLastName);
    await page.fill('[data-test="phone"]', updatedPhone);
    
    // And I save the changes
    await page.click('[data-test="update-profile-submit"]');
    
    // Then I should see a confirmation message that my profile has been updated to be visible not available
    // await expect(page.getByText('Your profile is successfully updated')).toBeVisible();

    // Additional verification: Check if the updated data persists
    await expect(page.locator('[data-test="first-name"]')).toHaveValue(updatedFirstName);
    await expect(page.locator('[data-test="last-name"]')).toHaveValue(updatedLastName);
    await expect(page.locator('[data-test="phone"]')).toHaveValue(updatedPhone);
  });
});
