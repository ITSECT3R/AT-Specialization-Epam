import { expect } from '@playwright/test';
import { getTestUser } from './get-user';

// Simple login function - only attempts login, no registration logic
async function attemptLogin(page: any, user: any) {
  console.log(`🔑 Attempting login for user: ${user.email}`);
  
  await page.goto('/auth/login');
  await page.waitForLoadState('load');
  
  await page.fill('[data-test="email"]', user.email);
  await page.fill('[data-test="password"]', user.password);
  await page.click('[data-test="login-submit"]');
  
  await expect(page).toHaveURL(/.*\/account/, { timeout: 10000 });
  console.log(`✅ Login successful for user: ${user.email}`);
}

// Login function with registration fallback
export async function loginUser(page: any, user?: any) {
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
