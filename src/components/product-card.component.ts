import { Page } from '@playwright/test';

/**
 * ProductCardComponent - Reusable component for product interactions
 * Handles product listing and product detail page functionality
 */
export class ProductCardComponent {
  private page: Page;
  
  // Product selectors
  private readonly productName = '[data-test="product-name"]';
  private readonly productDescription = '[data-test="product-description"]';
  private readonly addToCartButton = '[data-test="add-to-cart"]';
  private readonly addToFavoritesButton = '[data-test="add-to-favorites"]';
  public quantity = '[data-test="quantity"]';
  public cartQuantity = '[data-test="cart-quantity"]';
  public navCart = '[data-test="nav-cart"]';
  public cartTotal = '[data-test="cart-total"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickProductByText(productText: string): Promise<void> {
    await this.page.click(`text=${productText}`);
  }

  async getProductName(): Promise<string> {
    await this.page.locator(this.productName).waitFor({ state: 'visible', timeout: 15000 });
    return await this.page.locator(this.productName).textContent() || '';
  }

  async getProductDescription(): Promise<string> {
    return await this.page.locator(this.productDescription).textContent() || '';
  }

  async addToCart(): Promise<void> {
    await this.page.click(this.addToCartButton);
  }

  async addToFavorites(): Promise<void> {
    await this.page.click(this.addToFavoritesButton);
  }

  async getQuantity(): Promise<string> {
    return await this.page.locator(this.quantity).inputValue();
  }

  async isProductImageVisible(imageName: string): Promise<boolean> {
    const productImage = this.page.getByRole('img', { name: imageName });
    await productImage.waitFor({ state: 'visible' });
    return await productImage.isVisible();
  }

  async isDescriptionVisible(): Promise<boolean> {
    await this.page.locator(this.productDescription).waitFor({ state: 'visible' });
    return await this.page.locator(this.productDescription).isVisible();
  }

  async getPriceText(): Promise<string> {
    const priceElement = this.page.getByText('$');
    return await priceElement.textContent() || '';
  }
}