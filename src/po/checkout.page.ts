import { Page } from "playwright";
import { BasePage } from "./base.page";

// Type definitions for checkout page
export type PaymentMethod = 'bank-transfer' | 'credit-card' | 'cash-on-delivery';

export interface PaymentInputSelectors {
  paymentMethod: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  finishBtn: string;
}

export interface PaymentData {
  method: PaymentMethod;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export class CheckoutPage extends BasePage {
  public readonly paymentInputs: PaymentInputSelectors = {
    paymentMethod: '[data-test="payment-method"]',
    bankName: '[data-test="bank_name"]',
    accountName: '[data-test="account_name"]',
    accountNumber: '[data-test="account_number"]',
    finishBtn: '[data-test="finish"]',
  };

  public readonly paymentData: PaymentData = {
    method: 'bank-transfer',
    bankName: 'Bank of America',
    accountName: 'Christofer Hopkins',
    accountNumber: '123456789',
  };

  constructor(page: Page) {
    super(page);
  }
}