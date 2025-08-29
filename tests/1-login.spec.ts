import { test, expect } from '@playwright/test';
import { getTestUser } from './utils/test-config';
import { registerUser, attemptLogin } from './utils/register/register';

test.describe('Test Login', () => {
  test('User registration and login process', async ({ page }) => {
    // Get unique user for this test session
    const testUser = getTestUser('login-test-session');
    console.log(`🧪 Testing registration and login for user: ${testUser.email}`);
    
    // Given I am on the Practice Software Testing homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Practice Software Testing/);
    
    // When I use the registration utility to register the user
    const registrationResult = await registerUser(page, testUser);
    
    if (!registrationResult.success) {
      throw new Error(`Registration failed: ${registrationResult.error}`);
    }
    
    // Then I should be able to login with the newly created account
    const loginSuccess = await attemptLogin(page, testUser);
    
    if (!loginSuccess) {
      throw new Error(`Login failed after successful registration for user: ${testUser.email}`);
    }
    
    // And I should see my account dashboard with correct user information
    await expect(page).toHaveURL(/.*\/account/);
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(`${testUser.firstName} ${testUser.lastName}`);
    
    console.log(`✅ Registration and login test completed successfully for user: ${testUser.email}`);
  });
});
