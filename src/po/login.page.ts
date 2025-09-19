import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { createPersonalDataLocators   } from '../data/index.data';

export class LoginPage extends BasePage {
  private readonly loginButton: Locator;
  private readonly successMessage: Locator;
  private readonly errorMessage: Locator;
  private readonly inputs = createPersonalDataLocators(this.page);

  constructor(page: Page) {
    super(page);
    this.loginButton = this.page.locator('[data-test="login-submit"]');
    this.successMessage = this.page.locator('[data-test="success-message"]');
    this.errorMessage = this.page.locator('[data-test="error-message"]');
  }

  async login(email: string, password: string) {
    await this.inputs.email.fill(email);
    await this.inputs.password.fill(password);
    await this.loginButton.click();
  }

  async getNavMenuText(): Promise<string> {
    const navMenu = this.header.navHeaderBtns.menu;
    await navMenu.waitFor({ state: 'visible' });
    return await navMenu.textContent() || '';
  }
}