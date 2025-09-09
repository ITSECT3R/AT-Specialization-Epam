import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from './utils/login';

test.describe('Checkout', () => {
  test('Complete checkout process', async ({ page }) => {

    // Given I have Pilers products in my shopping cart
    // First, login to be able to complete checkout
    await loginUser(page);

    // Navigate to Combination Pliers product
    await page.goto('/');
    await page.click('text=Combination Pliers');
    await page.waitForURL(/.*\/product\/.*/);
    const productUrl = page.url();

  assert.match(productUrl, /.*\/product\/.*/, 'Product URL should match');
    
    const productName = await page.locator('[data-test="product-name"]').textContent();

  (productName as any).should.include('Combination Pliers');
    
    // Add Pliers to cart
    await page.click('[data-test="add-to-cart"]');
    await page.locator('[data-test="nav-cart"]').waitFor({ state: 'visible' });

    // Verify item was added to cart
    const cartQuantityText = await page.locator('[data-test="cart-quantity"]').textContent();
  // Using 'expect' style (keep one for variety)
  expect(cartQuantityText).to.include('1');
    
    // When I proceed to checkout
    await page.click('[data-test="nav-cart"]');
    await page.waitForURL(/.*\/checkout/);

  assert.match(page.url(), /.*\/checkout/, 'Checkout URL should match');

    // Verify Pliers product is in cart
    const pliersCell = page.getByRole('cell', { name: 'Combination Pliers', exact: true });
    await pliersCell.waitFor({ state: 'visible' });
    const isPliersVisible = await pliersCell.isVisible();

  (isPliersVisible as any).should.be.true;
    
    // Proceed to checkout step 1 (Sign in - already done)
    await page.click('[data-test="proceed-1"]');
    
    // Proceed to checkout step 2 (Address)
    await page.click('[data-test="proceed-2"]');
    await page.waitForURL(/.*\/checkout/);
  // Using 'expect' style (keep one for variety)
  expect(page.url()).to.match(/.*\/checkout/);

    // And I fill in my billing and shipping information
    await page.fill('[data-test="street"]', '123 Test Street');
    await page.fill('[data-test="city"]', 'Test City');
    await page.fill('[data-test="state"]', 'Test State');
    await page.fill('[data-test="country"]', 'United States');
    await page.fill('[data-test="postal_code"]', '12345');
    
    // Proceed to checkout step 3 (Payment)
    await page.click('[data-test="proceed-3"]');
    await page.waitForURL(/.*\/checkout/);

  assert.match(page.url(), /.*\/checkout/, 'Checkout URL should match');

    // And I select a payment method
    
    // Select Bank Transfer payment method

    await page.locator('[data-test="payment-method"]').selectOption('bank-transfer');
    await page.locator('[data-test="bank_name"]').fill('Bank of America');
    await page.locator('[data-test="account_name"]').fill('Christofer Hopkins');
    await page.locator('[data-test="account_number"]').fill('123456789');
    await page.locator('[data-test="finish"]').click();
    
    const paymentSuccessMessage = page.locator('div').filter({ hasText: /^Payment was successful$/ }).first();
    await paymentSuccessMessage.waitFor({ state: 'visible' });
    const isPaymentSuccessVisible = await paymentSuccessMessage.isVisible();

  (isPaymentSuccessVisible as any).should.be.true;
  });
});
