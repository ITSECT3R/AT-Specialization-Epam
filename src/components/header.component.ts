import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

// Type definitions for header navigation
export type NavHeaderButton =
  | 'home'
  | 'categories'
  | 'contact'
  | 'menu'
  | 'language'
  | 'cart'
  | 'cartQuantity';
export type NavMenuButton =
  | 'account'
  | 'favorites'
  | 'profile'
  | 'invoices'
  | 'messages'
  | 'signOut';

/**
 * HeaderComponent - Reusable component for site navigation
 * This handles all header-related functionality across all pages
 */
export class HeaderComponent extends BaseComponent {
  // Header locators
  public readonly navHeaderBtns: Record<NavHeaderButton, Locator>;
  public readonly navMenuBtns: Record<NavMenuButton, Locator>;

  constructor(page: Page) {
    super(page);

    // Initialize locators after page is set
    this.navHeaderBtns = {
      home: this.page.locator('[data-test="nav-home"]'),
      categories: this.page.locator('[data-test="nav-categories"]'),
      contact: this.page.locator('[data-test="nav-contact"]'),
      menu: this.page.locator('[data-test="nav-menu"]'),
      language: this.page.locator('[data-test="language-select"]'),
      cart: this.page.locator('[data-test="nav-cart"]'),
      cartQuantity: this.page.locator('[data-test="cart-quantity"]'),
    };

    this.navMenuBtns = {
      account: this.page.locator('[data-test="nav-my-account"]'),
      favorites: this.page.locator('[data-test="nav-my-favorites"]'),
      profile: this.page.locator('[data-test="nav-my-profile"]'),
      invoices: this.page.locator('[data-test="nav-my-invoices"]'),
      messages: this.page.locator('[data-test="nav-my-messages"]'),
      signOut: this.page.locator('[data-test="nav-sign-out"]'),
    };
  }

  async navMenuTo(btn: NavMenuButton): Promise<void> {
    await this.navHeaderBtns.menu.click();
    await this.navMenuBtns[btn].click();
    await this.page.waitForLoadState('load');
  }

  async clickHeaderButton(btn: NavHeaderButton): Promise<void> {
    await this.navHeaderBtns[btn].click();
  }

  async getCartQuantity(): Promise<string> {
    return (await this.navHeaderBtns.cartQuantity.textContent()) || '';
  }
}
