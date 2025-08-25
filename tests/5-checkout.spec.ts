import { test, expect } from '@playwright/test';
import { testUser, baseURL, loginUser } from './test-config';

test.describe('Checkout', () => {
  test('Complete checkout process', async ({ page }) => {
    // Given I have Pilers products in my shopping cart
    // First, login to be able to complete checkout
    await loginUser(page);

    // Navigate to Combination Pliers product
    await page.goto(baseURL);
    await page.click('text=Combination Pliers');
    await expect(page).toHaveURL(/.*\/product\/.*/);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
    
    // Add Pliers to cart
    await page.click('[data-test="add-to-cart"]');
    await page.locator('[data-test="nav-cart"]').waitFor({ state: 'visible' });

    // Verify item was added to cart
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    
    // When I proceed to checkout
    await page.click('[data-test="nav-cart"]');
    await expect(page).toHaveURL(/.*\/checkout/);
    
    // Verify Pliers product is in cart
    await expect(page.getByRole('cell', { name: 'Combination Pliers', exact: true })).toBeVisible();
    
    // Proceed to checkout step 1 (Sign in - already done)
    await page.click('[data-test="proceed-1"]');
    
    // Proceed to checkout step 2 (Address)
    await page.click('[data-test="proceed-2"]');
    await expect(page).toHaveURL(/.*\/checkout/);
    
    // And I fill in my billing and shipping information
    await page.fill('[data-test="street"]', '123 Test Street');
    await page.fill('[data-test="city"]', 'Test City');
    await page.fill('[data-test="state"]', 'Test State');
    await page.fill('[data-test="country"]', 'United States');
    await page.fill('[data-test="postal_code"]', '12345');
    
    // Proceed to checkout step 3 (Payment)
    await page.click('[data-test="proceed-3"]');
    await expect(page).toHaveURL(/.*\/checkout/);
    
    // And I select a payment method
    
    // Select Bank Transfer payment method

    await page.locator('[data-test="payment-method"]').selectOption('bank-transfer');
    await page.locator('[data-test="bank_name"]').fill('Bank of America');
    await page.locator('[data-test="account_name"]').fill('Christofer Hopkins');
    await page.locator('[data-test="account_number"]').fill('123456789');
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('div').filter({ hasText: /^Payment was successful$/ }).first()).toBeVisible();
  });
});
