// Dynamic user data generation for browser isolation
const generateUniqueEmail = (): string => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  // Use a combination of timestamp and random for uniqueness
  return `test.user.${timestamp}.${randomSuffix}@example.com`;
};

// Store unique users per browser session using a Map
const browserUsers = new Map<string, Record<string, string>>();

export const getTestUser = (browserContext?: string): Record<string, string> => {
  // Create a unique key for this test session
  // For login-test-session, use a fixed key to avoid regeneration per browser
  const sessionKey = browserContext === 'login-test-session' 
    ? 'login-test-session' 
    : (browserContext || `session-${Date.now()}`);
  
  // Return existing user if already created for this session
  if (browserUsers.has(sessionKey)) {
    console.log(`♻️ Reusing existing user for session ${sessionKey}: ${browserUsers.get(sessionKey)!.email}`);
    return browserUsers.get(sessionKey)!;
  }

  // Generate new user data for this session
  const newUser = {
    email: generateUniqueEmail(),
    password: 'shadowFax123!',
    firstName: 'Christofer',
    lastName: 'Hopkins',
    dob: '1990-01-01',
    street: '123 Main St',
    postalCode: '12345',
    city: 'Anytown',
    state: 'CA',
    country: 'Mexico',
    phone: '1234567890'
  };

  // Store user for this session
  browserUsers.set(sessionKey, newUser);
  console.log(`🧪 Generated test user for session ${sessionKey}: ${newUser.email}`);
  return newUser;
};

// Reusable login function with registration fallback
export async function loginUser(page: any) {
  // Import the registration utilities
  const { ensureUserLoggedIn } = await import('./register/register');
  
  // Use the smart login function that handles registration fallback
  return await ensureUserLoggedIn(page, 'login-test-session');
}
