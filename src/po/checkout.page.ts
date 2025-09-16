import { Page } from "playwright";
import { BasePage } from "./base.page";


export class CheckoutPage extends BasePage {
  paymentInputs = {
    'payment Method' : '[data-test="payment-method"]',
    'bank Name': '[data-test="bank_name"]',
    'account Name': '[data-test="account_name"]',
    'account Number': '[data-test="account_number"]',
    'finish Btn': '[data-test="finish"]',
  }
  paymentData = {
    method: 'bank-transfer',
    bankName: 'Bank of America',
    accountName: 'Christofer Hopkins',
    accountNumber: '123456789',
  }

  constructor(page: Page) {
    super(page);
  }

}