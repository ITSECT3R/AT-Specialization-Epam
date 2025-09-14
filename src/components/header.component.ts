import { Page } from '@playwright/test';

/**
 * HeaderComponent - Reusable component for site navigation
 * This handles all header-related functionality across all pages
 */
export class HeaderComponent {
  private page: Page;
  
  // Header selectors
  private readonly navMenu = '[data-test="nav-menu"]';
  private readonly navCart = '[data-test="nav-cart"]';
  private readonly cartQuantity = '[data-test="cart-quantity"]';
  private readonly navMyProfile = '[data-test="nav-my-profile"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickNavMenu(): Promise<void> {
    await this.page.click(this.navMenu);
  }

  async clickCart(): Promise<void> {
    await this.page.waitForSelector(this.navCart, { state: 'visible' });
    await this.page.click(this.navCart);
  }

  async getCartQuantity(): Promise<string> {
    return await this.page.locator(this.cartQuantity).textContent() || '';
  }

  async getNavMenuText(): Promise<string> {
    await this.page.locator(this.navMenu).waitFor({ state: 'visible' });
    return await this.page.locator(this.navMenu).textContent() || '';
  }

  async navigateToProfile(): Promise<void> {
    await this.clickNavMenu();
    await this.page.click(this.navMyProfile);
  }
}