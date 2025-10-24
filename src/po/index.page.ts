import { Page } from '@playwright/test';
import { CheckoutPage } from './checkout.page.js';
import { HomePage } from './home.page.js';
import { LoginPage } from './login.page.js';
import { ProductDetailPage } from './product-detail.page.js';
import { ProfilePage } from './profile.page.js';
import { RegisterPage } from './register.page.js';

/**
 * Page Object Factory - Creates instances of all page objects
 * This provides a clean, centralized way to instantiate page objects in tests
 */
export interface PageObjects {
  checkoutPage: CheckoutPage;
  homePage: HomePage;
  loginPage: LoginPage;
  productDetailPage: ProductDetailPage;
  profilePage: ProfilePage;
  registerPage: RegisterPage;
}

export function pages(page: Page): PageObjects {
  return {
    checkoutPage: new CheckoutPage(page),
    homePage: new HomePage(page),
    loginPage: new LoginPage(page),
    productDetailPage: new ProductDetailPage(page),
    profilePage: new ProfilePage(page),
    registerPage: new RegisterPage(page),
  };
}
