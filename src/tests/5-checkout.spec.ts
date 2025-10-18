import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from '../utils/index.utils';
import { pages } from '../po/index.page';
import { urls, products } from '../data/index.data';

test.describe('Checkout', () => {
  test('Complete checkout process', async ({ page }) => {
    const { checkoutPage, productDetailPage, homePage } = pages(page);

    // Given I have Pliers products in my shopping cart
    // First, login to be able to complete checkout
    await loginUser(page);

    // Navigate to Combination Pliers product
    await homePage.navigateTo(urls.home);
    await homePage.clickByText('Combination Pliers');
    await homePage.waitForUrl(products.productRegex);
    const productUrl = await homePage.getCurrentUrl();

    assert.match(productUrl, products.productRegex, 'Product URL should match');

    const productName = await productDetailPage.productCard.getProductName();

    (productName as any).should.include(products.Combination_Pliers.name);

    // Add Pliers to cart
    await productDetailPage.productCard.addToCart();
    await productDetailPage.header.navHeaderBtns.cart.waitFor({ state: 'visible' });

    // Verify item was added to cart
    const cartQuantityText = await productDetailPage.header.getCartQuantity();
    // Using 'expect' style (keep one for variety)
    expect(cartQuantityText).to.include('1');

    // When I proceed to checkout
    await productDetailPage.header.clickHeaderButton('cart');
    await checkoutPage.waitForUrl(/.*\/checkout/);

    assert.match(await checkoutPage.getCurrentUrl(), /.*\/checkout/, 'Checkout URL should match');

    // Verify Pliers product is in cart
    const pliersCell = await checkoutPage.findCellByText('cell', products.Combination_Pliers.name);
    await pliersCell.waitFor({ state: 'visible' });
    const isPliersVisible = await pliersCell.isVisible();

    (isPliersVisible as any).should.be.true;

    // Proceed to checkout step 1 (Sign in - already done)
    await checkoutPage.proceedBtns.btn1.click();

    // Proceed to checkout step 2 (Address)
    await checkoutPage.proceedBtns.btn2.click();
    await checkoutPage.waitForUrl(/.*\/checkout/);
    // Using 'expect' style (keep one for variety)
    expect(await checkoutPage.getCurrentUrl()).to.match(/.*\/checkout/);

    // And I fill in my billing and shipping information
    await checkoutPage.fillShippingInfo({
      street: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      country: 'United States',
      postalCode: '12345',
    });

    // Proceed to checkout step 3 (Payment)
    await checkoutPage.proceedBtns.btn3.click();
    await checkoutPage.waitForUrl(/.*\/checkout/);

    assert.match(await checkoutPage.getCurrentUrl(), /.*\/checkout/, 'Checkout URL should match');

    // And I select a payment method
    // Select Bank Transfer payment method
    await checkoutPage.fillPaymentInfo();
    await checkoutPage.completePayment();

    const isPaymentSuccessVisible = await checkoutPage.isPaymentSuccessVisible();

    (isPaymentSuccessVisible as any).should.be.true;
  });
});
