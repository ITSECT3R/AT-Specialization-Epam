import { Locator, Page } from 'playwright';
import { BasePage } from './base.page';
import { createPersonalDataLocators } from '../data/index.data';

// Type definitions for checkout page
export type PaymentMethod = 'bank-transfer' | 'credit-card' | 'cash-on-delivery';
export type ProceedButton = 'btn1' | 'btn2' | 'btn3';

export interface PaymentInputSelectors {
  paymentMethod: Locator;
  bankName: Locator;
  accountName: Locator;
  accountNumber: Locator;
  finishBtn: Locator;
}

export interface PaymentData {
  method: PaymentMethod;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface ShippingData {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  public readonly paymentInputs: PaymentInputSelectors;
  public readonly shippingInputs: ReturnType<typeof createPersonalDataLocators>;
  public readonly proceedBtns: Record<ProceedButton, Locator>;

  public readonly paymentData: PaymentData = {
    method: 'bank-transfer',
    bankName: 'Bank of America',
    accountName: 'Christofer Hopkins',
    accountNumber: '123456789',
  };

  constructor(page: Page) {
    super(page);

    this.shippingInputs = createPersonalDataLocators(this.page);

    this.paymentInputs = {
      paymentMethod: this.page.locator('[data-test="payment-method"]'),
      bankName: this.page.locator('[data-test="bank_name"]'),
      accountName: this.page.locator('[data-test="account_name"]'),
      accountNumber: this.page.locator('[data-test="account_number"]'),
      finishBtn: this.page.locator('[data-test="finish"]'),
    };

    this.proceedBtns = {
      btn1: this.page.locator('[data-test="proceed-1"]'),
      btn2: this.page.locator('[data-test="proceed-2"]'),
      btn3: this.page.locator('[data-test="proceed-3"]'),
    };
  }

  async fillShippingInfo(shippingData: ShippingData): Promise<void> {
    await this.shippingInputs.street.fill(shippingData.street);
    await this.shippingInputs.city.fill(shippingData.city);
    await this.shippingInputs.state.fill(shippingData.state);
    await this.shippingInputs.country.fill(shippingData.country);
    await this.shippingInputs.postalCode.fill(shippingData.postalCode);
  }

  async fillPaymentInfo(): Promise<void> {
    await this.paymentInputs.paymentMethod.selectOption(this.paymentData.method);
    await this.paymentInputs.bankName.fill(this.paymentData.bankName);
    await this.paymentInputs.accountName.fill(this.paymentData.accountName);
    await this.paymentInputs.accountNumber.fill(this.paymentData.accountNumber);
  }

  async completePayment(): Promise<void> {
    await this.paymentInputs.finishBtn.click();
  }

  async getPaymentSuccessMessage(): Promise<string> {
    const paymentSuccessMessage = this.page
      .locator('div')
      .filter({ hasText: /^Payment was successful$/ })
      .first();
    await paymentSuccessMessage.waitFor({ state: 'visible' });
    return (await paymentSuccessMessage.textContent()) || '';
  }

  async isPaymentSuccessVisible(): Promise<boolean> {
    const paymentSuccessMessage = this.page
      .locator('div')
      .filter({ hasText: /^Payment was successful$/ })
      .first();
    await paymentSuccessMessage.waitFor({ state: 'visible' });
    return await paymentSuccessMessage.isVisible();
  }
}
