import { Page } from '@playwright/test';

// Type definitions for header navigation
export type NavHeaderButton = 'home' | 'categories' | 'contact' | 'navMenu' | 'language' | 'navCart' | 'cartQuantity';
export type NavMenuButton = 'account' | 'favorites' | 'profile' | 'invoices' | 'messages' | 'signOut';

/**
 * HeaderComponent - Reusable component for site navigation
 * This handles all header-related functionality across all pages
 */
export class HeaderComponent {
  private page: Page;
  
  // Header selectors
  private readonly navHeaderBtns: Record<NavHeaderButton, string> = {
    home: '[data-test="nav-home"]',
    categories: '[data-test="nav-categories"]',
    contact: '[data-test="nav-contact"]',
    navMenu: '[data-test="nav-menu"]',
    language: '[data-test="language-select"]',
    navCart: '[data-test="nav-cart"]',
    cartQuantity: '[data-test="cart-quantity"]'
  }

  private readonly navMenuBtns: Record<NavMenuButton, string> = {
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

  async clickNavMenu(btn: NavMenuButton): Promise<void> {
    await this.page.click(this.navMenuBtns[btn]);
  }

  async clickHeaderButton(btn: NavHeaderButton): Promise<void> {
    await this.page.click(this.navHeaderBtns[btn]);
  }

  async openNavMenu(): Promise<void> {
    await this.page.click(this.navHeaderBtns.navMenu);
  }

  async clickCart(): Promise<void> {
    await this.page.waitForSelector(this.navHeaderBtns.navCart, { state: 'visible' });
    await this.page.click(this.navHeaderBtns.navCart);
  }

  async getCartQuantity(): Promise<string> {
    return await this.page.locator(this.navHeaderBtns.cartQuantity).textContent() || '';
  }

  async getNavMenuText(): Promise<string> {
    await this.page.locator(this.navHeaderBtns.navMenu).waitFor({ state: 'visible' });
    return await this.page.locator(this.navHeaderBtns.navMenu).textContent() || '';
  }

  async navigateToProfile(): Promise<void> {
    await this.openNavMenu();
    await this.clickNavMenu('profile');
  }
}