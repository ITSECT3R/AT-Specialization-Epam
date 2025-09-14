import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { LoginPage } from '../po/login.page';
import { tools, urls } from '../po';

test.describe('Test Login', () => {
  test('User registration and login process', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Step 1: Get a test user
    const testUser = tools.getTestUser('login-test-session');

    // step 2: register a user
    await tools.registerUser(page, testUser);

    // Step 3: Now attempt login (which will handle fallback registration if needed)
    const loggedInUser = await tools.loginUser(page, testUser);

    // Step 4: Verify we're logged in successfully using LoginPage
    await loginPage.waitForLoad();
    
    const navMenuText = await loginPage.getNavMenuText();
    const accountUrl = loginPage.getCurrentUrl();
    
    expect(accountUrl).to.equal(urls.account);
    (navMenuText as any).should.include(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
    assert.strictEqual(accountUrl, urls.account, 'URL should match account page');
    });
});
