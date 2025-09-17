import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { urls, personalDataInputs  } from '../data/index.data';

export class LoginPage extends BasePage {
  private readonly navMenu = '[data-test="nav-menu"]';

  private readonly loginButton = '[data-test="login-submit"]';

  private readonly successMessage = '[data-test="success-message"]';
  private readonly errorMessage = '[data-test="error-message"]';

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.page.fill(personalDataInputs.email, email);
    await this.page.fill(personalDataInputs.password, password);
    await this.page.click(this.loginButton);
  }

  async getNavMenuText(): Promise<string> {
    const navMenu = this.page.locator(this.navMenu);
    await navMenu.waitFor({ state: 'visible' });
    return await navMenu.textContent() || '';
  }

  async verifyAccountUrl(): Promise<boolean> {
    const url = await this.getCurrentUrl();
    return url.match(urls.account) !== null;
  }
}