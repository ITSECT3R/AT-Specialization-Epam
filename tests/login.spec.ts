import { test, expect } from '@playwright/test';
import { testUser, baseURL } from './test-config';

test.describe('Test Login', () => {
  test('User registration and login process', async ({ page }) => {
    // Given I am on the Practice Software Testing homepage
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Practice Software Testing/);
    // When I click on the "Sign in" link
    await page.click('[data-test="nav-sign-in"]');
    await expect(page).toHaveURL(/.*\/login/);
    
    // And I register a new account with valid credentials
    await page.click('[data-test="register-link"]');
    await expect(page).toHaveURL(/.*\/register/);

    await page.fill('[data-test="first-name"]', testUser.firstName);
    await page.fill('[data-test="last-name"]', testUser.lastName);
    await page.fill('[data-test="dob"]', testUser.dob);
    await page.fill('[data-test="street"]', testUser.street);
    await page.fill('[data-test="postal_code"]', testUser.postalCode);
    await page.fill('[data-test="city"]', testUser.city);
    await page.fill('[data-test="state"]', testUser.state);
    await page.selectOption('[data-test="country"]', { label: testUser.country });
    await page.fill('[data-test="phone"]', testUser.phone);
    await page.fill('[data-test="email"]', testUser.email);
    await page.fill('[data-test="password"]', testUser.password);
    await page.click('[data-test="register-submit"]');
    
    // Wait for registration to complete and navigate to login page
    await expect(page).toHaveURL(/.*\/login/);
    
    // And I login with the newly created account credentials
    await page.fill('[data-test="email"]', testUser.email);
    await page.fill('[data-test="password"]', testUser.password);
    await page.click('[data-test="login-submit"]');
    
    // Then I should be successfully logged in and see my account dashboard
    await expect(page).toHaveURL(/.*\/account/);
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(`${testUser.firstName} ${testUser.lastName}`);
  });
});
