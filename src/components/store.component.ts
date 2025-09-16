import { Page } from "@playwright/test";

export class StoreComponent {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async isVisibleProduct(productName: string): Promise<boolean> {
    const product = this.page.locator(`h5:has-text("${productName}")`);
    await product.waitFor({ state: 'visible', timeout: 15000 });
    const isVisible = await product.isVisible();
    return isVisible;
  }
}