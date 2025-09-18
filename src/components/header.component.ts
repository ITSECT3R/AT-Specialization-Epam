import { Page } from '@playwright/test';

// Type definitions for header navigation
export type NavHeaderButton = 'home' | 'categories' | 'contact' | 'menu' | 'language' | 'cart' | 'cartQuantity';
export type NavMenuButton = 'account' | 'favorites' | 'profile' | 'invoices' | 'messages' | 'signOut';

/**
 * HeaderComponent - Reusable component for site navigation
 * This handles all header-related functionality across all pages
 */
export class HeaderComponent {
  private page: Page;
  
  // Header selectors
  public readonly navHeaderBtns: Record<NavHeaderButton, string> = {
    home: '[data-test="nav-home"]',
    categories: '[data-test="nav-categories"]',
    contact: '[data-test="nav-contact"]',
    menu: '[data-test="nav-menu"]',
    language: '[data-test="language-select"]',
    cart: '[data-test="nav-cart"]',
    cartQuantity: '[data-test="cart-quantity"]'
  }

  public readonly navMenuBtns: Record<NavMenuButton, string> = {
    account: '[data-test="nav-my-account"]',
    favorites: '[data-test="nav-my-favorites"]',
    profile: '[data-test="nav-my-profile"]',
    invoices: '[data-test="nav-my-invoices"]',
    messages: '[data-test="nav-my-messages"]',
    signOut: '[data-test="nav-sign-out"]'
  }

  constructor(page: Page) {
    this.page = page;
  }

  async navMenuTo(btn: NavMenuButton): Promise<void> {
    await this.page.click(this.navHeaderBtns.menu);
    await this.page.click(this.navMenuBtns[btn]);
    await this.page.waitForLoadState('load');
  }

  async clickHeaderButton(btn: NavHeaderButton): Promise<void> {
    await this.page.click(this.navHeaderBtns[btn]);
  }

  async getCartQuantity(): Promise<string> {
    return await this.page.locator(this.navHeaderBtns.cartQuantity).textContent() || '';
  }
}