import { newUser } from '../data/index.data';

// Store unique users per browser session using a Map
const browserUsers = new Map<string, Record<string, string>>();

// Dynamic user data generation for browser isolation
export function generateUniqueEmail(): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  // Use a combination of timestamp and random for uniqueness
  return `test.user.${timestamp}.${randomSuffix}@example.com`;
}

export const getTestUser = (browserContext?: string): Record<string, string> => {
  // Create a unique key for this test session
  // For login-test-session, use a fixed key to avoid regeneration per browser
  const sessionKey =
    browserContext === 'login-test-session'
      ? 'login-test-session'
      : browserContext || `session-${Date.now()}`;

  // Return existing user if already created for this session
  if (browserUsers.has(sessionKey)) {
    console.log(
      `♻️ Reusing existing user for session ${sessionKey}: ${browserUsers.get(sessionKey)!.email}`
    );
    return browserUsers.get(sessionKey)!;
  }

  // Store user for this session
  browserUsers.set(sessionKey, newUser);
  console.log(`🧪 Generated test user for session ${sessionKey}: ${newUser.email}`);
  return newUser;
};
