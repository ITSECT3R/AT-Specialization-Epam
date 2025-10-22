import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * ProductCardComponent - Reusable component for product interactions
 * Handles product listing and product detail page functionality
 */
export class ProductCardComponent extends BaseComponent {
  // Public locators - direct access for tests
  public readonly productName: Locator;
  public readonly productDescription: Locator;
  public readonly addToCartButton: Locator;
  public readonly addToFavoritesButton: Locator;
  public readonly quantity: Locator;
  public readonly cartTotal: Locator;
  public readonly cartQuantity: Locator;
  public readonly navCart: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators after page is set
    this.productName = this.page.locator('[data-test="product-name"]');
    this.productDescription = this.page.locator('[data-test="product-description"]');
    this.addToCartButton = this.page.locator('[data-test="add-to-cart"]');
    this.addToFavoritesButton = this.page.locator('[data-test="add-to-favorites"]');
    this.quantity = this.page.locator('[data-test="quantity"]');
    this.cartTotal = this.page.locator('[data-test="cart-total"]');
    this.cartQuantity = this.page.locator('[data-test="cart-quantity"]');
    this.navCart = this.page.locator('[data-test="nav-cart"]');
  }

  // High-level methods using the locators
  async getProductName(): Promise<string> {
    await this.productName.waitFor({ state: 'visible', timeout: 15000 });
    return (await this.productName.textContent()) || '';
  }

  async getProductDescription(): Promise<string> {
    return (await this.productDescription.textContent()) || '';
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async addToFavorites(): Promise<void> {
    await this.addToFavoritesButton.click();
  }

  async getQuantity(): Promise<string> {
    return await this.quantity.inputValue();
  }

  async isProductImageVisible(imageName: string): Promise<boolean> {
    const productImage = this.page.getByRole('img', { name: imageName });
    await productImage.waitFor({ state: 'visible' });
    return await productImage.isVisible();
  }

  async isDescriptionVisible(): Promise<boolean> {
    await this.productDescription.waitFor({ state: 'visible' });
    return await this.productDescription.isVisible();
  }

  async getPriceText(): Promise<string> {
    const priceElement = this.page.getByText('$');
    return (await priceElement.textContent()) || '';
  }
}
