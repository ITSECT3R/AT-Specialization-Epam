import { Page } from "@playwright/test";
import { BasePage } from "./base.page.ts"
import { LoginPage } from "./login.page.ts";
import { HomePage } from "./home.page.ts";
import { RegisterPage } from "./register.page.ts";
import { utils } from "../utils/index.utils.ts";
import { register } from "module";



export function pages(page: Page): { [key: string]: LoginPage | HomePage | RegisterPage } {
  return {
    login: new LoginPage(page),
    home: new HomePage(page),
    register: new RegisterPage(page)
  };
}

export function urls(): { [key: string]: string } {
  return {
    home: '/',
    login: 'https://practicesoftwaretesting.com/auth/login',
    profile: 'https://practicesoftwaretesting.com/account/profile',
    register: 'https://practicesoftwaretesting.com/auth/register',
    account: 'https://practicesoftwaretesting.com/account',
    checkout: 'https://practicesoftwaretesting.com/checkout',
  };
}

export const tools = utils();
