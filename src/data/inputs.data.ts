import { Page } from '@playwright/test';

export function createPersonalDataLocators(page: Page) {
  return {
    firstName: page.locator('[data-test="first-name"]'),
    lastName: page.locator('[data-test="last-name"]'),
    dob: page.locator('[data-test="dob"]'),
    street: page.locator('[data-test="street"]'),
    postalCode: page.locator('[data-test="postal_code"]'),
    city: page.locator('[data-test="city"]'),
    state: page.locator('[data-test="state"]'),
    country: page.locator('[data-test="country"]'),
    phone: page.locator('[data-test="phone"]'),
    email: page.locator('[data-test="email"]'),
    password: page.locator('[data-test="password"]'),
    confirmPassword: page.locator('[data-test="confirm-password"]'),
  };
}
