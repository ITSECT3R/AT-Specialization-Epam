import { expect, Page } from '@playwright/test';
import { getTestUser } from './get-user';
import { LoginPage } from '../po/login.page';
import { urls } from '../po/index.page';

// Simple login function - only attempts login, no registration logic
interface User {
  email: string;
  password: string;
}

async function attemptLogin(page: Page, user: User) {
  const login = new LoginPage(page);
  console.log(`🔑 Attempting login for user: ${user.email}`);

  await login.navigateTo(urls().login);
  await login.waitForLoad();

  await login.fillInput(login.enterLogin().emailInput, user.email);
  await login.fillInput(login.enterLogin().passwordInput, user.password);
  await login.clickElement(login.enterLogin().submitBtn);

  await expect(page).toHaveURL(urls().account, { timeout: 10000 });
  console.log(`✅ Login successful for user: ${user.email}`);
}

// Login function with registration fallback
export async function loginUser(page: Page, user?: any) {
  const testUser = user || getTestUser('login-test-session');

  try {
    // First attempt: try to login
    await attemptLogin(page, testUser);
    return testUser;
  } catch (error) {
    console.log(`❌ Login failed for user: ${testUser.email}, will try registration`);
    
    // Import register function only when needed to avoid circular dependency
    const { registerUser } = await import('./register');
    
    // Register the user
    const registrationResult = await registerUser(page, testUser);
    
    if (!registrationResult.success) {
      throw new Error(`Registration failed: ${registrationResult.error}`);
    }
    
    // Second attempt: try to login after registration
    await attemptLogin(page, testUser);
    console.log(`✅ Login successful after registration for user: ${testUser.email}`);
    return testUser;
  }
}
