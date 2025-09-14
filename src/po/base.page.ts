import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForUrl(url: string): Promise<void> {
    await this.page.waitForURL(url);
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  // New reusable methods needed for profile (and potentially other pages)
  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fillInput(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async getInputValue(selector: string): Promise<string> {
    return await this.page.locator(selector).inputValue();
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
  }

}

