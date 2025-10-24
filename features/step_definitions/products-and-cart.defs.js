import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, assert } from 'chai';

setDefaultTimeout(60 * 1000);

// Test data storage
let homePage, productDetailPage, checkoutPage;
let productName, productUrl;

When('I click on the Bolt Cutters product from the product list', async function () {
  const { pages, products } = await this.loadModules();

  // Always get a fresh homePage reference for each scenario
  homePage = pages(this.page).homePage;

  // When I click on the Bolt Cutters from the product list
  await homePage.store.selectProduct(products.Bolt_Cutters.name, products.productRegex);
});

Then('I should be on the product details page', async function () {
  const { pages, products } = await this.loadModules();

  productDetailPage = pages(this.page).productDetailPage;

  // And I view the product details page
  const currentUrl = await productDetailPage.getCurrentUrl();
  expect(currentUrl).to.match(products.productRegex);
});

Then('I should see the product name {string}', async function (expectedProductName) {
  productName = await productDetailPage.productCard.getProductName();
  expect(productName).to.include(expectedProductName);
});

Then('I should see the product image is visible', async function () {
  const { products } = await this.loadModules();

  // And I check the product specifications and images
  const isImageVisible = await productDetailPage.productCard.isProductImageVisible(
    products.Bolt_Cutters.name
  );
  assert.isTrue(isImageVisible, 'Product image should be visible');
});

Then('I should see the product description is visible', async function () {
  const isDescriptionVisible = await productDetailPage.productCard.isDescriptionVisible();
  expect(isDescriptionVisible).to.be.true;
});

Then('I should see the product price {string}', async function (expectedPrice) {
  // Then I should see "$48.41" as product's price
  const priceText = await productDetailPage.productCard.getPriceText();
  expect(priceText).to.include(expectedPrice);
});

Then('I should see the product description contains expected text', async function () {
  const { products } = await this.loadModules();

  // And I should see "Aliquam viverra scelerisque tempus..." as description
  const descriptionText = await productDetailPage.productCard.getProductDescription();
  expect(descriptionText).to.include(products.Bolt_Cutters.description);
});

Then('I should see related products including {string}', async function (relatedProductName) {
  const { products } = await this.loadModules();

  // And I should see Related Products including "combination pilers, pilers, etc."
  const relatedProductInfo = await productDetailPage.getRelatedProductInfo(
    products.Combination_Pliers.name
  );
  expect(relatedProductInfo.visible).to.be.true;
  expect(relatedProductInfo.text).to.match(products.Combination_Pliers.related);
});

// Thor Hammer Cart Scenario Steps
When('I click on the Thor Hammer product', async function () {
  const { pages, products } = await this.loadModules();

  homePage = pages(this.page).homePage;

  await homePage.clickByText(/Thor Hammer.*\$11\.14/);
  await homePage.waitForUrl(products.productRegex);
});

Then('I should be on the Thor Hammer product details page', async function () {
  const { pages, products } = await this.loadModules();

  productDetailPage = pages(this.page).productDetailPage;

  const currentUrl = await homePage.getCurrentUrl();
  assert.match(currentUrl, products.productRegex, 'Should be on product page');

  // Wait for product page to load and get product name
  productName = await productDetailPage.productCard.getProductName();
  assert.include(productName, products.Thor_Hammer.name, 'Product name should include Thor Hammer');
});

Then('I should see the default quantity is {string}', async function (expectedQuantity) {
  // When I select the desired quantity to "1" for the product
  const quantityValue = await productDetailPage.productCard.getQuantity();
  assert.equal(quantityValue, expectedQuantity, `Quantity should be ${expectedQuantity}`);
});

When('I click the {string} button', async function (buttonText) {
  if (buttonText === 'Add to Cart') {
    // And I click the "Add to Cart" button
    await productDetailPage.productCard.addToCart();
  } else if (buttonText === 'Add to Favorites') {
    // When I click the "Add to Favorites" or star icon
    await productDetailPage.productCard.addToFavorites();
  }
});

Then('I should see the cart quantity updated to {string}', async function (expectedQuantity) {
  // Wait for cart to update - look for cart quantity or success message first
  await productDetailPage.header.navHeaderBtns.cartQuantity.waitFor({
    state: 'visible',
    timeout: 15000,
  });

  // Verify item was added (optional step)
  const cartQuantityText = await productDetailPage.header.getCartQuantity();
  expect(cartQuantityText).to.include(expectedQuantity);
});

When('I navigate to the shopping cart page', async function () {
  // And I navigate to the shopping cart page
  await productDetailPage.header.clickHeaderButton('cart');
});

Then('I should be on the checkout page', async function () {
  const { pages, urls } = await this.loadModules();

  checkoutPage = pages(this.page).checkoutPage;
  await checkoutPage.waitForUrl(urls.checkout);

  const checkoutUrl = await checkoutPage.getCurrentUrl();
  assert.equal(checkoutUrl, urls.checkout, 'Should be on checkout page');
});

Then('I should see the Thor Hammer product in my cart', async function () {
  const { products } = await this.loadModules();

  // Then I should see the Thor Hammer product in my cart with correct quantity of "1" and price "$11.14"
  const thorHammerCell = await checkoutPage.findCellByText('cell', products.Thor_Hammer.name);
  const thorHammerText = await thorHammerCell.textContent();
  expect(thorHammerText).to.include(products.Thor_Hammer.name);
});

Then(
  'I should see the correct quantity {string} and price {string}',
  async function (expectedQuantity, expectedPrice) {
    const cartQuantity = await productDetailPage.header.getCartQuantity();
    assert.include(cartQuantity, expectedQuantity, `Cart quantity should be ${expectedQuantity}`);

    const cartTotal = await productDetailPage.productCard.cartTotal.textContent();
    expect(cartTotal).to.include(expectedPrice);
  }
);

// Favorites Scenario Steps
When('I navigate to the Long Nose Pliers product details page', async function () {
  const { pages, urls, products } = await this.loadModules();

  homePage = pages(this.page).homePage;
  productDetailPage = pages(this.page).productDetailPage;

  // Navigate to Long Nose Pilers product
  await homePage.navigateTo(urls.home);
  const pilersCell = await homePage.findCellByText('link', /Long Nose Pliers.*/);
  await pilersCell.click();

  productUrl = await homePage.getCurrentUrl();
  assert.match(productUrl, products.productRegex, 'Should be on product page');
});

Then(
  'I should see a confirmation message that the product was added to favorites',
  async function () {
    // Then I should see visual feedback that the product was added to favorites
    // Since we're logged in, it should successfully add to favorites
    const messageText = await productDetailPage.getFavoritesMessage();
    assert.include(
      messageText,
      'Product added to your favorites list.',
      'Should show favorites message'
    );
  }
);
