import { test, expect } from '@playwright/test';
import { testUser, baseURL } from './test-config';

test.describe('Products Shop & Cart Testing', () => {
  
  test('View detailed product information', async ({ page }) => {
    // Given I am on the Practice Software Testing homepage
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page).toHaveTitle(/Practice Software Testing/);
    
    // When I click on the Bolt Cutters from the product list
    await page.click('text=Bolt Cutters');
    
    // And I view the product details page
    await expect(page).toHaveURL(/.*\/product\/.*/);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Bolt Cutters');
    
    // And I check the product specifications and images
    await expect(page.getByRole('img', { name: 'Bolt Cutters' })).toBeVisible();
    await expect(page.locator('[data-test="product-description"]')).toBeVisible();
    
    // Then I should see "$48.41" as product's price
    await expect(page.getByText('$')).toContainText('$48.41');

    // And I should see "Aliquam viverra scelerisque tempus..." as description
    await expect(page.locator('[data-test="product-description"]'))
      .toContainText('Aliquam viverra scelerisque tempus. Ut vehicula, ex sed elementum');
    
    // And I should see Related Products including "combination pilers, pilers, etc."
    await expect(page.getByRole('link', { name: 'Combination Pliers' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Combination Pliers' })).toContainText(/Combination Pliers More information/i);
  });

  test('Add Thor Hammer to shopping cart', async ({ page }) => {
    // Given I am viewing the Thor Hammer details page
    await page.goto('https://practicesoftwaretesting.com/');
    await page.click('text=Thor Hammer');
    await expect(page).toHaveURL(/.*\/product\/.*/);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Thor Hammer');
    
    // When I select the desired quantity to "1" for the product
    await expect(page.locator('[data-test="quantity"]')).toHaveValue('1');

    // And I click the "Add to Cart" button
    await page.click('[data-test="add-to-cart"]');
    // Wait for 5 seconds to allow the message to disappear
    await page.waitForTimeout(5000);
    
    // Verify item was added (optional step)
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    
    // And I navigate to the shopping cart page
    await page.click('[data-test="nav-cart"]');
    await expect(page).toHaveURL(/.*\/checkout/);
    
    // Then I should see the Thor Hammer product in my cart with correct quantity of "1" and price "$11.14"
    await expect(page.getByRole('cell', { name: 'Thor Hammer', exact: true })).toContainText('Thor Hammer');
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    await expect(page.locator('[data-test="cart-total"]')).toContainText('$11.14');
  });

  test('Add product to favorites list', async ({ page }) => {
    // Given I am logged in and viewing the Long Nose Pilers product details page
    await page.goto(baseURL);
    
    // Login first (prerequisite for favorites)
    await page.click('[data-test="nav-sign-in"]');
    await expect(page).toHaveURL(/.*\/login/);
    
    // Use existing account credentials from test-config
    await page.fill('[data-test="email"]', testUser.email);
    await page.fill('[data-test="password"]', testUser.password);
    await page.click('[data-test="login-submit"]');

    // Wait for navigation after login
    await page.waitForNavigation();

    // Verify login success
    await expect(page.locator('#navbarSupportedContent')).toBeVisible();
    
    // Navigate to Long Nose Pilers product
    await page.goto(baseURL);
    await page.click('[data-test="product-01K35FZB5WHAVS118PXM593Z78"]');
    await expect(page).toHaveURL(/.*\/product\/.*/);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Long Nose Pliers');
    
    // When I click the "Add to Favorites" or star icon
    await page.click('[data-test="add-to-favorites"]');
    
    // Then I should see visual feedback that the product was added to favorites
    // Since we're logged in, it should successfully add to favorites
    await expect(page.locator('div').filter({ hasText: 'Product added to your' }).nth(2)).toHaveText("Product added to your favorites list.");

    // Or check for success message
    // await expect(page.locator('[data-test="success-message"]')).toContainText(/added.*favorites|favorite.*added/i);
  });
});
