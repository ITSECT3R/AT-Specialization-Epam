import { Page, expect } from '@playwright/test';

export interface RegistrationResult {
  success: boolean;
  user: any;
  error?: string;
}

/**
 * Register a new user with the provided data
 * @param page - Playwright page object
 * @param user - User data object
 * @returns Promise<RegistrationResult> - Registration result with success status
 */

export async function registerUser(page: Page, user: any): Promise<RegistrationResult> {
  try {
    console.log(`🔄 Starting registration for user: ${user.email}`);
    
    // Navigate to registration page
    await page.goto('/auth/register');
    await page.waitForLoadState('load');
    
    // Fill registration form using the exact locators from your working test
    await page.fill('[data-test="first-name"]', user.firstName);
    await page.fill('[data-test="last-name"]', user.lastName);
    await page.fill('[data-test="dob"]', user.dob);
    await page.fill('[data-test="street"]', user.street);
    await page.fill('[data-test="postal_code"]', user.postalCode);
    await page.fill('[data-test="city"]', user.city);
    await page.fill('[data-test="state"]', user.state);
    await page.selectOption('[data-test="country"]', { label: user.country });
    await page.fill('[data-test="phone"]', user.phone);
    await page.fill('[data-test="email"]', user.email);
    await page.fill('[data-test="password"]', user.password);
    
    // Submit registration
    await page.click('[data-test="register-submit"]');
    
    // Wait for registration success (redirect to login page)
    await expect(page).toHaveURL(/.*\/login/, { timeout: 15000 });
    
    console.log(`✅ Successfully registered user: ${user.email}`);
    return {
      success: true,
      user: user
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(`❌ Registration failed for user ${user.email}: ${errorMessage}`);
    return {
      success: false,
      user: user,
      error: errorMessage
    };
  }
}
