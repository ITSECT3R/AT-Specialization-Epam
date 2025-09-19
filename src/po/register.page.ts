import { createPersonalDataLocators } from '../data/index.data.ts';
import { BasePage } from './base.page.ts';
import { Page, Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  public readonly registerButton: Locator;
  public readonly inputs: ReturnType<typeof createPersonalDataLocators>;

  constructor(page: Page) {
    super(page);
    this.inputs = createPersonalDataLocators(this.page);
    this.registerButton = this.page.locator('[data-test="register-submit"]');
  }
}
