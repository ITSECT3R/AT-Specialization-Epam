import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ProductCardComponent } from '../components/product-card.component';

/**
 * ProductDetailPage - Uses BasePage + Components
 * Handles product detail page functionality using composition
 */
export class ProductDetailPage extends BasePage {
  public readonly header: HeaderComponent;
  public readonly productCard: ProductCardComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.productCard = new ProductCardComponent(page);
  }

  async addToCartAndNavigateToCart(): Promise<void> {
    await this.productCard.addToCart();
    await this.header.clickCart();
    await this.waitForUrl(/.*\/checkout/); // Reusing BasePage method!
  }

  async verifyProductPage(): Promise<boolean> {
    return this.getCurrentUrl().match(/.*\/product\/.*/) !== null; // Reusing BasePage method!
  }

  async getFavoritesMessage(): Promise<string> {
    const favoritesMessage = this.page.locator('div').filter({ hasText: 'Product added to your' }).nth(2);
    await favoritesMessage.waitFor({ state: 'visible' });
    return await favoritesMessage.textContent() || '';
  }

  async getRelatedProductInfo(productName: string): Promise<{ visible: boolean; text: string; }> {
    const relatedProduct = this.page.getByRole('link', { name: productName });
    await relatedProduct.waitFor({ state: 'visible' });
    return {
      visible: await relatedProduct.isVisible(),
      text: await relatedProduct.textContent() || ''
    };
  }

  async getCartItemText(itemName: string): Promise<string> {
    const cartItem = this.page.getByRole('cell', { name: itemName, exact: true });
    return await cartItem.textContent() || '';
  }
}