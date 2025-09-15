import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ProductCardComponent } from '../components/product-card.component';
import { urls } from './index.page';

/**
 * ProductDetailPage - Uses BasePage + Components
 * Handles product detail page functionality using composition
 */
export class ProductDetailPage extends BasePage {
  public readonly header: HeaderComponent;
  public readonly productCard: ProductCardComponent;
  
  public products = {
    Bolt_Cutters: {
      name: 'Bolt Cutters',
      description: 'Aliquam viverra scelerisque tempus. Ut vehicula, ex sed elementum',
      price: '$48.41',
    },
    Thor_Hammer: {
      name: 'Thor Hammer',
      description: 'A powerful hammer for all your needs.',
      price: '$11.14',
    },
    Long_Nose_Pliers: {
      name: 'Long Nose Pliers',
      description: 'Perfect for reaching tight spaces.',
      price: '$14.24',
    },
    Combination_Pliers: {
      name: 'Combination Pliers',
      description: 'Versatile pliers for various tasks.',
      price: '$14.24',
    },
    productRegex: /^https:\/\/practicesoftwaretesting\.com\/product\/.*/
  };

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.productCard = new ProductCardComponent(page);
  }

  async addToCartAndNavigateToCart(): Promise<void> {
    await this.productCard.addToCart();
    await this.header.clickCart();
    await this.waitForUrl(urls.checkout); 
  }

  async verifyProductPage(url: string | RegExp): Promise<boolean> {
    return this.getCurrentUrl().match(url) !== null; 
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