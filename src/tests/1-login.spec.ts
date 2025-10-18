import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { pages } from '../po/index.page';
import { urls } from '../data/index.data';
import { getTestUser, loginUser, registerUser } from '../utils/index.utils';

test.describe('Test Login', () => {
  test('User registration and login process', async ({ page }) => {
    const { loginPage } = pages(page);

    // Step 1: Get a test user
    const testUser = getTestUser('login-test-session');

    // step 2: register a user
    await registerUser(page, testUser);

    // Step 3: Now attempt login (which will handle fallback registration if needed)
    const loggedInUser = await loginUser(page, testUser);

    // Step 4: Verify we're logged in successfully using LoginPage
    await loginPage.waitForLoad();

    const navMenuText = await loginPage.getNavMenuText();
    const accountUrl = await loginPage.getCurrentUrl();

    expect(accountUrl).to.equal(urls.account);
    (navMenuText as any).should.include(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
  });
});
