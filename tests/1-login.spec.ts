import { test, expect } from '@playwright/test';
import { getTestUser } from './utils/get-user';
import { loginUser } from './utils/login';
import { registerUser } from './utils/register';

test.describe('Test Login', () => {
  test('User registration and login process', async ({ page }) => {
    // Step 1: Get a test user
    const testUser = getTestUser('login-test-session');

    // step 2: register a user
    await registerUser(page, testUser);

    // Step 3: Now attempt login (which will handle fallback registration if needed)
    const loggedInUser = await loginUser(page, testUser);

    // Step 4: Verify we're logged in successfully
    await expect(page).toHaveURL(/.*\/account/, { timeout: 10000 });
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
  });
});
