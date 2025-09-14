import { BasePage } from './base.page.ts';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  inputs(){
    return {
      firstName: '[data-test="first-name"]',
      lastName: '[data-test="last-name"]',
      dob: '[data-test="dob"]',
      street: '[data-test="street"]',
      postalCode: '[data-test="postal_code"]',
      city: '[data-test="city"]',
      state: '[data-test="state"]',
      country: '[data-test="country"]',
      phone: '[data-test="phone"]',
      email: '[data-test="email"]',
      password: '[data-test="password"]',
      confirmPassword: '[data-test="confirm-password"]',
      registerButton: '[data-test="register-submit"]',
      successMessage: '[data-test="success-message"]',
      errorMessage: '[data-test="error-message"]'
    };
  }

}
