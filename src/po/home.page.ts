import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ProductCardComponent } from '../components/product-card.component';
import { SearchComponent } from '../components/search.component';
import { StoreComponent } from '../components/store.component';
import { urls } from '../data/index.data';

export class HomePage extends BasePage {
  public readonly header: HeaderComponent;
  public readonly productCard: ProductCardComponent;
  public readonly filters: SearchComponent;
  public readonly store: StoreComponent;
  
  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.productCard = new ProductCardComponent(page);
    this.filters = new SearchComponent(page);
    this.store = new StoreComponent(page);
  }

  async selectProduct(productText: string, productUrl: string | RegExp): Promise<void> {
    await this.productCard.clickProductByText(productText);
    await this.page.waitForURL(productUrl);
  }

  async verifyHomePage(): Promise<boolean> {
    return await this.getCurrentUrl() === urls.home; 
  }
}

