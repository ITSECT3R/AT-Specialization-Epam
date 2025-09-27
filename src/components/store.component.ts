import { Page } from "@playwright/test";
import { BaseComponent } from "./base.component";

export class StoreComponent extends BaseComponent {
  constructor(page: Page) {
    super(page);
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