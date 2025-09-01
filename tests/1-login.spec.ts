import { test } from '@playwright/test';
import { expect } from 'chai';
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
    await page.waitForURL(/.*\/account/);
    expect(page.url()).to.match(/.*\/account/);

    const navMenu = page.locator('[data-test="nav-menu"]');
    await navMenu.waitFor({ state: 'visible' });
    const navMenuText = await navMenu.textContent();
    expect(navMenuText).to.include(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
  });
});
