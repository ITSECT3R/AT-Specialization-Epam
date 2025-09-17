import { BasePage } from './base.page.ts';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
    public readonly registerButton = '[data-test="register-submit"]';
  constructor(page: Page) {
    super(page);
  }

}
