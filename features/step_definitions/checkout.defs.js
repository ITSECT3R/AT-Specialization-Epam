import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, assert } from 'chai';
import * as chai from 'chai';
chai.should();

setDefaultTimeout(60 * 1000);

let checkoutPage, productDetailPage, homePage;

When('I navigate to the {string} product page', async function (productName) {
  const { pages, urls, products } = await this.loadModules();

  // Get fresh page references
  const pageRefs = pages(this.page);
  homePage = pageRefs.homePage;
  productDetailPage = pageRefs.productDetailPage;
  checkoutPage = pageRefs.checkoutPage;

  // Navigate to Combination Pliers product
  await homePage.navigateTo(urls.home);
  await homePage.clickByText(productName);
  await homePage.waitForUrl(products.productRegex);
});

Then('I should see the product details page', async function () {
  const { products } = await this.loadModules();

  const productUrl = await homePage.getCurrentUrl();
  assert.match(productUrl, products.productRegex, 'Product URL should match');
});

Then('the product name should include {string}', async function (expectedProductName) {
  const { products } = await this.loadModules();

  const productName = await productDetailPage.productCard.getProductName();
  productName.should.include(products.Combination_Pliers.name);

  // Verify the expected product name is also included (use the parameter)
  productName.should.include(expectedProductName);
});

When('I add the product to my cart', async function () {
  // Add Pliers to cart
  await productDetailPage.productCard.addToCart();
  await productDetailPage.header.navHeaderBtns.cart.waitFor({ state: 'visible' });
});

Then('I should see the cart has been updated', async function () {
  // Verify item was added to cart (generic check without specific quantity)
  const cartQuantityText = await productDetailPage.header.getCartQuantity();
  expect(cartQuantityText).to.include('1');
});

When('I proceed to the checkout page', async function () {
  // When I proceed to checkout
  await productDetailPage.header.clickHeaderButton('cart');
  await checkoutPage.waitForUrl(/.*\/checkout/);
});

Then('I should be on the checkout overview page', async function () {
  assert.match(await checkoutPage.getCurrentUrl(), /.*\/checkout/, 'Checkout URL should match');
});

Then('I should see {string} in my cart', async function (productName) {
  // Verify the specific product is in cart (using the productName parameter)
  const productCell = await checkoutPage.findCellByText('cell', productName);
  await productCell.waitFor({ state: 'visible' });
  const isProductVisible = await productCell.isVisible();
  isProductVisible.should.be.true;
});

When('I proceed through checkout step 1', async function () {
  // Proceed to checkout step 1 (Sign in - already done)
  await checkoutPage.proceedBtns.btn1.click();
});

When('I proceed through checkout step 2', async function () {
  // Proceed to checkout step 2 (Address)
  await checkoutPage.proceedBtns.btn2.click();
  await checkoutPage.waitForUrl(/.*\/checkout/);
  expect(await checkoutPage.getCurrentUrl()).to.match(/.*\/checkout/);
});

When('I fill in my shipping information:', async function (dataTable) {
  // Extract shipping information from the data table using World utility
  const shippingInfo = this.parseShippingDataTable(dataTable);

  // And I fill in my billing and shipping information
  await checkoutPage.fillShippingInfo({
    street: shippingInfo.street,
    city: shippingInfo.city,
    state: shippingInfo.state,
    country: shippingInfo.country,
    postalCode: shippingInfo.postalCode,
  });
});

When('I proceed through checkout step 3', async function () {
  // Proceed to checkout step 3 (Payment)
  await checkoutPage.proceedBtns.btn3.click();
  await checkoutPage.waitForUrl(/.*\/checkout/);
  assert.match(await checkoutPage.getCurrentUrl(), /.*\/checkout/, 'Checkout URL should match');
});

When('I complete the payment process', async function () {
  // And I select a payment method
  // Select Bank Transfer payment method
  await checkoutPage.fillPaymentInfo();
  await checkoutPage.completePayment();
});

Then('I should see the payment success confirmation', async function () {
  const isPaymentSuccessVisible = await checkoutPage.isPaymentSuccessVisible();
  isPaymentSuccessVisible.should.be.true;
});
