import { Page } from '@playwright/test';
import { HeaderComponent, ProductCardComponent, SearchComponent, StoreComponent } from '../components/index.components';

export class BasePage {
  protected page: Page;
  
  // Private component instances for lazy initialization
  private _header?: HeaderComponent;
  private _productCard?: ProductCardComponent;
  private _search?: SearchComponent;
  private _store?: StoreComponent;

  constructor(page: Page) {
    this.page = page;
  }

  // Lazy component getters - available to all page objects
  get header(): HeaderComponent {
    if (!this._header) {
      this._header = new HeaderComponent(this.page);
    }
    return this._header;
  }

  get productCard(): ProductCardComponent {
    if (!this._productCard) {
      this._productCard = new ProductCardComponent(this.page);
    }
    return this._productCard;
  }

  get search(): SearchComponent {
    if (!this._search) {
      this._search = new SearchComponent(this.page);
    }
    return this._search;
  }

  get store(): StoreComponent {
    if (!this._store) {
      this._store = new StoreComponent(this.page);
    }
    return this._store;
  }

  // Base page methods
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getInputValue(selector: string): Promise<string> {
    return await this.page.locator(selector).inputValue();
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForLoad();
  }
}

