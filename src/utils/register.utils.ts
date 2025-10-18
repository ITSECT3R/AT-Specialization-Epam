import { Page, expect } from '@playwright/test';
import { urls } from '../data/index.data';
import { pages } from '../po/index.page';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface RegistrationResult {
  success: boolean;
  user: User;
  error?: string;
}

/**
 * Register a new user with the provided data
 * @param page - Playwright page object
 * @param user - User data object
 * @returns Promise<RegistrationResult> - Registration result with success status
 */

export async function registerUser(page: Page, user: User): Promise<RegistrationResult> {
  const { registerPage } = pages(page);

  try {
    console.log(`🔄 Starting registration for user: ${user.email}`);

    // Navigate to registration page
    await registerPage.navigateTo(urls.register);

    // Fill registration form using inputs from register.page.ts
    await registerPage.inputs.firstName.fill(user.firstName);
    await registerPage.inputs.lastName.fill(user.lastName);
    await registerPage.inputs.dob.fill(user.dob);
    await registerPage.inputs.street.fill(user.street);
    await registerPage.inputs.postalCode.fill(user.postalCode);
    await registerPage.inputs.city.fill(user.city);
    await registerPage.inputs.state.fill(user.state);
    await registerPage.inputs.country.selectOption({ label: user.country });
    await registerPage.inputs.phone.fill(user.phone);
    await registerPage.inputs.email.fill(user.email);
    await registerPage.inputs.password.fill(user.password);

    // Submit registration
    await registerPage.registerButton.click();

    // Wait for registration success (redirect to login page)
    await expect(page).toHaveURL(urls.login, { timeout: 15000 });

    console.log(`✅ Successfully registered user: ${user.email}`);
    return {
      success: true,
      user: user,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(`❌ Registration failed for user ${user.email}: ${errorMessage}`);
    return {
      success: false,
      user: user,
      error: errorMessage,
    };
  }
}
