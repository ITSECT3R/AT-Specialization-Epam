import { expect, Page } from '@playwright/test';
import { getTestUser } from '../utils/index.utils';
import { pages } from '../po/index.page';
import { urls } from '../data/index.data';

interface User {
  email: string;
  password: string;
}

async function attemptLogin(page: Page, user: User) {
  const { loginPage } = pages(page);
  
  console.log(`🔑 Attempting login for user: ${user.email}`);

  await loginPage.navigateTo(urls.login);
  await loginPage.waitForLoad();

  await loginPage.login(user.email, user.password);

  await expect(page).toHaveURL(urls.account, { timeout: 10000 });
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
    const { registerUser } = await import('./register.utils');
    
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
