import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from '../utils/index.utils';
import { pages } from '../po/index.page';
import { urls, products } from '../data/index.data';

test.describe('Products Shop & Cart Testing', () => {
  test('View detailed product information', async ({ page }) => {
    const { homePage, productDetailPage } = pages(page);

    await homePage.navigateTo(urls.home);

    assert.equal(await homePage.getCurrentUrl(), urls.home, 'Should be on homepage');

    // When I click on the Bolt Cutters from the product list
    await homePage.store.selectProduct(products.Bolt_Cutters.name, products.productRegex);

    // And I view the product details page
    expect(await productDetailPage.getCurrentUrl()).to.match(await products.productRegex);

    const productName = await productDetailPage.productCard.getProductName();
    (productName as any).should.include(products.Bolt_Cutters.name);

    // And I check the product specifications and images
    const isImageVisible = await productDetailPage.productCard.isProductImageVisible(
      products.Bolt_Cutters.name
    );
    assert.isTrue(isImageVisible, 'Product image should be visible');

    const isDescriptionVisible = await productDetailPage.productCard.isDescriptionVisible();
    (isDescriptionVisible as any).should.be.true;

    // Then I should see "$48.41" as product's price
    const priceText = await productDetailPage.productCard.getPriceText();
    expect(priceText).to.include(products.Bolt_Cutters.price);

    // And I should see "Aliquam viverra scelerisque tempus..." as description
    const descriptionText = await productDetailPage.productCard.getProductDescription();
    expect(descriptionText).to.include(products.Bolt_Cutters.description);

    // And I should see Related Products including "combination pilers, pilers, etc."
    const relatedProductInfo = await productDetailPage.getRelatedProductInfo(
      products.Combination_Pliers.name
    );
    expect(relatedProductInfo.visible).to.be.true;
    expect(relatedProductInfo.text).to.match(products.Combination_Pliers.related);
  });

  test('Add Thor Hammer to shopping cart', async ({ page }) => {
    // Given I am viewing the Thor Hammer details page
    const { homePage, productDetailPage, checkoutPage } = pages(page);

    await homePage.navigateTo(urls.home);
    await homePage.clickByText(/Thor Hammer.*\$11\.14/);
    await homePage.waitForUrl(products.productRegex);

    assert.match(
      await homePage.getCurrentUrl(),
      products.productRegex,
      'Should be on product page'
    );

    // Wait for product page to load and get product name
    const productName = await productDetailPage.productCard.getProductName();
    assert.include(
      productName,
      products.Thor_Hammer.name,
      'Product name should include Thor Hammer'
    );

    // When I select the desired quantity to "1" for the product
    const quantityValue = await productDetailPage.productCard.getQuantity();

    assert.equal(quantityValue, '1', 'Quantity should be 1');

    // And I click the "Add to Cart" button
    await productDetailPage.productCard.addToCart();

    // Wait for cart to update - look for cart quantity or success message first
    await productDetailPage.header.navHeaderBtns.cartQuantity.waitFor({
      state: 'visible',
      timeout: 15000,
    });

    // Verify item was added (optional step)
    const cartQuantityText = await productDetailPage.header.getCartQuantity();

    (cartQuantityText as any).should.include('1');

    // And I navigate to the shopping cart page
    await productDetailPage.header.clickHeaderButton('cart');
    await checkoutPage.waitForUrl(urls.checkout);
    const checkoutUrl = await checkoutPage.getCurrentUrl();

    assert.equal(checkoutUrl, urls.checkout, 'Should be on checkout page');

    // Then I should see the Thor Hammer product in my cart with correct quantity of "1" and price "$11.14"
    const thorHammerCell = await checkoutPage.findCellByText('cell', products.Thor_Hammer.name);
    const thorHammerText = await thorHammerCell.textContent();

    (thorHammerText as any).should.include(products.Thor_Hammer.name);

    const cartQuantity = await productDetailPage.header.getCartQuantity();

    assert.include(cartQuantity, '1', 'Cart quantity should be 1');

    const cartTotal = await productDetailPage.productCard.cartTotal.textContent();

    (cartTotal as any).should.include('$11.14');
  });

  test('Add product to favorites list', async ({ page }) => {
    const { homePage, productDetailPage } = pages(page);
    // Given I am logged in and viewing the Long Nose Pilers product details page
    await loginUser(page);

    // Navigate to Long Nose Pilers product
    await homePage.navigateTo(urls.home);
    const pilersCell = await homePage.findCellByText('link', /Long Nose Pliers.*Out of stock/);
    await pilersCell.click();
    const productUrl = await homePage.getCurrentUrl();

    assert.match(productUrl, products.productRegex, 'Should be on product page');

    const productName = await productDetailPage.productCard.getProductName();

    (productName as any).should.include('Long Nose Pliers');

    // When I click the "Add to Favorites" or star icon
    await productDetailPage.productCard.addToFavorites();

    // Then I should see visual feedback that the product was added to favorites
    // Since we're logged in, it should successfully add to favorites
    const messageText = await productDetailPage.getFavoritesMessage();

    assert.include(
      messageText,
      'Product added to your favorites list.',
      'Should show favorites message'
    );
  });
});
