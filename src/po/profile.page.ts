import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { personalDataInputs } from '../data/index.data';

export class ProfilePage extends BasePage {
  private readonly phoneInput = '[data-test="phone"]';
  private readonly saveButton = '[data-test="update-profile-submit"]';

  constructor(page: Page) {
    super(page);
  }

  async updatePersonalInfo(firstName: string, lastName: string, phone: string): Promise<void> {
    await this.page.fill(personalDataInputs.firstName, firstName);
    await this.page.fill(personalDataInputs.lastName, lastName);
    await this.page.fill(this.phoneInput, phone);
  }
  
  async getPersonalInfoValues(): Promise<{ firstName: string; lastName: string; phone: string; }> {
    return {
      firstName: await this.getInputValue(personalDataInputs.firstName),
      lastName: await this.getInputValue(personalDataInputs.lastName),
      phone: await this.getInputValue(this.phoneInput)
    };
  }

  async clickSave(): Promise<void> {
    await this.page.waitForSelector(this.saveButton, { state: 'visible' });
    await this.page.click(this.saveButton);
  }
}