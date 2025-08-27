import { Page, expect } from '@playwright/test';
import { getTestUser, baseURL } from './test-config';

/**
 * Registration utility for handling user registration with fallback logic
 * This module provides robust user registration functionality that can be used
 * as a fallback when login failures occur due to invalid credentials
 */

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
    await page.goto(baseURL + '/auth/register');
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

/**
 * Attempt to login with the provided credentials
 * @param page - Playwright page object
 * @param user - User data object
 * @returns Promise<boolean> - Success status
 */
export async function attemptLogin(page: Page, user: any): Promise<boolean> {
  try {
    console.log(`🔄 Attempting login for user: ${user.email}`);
    
    // Navigate to login page if not already there
    if (!page.url().includes('/login')) {
      await page.goto(baseURL + '/auth/login');
      await page.waitForLoadState('load');
    }
    
    // Fill login credentials
    await page.fill('[data-test="email"]', user.email);
    await page.fill('[data-test="password"]', user.password);
    await page.click('[data-test="login-submit"]');
    
    // Check for successful login - try multiple indicators
    try {
      // Option 1: Wait for account page redirect
      await expect(page).toHaveURL(/.*\/account/, { timeout: 5000 });
      console.log(`✅ Login successful (account page redirect): ${user.email}`);
      return true;
    } catch {
      try {
        // Option 2: Check for user menu/profile indicator
        await page.waitForSelector('[data-test="nav-menu"]', { timeout: 5000 });
        console.log(`✅ Login successful (nav menu visible): ${user.email}`);
        return true;
      } catch {
        // Option 3: Check if we're NOT on login page anymore
        await page.waitForTimeout(2000); // Give it a moment
        const currentUrl = page.url();
        const loginSuccess = !currentUrl.includes('/login');
        if (loginSuccess) {
          console.log(`✅ Login successful (left login page): ${user.email}`);
        } else {
          console.log(`❌ Login failed (still on login page): ${user.email}`);
        }
        return loginSuccess;
      }
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(`❌ Login attempt failed for user ${user.email}: ${errorMessage}`);
    return false;
  }
}

/**
 * Register a new user and immediately attempt to login
 * This is the main fallback function to use when login fails
 * @param page - Playwright page object
 * @param sessionKey - Session key for user isolation (optional)
 * @returns Promise<any> - User data if successful
 */
export async function registerAndLogin(page: Page, sessionKey: string = 'fallback'): Promise<any> {
  // Generate a new user for this session
  const user = getTestUser(sessionKey);
  
  console.log(`🔄 Starting register and login process for session: ${sessionKey}`);
  
  // Attempt registration
  const registrationResult = await registerUser(page, user);
  
  if (!registrationResult.success) {
    throw new Error(`Registration failed: ${registrationResult.error}`);
  }
  
  // Attempt login with the newly registered user
  const loginSuccess = await attemptLogin(page, user);
  
  if (!loginSuccess) {
    throw new Error(`Login failed after successful registration for user: ${user.email}`);
  }
  
  console.log(`✅ Successfully registered and logged in user: ${user.email}`);
  return user;
}

/**
 * Smart login with automatic fallback to registration
 * Use this function when you need to ensure a user is logged in
 * @param page - Playwright page object
 * @param sessionKey - Session key for user isolation
 * @returns Promise<any> - User data if successful
 */
export async function ensureUserLoggedIn(page: Page, sessionKey: string = 'default'): Promise<any> {
  const user = getTestUser(sessionKey);
  
  console.log(`🔄 Ensuring user is logged in for session: ${sessionKey}`);
  
  // First, try to login with existing user
  const loginSuccess = await attemptLogin(page, user);
  
  if (loginSuccess) {
    console.log(`✅ User already registered and logged in: ${user.email}`);
    return user;
  }
  
  // Login failed, try registration as fallback
  console.log(`⚠️ Login failed, attempting registration fallback...`);
  return await registerAndLogin(page, sessionKey);
}

/**
 * Utility function to check if a user is currently logged in
 * @param page - Playwright page object
 * @returns Promise<boolean> - True if logged in
 */
export async function isUserLoggedIn(page: Page): Promise<boolean> {
  try {
    // Check for common logged-in indicators
    const navMenu = await page.locator('[data-test="nav-menu"]').isVisible();
    if (navMenu) return true;
    
    // Check if current URL indicates logged in state
    const currentUrl = page.url();
    return currentUrl.includes('/account') || currentUrl.includes('/profile');
    
  } catch {
    return false;
  }
}
