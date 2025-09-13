import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { loginUser } from '../utils/login';

test.describe('Products Shop & Cart Testing', () => {
  
  test('View detailed product information', async ({ page }) => {
        // Given I am on the Practice Software Testing homepage
    await page.goto('/');
    await page.waitForLoadState('load');
  
  assert.equal(page.url(), 'https://practicesoftwaretesting.com/', 'Should be on homepage');

    // When I click on the Bolt Cutters from the product list
    await page.click('text=Bolt Cutters');
    
    // And I view the product details page
    await page.waitForURL(/.*\/product\/.*/);
    expect(page.url()).to.match(/.*\/product\/.*/);

    const productName = await page.locator('[data-test="product-name"]').textContent();
  
  (productName as any).should.include('Bolt Cutters');
    
    // And I check the product specifications and images
    const productImage = page.getByRole('img', { name: 'Bolt Cutters' });
    await productImage.waitFor({ state: 'visible' });
    const isImageVisible = await productImage.isVisible();
  
  assert.isTrue(isImageVisible, 'Product image should be visible');
    
    const productDescription = page.locator('[data-test="product-description"]');
    await productDescription.waitFor({ state: 'visible' });
    const isDescriptionVisible = await productDescription.isVisible();
  
  (isDescriptionVisible as any).should.be.true;
    
    // Then I should see "$48.41" as product's price
    const priceElement = page.getByText('$');
    const priceText = await priceElement.textContent();
    expect(priceText).to.include('$48.41');

    // And I should see "Aliquam viverra scelerisque tempus..." as description
    const descriptionText = await page.locator('[data-test="product-description"]').textContent();
    expect(descriptionText).to.include('Aliquam viverra scelerisque tempus. Ut vehicula, ex sed elementum');
    
    // And I should see Related Products including "combination pilers, pilers, etc."
    const combinationPliersLink = page.getByRole('link', { name: 'Combination Pliers' });
    await combinationPliersLink.waitFor({ state: 'visible' });
    const isLinkVisible = await combinationPliersLink.isVisible();
    expect(isLinkVisible).to.be.true;
    
    const linkText = await combinationPliersLink.textContent();
    expect(linkText).to.match(/Combination Pliers More information/i);
  });

  test('Add Thor Hammer to shopping cart', async ({ page }) => {
    // Given I am viewing the Thor Hammer details page
    await page.goto('/');
    await page.click('text=Thor Hammer $11.14');
    await page.waitForURL(/.*\/product\/.*/);
  
  assert.match(page.url(), /.*\/product\/.*/, 'Should be on product page');

    const productName = await page.locator('[data-test="product-name"]').textContent();
  
  (productName as any).should.include('Thor Hammer');
    
    // When I select the desired quantity to "1" for the product
    const quantityValue = await page.locator('[data-test="quantity"]').inputValue();
  
  assert.equal(quantityValue, '1', 'Quantity should be 1');

    // And I click the "Add to Cart" button
    await page.click('[data-test="add-to-cart"]');

    // Wait for the cart quantity to be visible
    await page.waitForSelector('[data-test="nav-cart"]', { state: 'visible' });

    // Verify item was added (optional step)
    const cartQuantityText = await page.locator('[data-test="cart-quantity"]').textContent();
  
  (cartQuantityText as any).should.include('1');
    
    // And I navigate to the shopping cart page
    await page.waitForSelector('[data-test="nav-cart"]', { state: 'visible' });
    await page.click('[data-test="nav-cart"]');
    await page.waitForURL(/.*\/checkout/);
    const checkoutUrl = page.url();
  
  assert.match(checkoutUrl, /.*\/checkout/, 'Should be on checkout page');
    
    // Then I should see the Thor Hammer product in my cart with correct quantity of "1" and price "$11.14"
    const thorHammerCell = page.getByRole('cell', { name: 'Thor Hammer', exact: true });
    const thorHammerText = await thorHammerCell.textContent();
  
  (thorHammerText as any).should.include('Thor Hammer');
    
    const cartQuantity = await page.locator('[data-test="cart-quantity"]').textContent();
  
  assert.include(cartQuantity, '1', 'Cart quantity should be 1');
    
    const cartTotal = await page.locator('[data-test="cart-total"]').textContent();
  
  (cartTotal as any).should.include('$11.14');
  });

  test('Add product to favorites list', async ({ page }) => {
    // Given I am logged in and viewing the Long Nose Pilers product details page
    await loginUser(page);
    
    // Navigate to Long Nose Pilers product
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.getByRole('link', { name: 'Long Nose Pliers Long Nose Pliers Out of stock $14.24' }).click();
    await page.waitForURL(/.*\/product\/.*/);
    const productUrl = page.url();
  
  assert.match(productUrl, /.*\/product\/.*/, 'Should be on product page');
    
    const productName = await page.locator('[data-test="product-name"]').textContent();
  
  (productName as any).should.include('Long Nose Pliers');
    
    // When I click the "Add to Favorites" or star icon
    await page.click('[data-test="add-to-favorites"]');
    
    // Then I should see visual feedback that the product was added to favorites
    // Since we're logged in, it should successfully add to favorites
    const favoritesMessage = page.locator('div').filter({ hasText: 'Product added to your' }).nth(2);
    await favoritesMessage.waitFor({ state: 'visible' });
    const messageText = await favoritesMessage.textContent();
  
  assert.include(messageText, "Product added to your favorites list.", 'Should show favorites message');
  });
});
