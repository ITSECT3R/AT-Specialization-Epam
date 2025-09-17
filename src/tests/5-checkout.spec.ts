import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from '../utils/login.utils';
import { pages } from '../po/index.page';
import { urls } from '../data/index.data';
import { personalDataInputs } from '../data/inputs.data';


test.describe('Checkout', () => {
  test('Complete checkout process', async ({ page }) => {
    const { checkoutPage, productDetailPage, registerPage } = pages(page);

    // Given I have Pilers products in my shopping cart
    // First, login to be able to complete checkout
    await loginUser(page);

    // Navigate to Combination Pliers product
    await checkoutPage.navigateTo(urls.home);
    await page.click('text=Combination Pliers');
    await page.waitForURL(productDetailPage.products.productRegex);
    const productUrl = page.url();

    assert.match(productUrl, productDetailPage.products.productRegex, 'Product URL should match');

    const productName = await productDetailPage.productCard.getProductName();

    (productName as any).should.include(productDetailPage.products.Combination_Pliers.name);
    
    // Add Pliers to cart
    await productDetailPage.productCard.addToCart();
    await page.locator('[data-test="nav-cart"]').waitFor({ state: 'visible' });

    // Verify item was added to cart
    const cartQuantityText = await page.locator(productDetailPage.productCard.cartQuantity).textContent();
    // Using 'expect' style (keep one for variety)
    expect(cartQuantityText).to.include('1');
    
    // When I proceed to checkout
    await page.click('[data-test="nav-cart"]');
    await page.waitForURL(/.*\/checkout/);

    assert.match(page.url(), /.*\/checkout/, 'Checkout URL should match');

    // Verify Pliers product is in cart
    const pliersCell = page.getByRole('cell', { name: productDetailPage.products.Combination_Pliers.name, exact: true });
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
    await page.fill(personalDataInputs.street, '123 Test Street');
    await page.fill(personalDataInputs.city, 'Test City');
    await page.fill(personalDataInputs.state, 'Test State');
    await page.fill(personalDataInputs.country, 'United States');
    await page.fill(personalDataInputs.postalCode, '12345');

    // Proceed to checkout step 3 (Payment)
    await page.click('[data-test="proceed-3"]');
    await page.waitForURL(/.*\/checkout/);

    assert.match(page.url(), /.*\/checkout/, 'Checkout URL should match');

    // And I select a payment method
    
    // Select Bank Transfer payment method

    await page.locator(checkoutPage.paymentInputs['payment Method']).selectOption(checkoutPage.paymentData.method);
    await page.locator(checkoutPage.paymentInputs['bank Name']).fill(checkoutPage.paymentData.bankName);
    await page.locator(checkoutPage.paymentInputs['account Name']).fill(checkoutPage.paymentData.accountName);
    await page.locator(checkoutPage.paymentInputs['account Number']).fill(checkoutPage.paymentData.accountNumber);
    await page.locator(checkoutPage.paymentInputs['finish Btn']).click();

    const paymentSuccessMessage = page.locator('div').filter({ hasText: /^Payment was successful$/ }).first();
    await paymentSuccessMessage.waitFor({ state: 'visible' });
    const isPaymentSuccessVisible = await paymentSuccessMessage.isVisible();

  (isPaymentSuccessVisible as any).should.be.true;
  });
});
