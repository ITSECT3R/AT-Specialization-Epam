import { Page, expect } from '@playwright/test';
import { urls } from '../po/index.page.ts';
import { RegisterPage } from '../po/register.page.ts';

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
    const register = new RegisterPage(page);
    console.log(`🔄 Starting registration for user: ${user.email}`);

    // Navigate to registration page
    await register.navigateTo(urls.register);

    // Fill registration form using inputs from register.page.ts
    const inputs = register.inputs();
    await page.fill(inputs.firstName, user.firstName);
    await page.fill(inputs.lastName, user.lastName);
    await page.fill(inputs.dob, user.dob);
    await page.fill(inputs.street, user.street);
    await page.fill(inputs.postalCode, user.postalCode);
    await page.fill(inputs.city, user.city);
    await page.fill(inputs.state, user.state);
    await page.selectOption(inputs.country, { label: user.country });
    await page.fill(inputs.phone, user.phone);
    await page.fill(inputs.email, user.email);
    await page.fill(inputs.password, user.password);
    
    // Submit registration
    await register.clickElement(inputs.registerButton);
    
    // Wait for registration success (redirect to login page)
    await expect(page).toHaveURL(urls.login, { timeout: 15000 });
    
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
