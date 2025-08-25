// Shared test configuration and credentials
export const testUser: Record<string, string> = {
  email: 'shadow7771d@gmail.com',
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

// Base URL for the application
export const baseURL = 'https://practicesoftwaretesting.com/';

// Reusable login function
export async function loginUser(page: any) {
  // Navigate to homepage
  await page.goto(baseURL);
  
  // Click sign-in link
  await page.click('[data-test="nav-sign-in"]');
  await page.waitForURL(/.*\/login/);
  
  // Fill login credentials
  await page.fill('[data-test="email"]', testUser.email);
  await page.fill('[data-test="password"]', testUser.password);
  await page.click('[data-test="login-submit"]');
  
  // Verify login success
  await page.waitForURL(/.*\/account/);
  // Alternative verification - check for user menu
  // await page.waitForSelector('[data-test="nav-user-menu"]', { timeout: 10000 });
}
