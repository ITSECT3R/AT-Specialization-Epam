import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ProductCardComponent } from '../components/product-card.component';
import { urls } from '.';

/**
 * HomePage - Uses BasePage + Components
 * Demonstrates how to compose page objects using reusable components
 */
export class HomePage extends BasePage {
  public readonly header: HeaderComponent;
  public readonly productCard: ProductCardComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.productCard = new ProductCardComponent(page);
  }

  async selectProduct(productText: string, productUrl: string | RegExp): Promise<void> {
    await this.productCard.clickProductByText(productText);
    await this.waitForUrl(productUrl);
  }

  async verifyHomePage(): Promise<boolean> {
    return this.getCurrentUrl() === urls.home; 
  }
}