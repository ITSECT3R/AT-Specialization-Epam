import { Page } from "@playwright/test";
import { CheckoutPage } from "./checkout.page.ts";
import { HomePage } from "./home.page.ts";
import { LoginPage } from "./login.page.ts";
import { ProductDetailPage } from "./product-detail.page.ts";
import { ProfilePage } from "./profile.page.ts";
import { RegisterPage } from "./register.page.ts";

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
    registerPage: new RegisterPage(page)
  };
}

