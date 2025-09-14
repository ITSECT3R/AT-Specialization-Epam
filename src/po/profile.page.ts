import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProfilePage extends BasePage {
  // Only the selectors we actually use in the test
  private readonly navMenu = '[data-test="nav-menu"]';
  private readonly navMyProfile = '[data-test="nav-my-profile"]';
  private readonly firstNameInput = '[data-test="first-name"]';
  private readonly lastNameInput = '[data-test="last-name"]';
  private readonly phoneInput = '[data-test="phone"]';
  private readonly saveButton = '[data-test="update-profile-submit"]';

  constructor(page: Page) {
    super(page);
  }

  // Only the methods we actually need from the test
  async navigateToProfile(): Promise<void> {
    await this.clickElement(this.navMenu);
    await this.clickElement(this.navMyProfile);
    await this.waitForUrl(/.*\/profile/);
  }

  async updatePersonalInfo(firstName: string, lastName: string, phone: string): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.phoneInput, phone);
  }

  async clickSave(): Promise<void> {
    await this.page.waitForSelector(this.saveButton, { state: 'visible' });
    await this.clickElement(this.saveButton);
  }

  async getPersonalInfoValues(): Promise<{ firstName: string; lastName: string; phone: string; }> {
    return {
      firstName: await this.getInputValue(this.firstNameInput),
      lastName: await this.getInputValue(this.lastNameInput),
      phone: await this.getInputValue(this.phoneInput)
    };
  }

  async verifyProfileUrl(): Promise<boolean> {
    return this.getCurrentUrl().match(/.*\/profile/) !== null;
  }
}