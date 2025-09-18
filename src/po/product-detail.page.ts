import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * ProductDetailPage - Uses BasePage + Components
 * Handles product detail page functionality using composition
 */
export class ProductDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getRelatedProductInfo(productName: string): Promise<{ visible: boolean; text: string; }> {
    const relatedProduct = this.page.getByRole('link', { name: productName });
    await relatedProduct.waitFor({ state: 'visible' });
    return {
      visible: await relatedProduct.isVisible(),
      text: await relatedProduct.textContent() || ''
    };
  }
}