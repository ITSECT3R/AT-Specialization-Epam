import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { createPersonalDataLocators } from '../data/index.data';

export class ProfilePage extends BasePage {
  public readonly inputs: ReturnType<typeof createPersonalDataLocators>;
  public readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inputs = createPersonalDataLocators(this.page);
    this.saveButton = this.page.locator('[data-test="update-profile-submit"]');
  }

  async updatePersonalInfo(firstName: string, lastName: string, phone: string): Promise<void> {
    await this.inputs.firstName.fill(firstName);
    await this.inputs.lastName.fill(lastName);
    await this.inputs.phone.fill(phone);
  }
  
  async getPersonalInfoValues(): Promise<{ firstName: string; lastName: string; phone: string; }> {
    return {
      firstName: await this.inputs.firstName.inputValue(),
      lastName: await this.inputs.lastName.inputValue(),
      phone: await this.inputs.phone.inputValue()
    };
  }

  async clickSave(): Promise<void> {
    await this.saveButton.waitFor({ state: 'visible' });
    await this.saveButton.click();
  }
}