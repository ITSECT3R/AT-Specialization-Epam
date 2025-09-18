import { Page } from "@playwright/test";

export class StoreComponent {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectProduct(productText: string, productUrl: string | RegExp): Promise<void> {
    await this.page.click(`text=${productText}`);
    await this.page.waitForURL(productUrl);
  }

  async isVisibleProduct(productName: string): Promise<boolean> {
    const product = this.page.locator(`h5:has-text("${productName}")`);
    await product.waitFor({ state: 'visible', timeout: 15000 });
    const isVisible = await product.isVisible();
    return isVisible;
  }
}