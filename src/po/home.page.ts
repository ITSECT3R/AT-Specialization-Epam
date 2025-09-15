import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HeaderComponent } from '../components/header.component';
import { ProductCardComponent } from '../components/product-card.component';
import { urls } from './index.page';
import { FiltersAndSearchComponent } from '../components/filters&search.component';
import { StoreComponent } from '../components/store.component';

export class HomePage extends BasePage {
  public readonly header: HeaderComponent;
  public readonly productCard: ProductCardComponent;
  public readonly filters: FiltersAndSearchComponent;
  public readonly store: StoreComponent;
  
  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.productCard = new ProductCardComponent(page);
    this.filters = new FiltersAndSearchComponent(page);
    this.store = new StoreComponent(page);
  }

  async selectProduct(productText: string, productUrl: string | RegExp): Promise<void> {
    await this.productCard.clickProductByText(productText);
    await this.waitForUrl(productUrl);
  }

  async verifyHomePage(): Promise<boolean> {
    return this.getCurrentUrl() === urls.home; 
  }
}

