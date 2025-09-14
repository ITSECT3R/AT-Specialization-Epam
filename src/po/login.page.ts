import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { urls } from './index.page';

export class LoginPage extends BasePage {
  private readonly navMenu = '[data-test="nav-menu"]';

  constructor(page: Page) {
    super(page);
  }

  async getNavMenuText(): Promise<string> {
    const navMenu = this.page.locator(this.navMenu);
    await navMenu.waitFor({ state: 'visible' });
    return await navMenu.textContent() || '';
  }

  async verifyAccountUrl(): Promise<boolean> {
    return this.getCurrentUrl().match(urls().account) !== null;
  }

  enterLogin(): { emailInput: string; passwordInput: string; submitBtn: string } {
    return {
      emailInput: '[data-test="email"]',
      passwordInput: '[data-test="password"]',
      submitBtn: '[data-test="login-submit"]'
    };
  }
}