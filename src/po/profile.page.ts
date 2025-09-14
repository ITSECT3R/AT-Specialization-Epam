import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { urls } from '.';

export class ProfilePage extends BasePage {
  private readonly navMenu = '[data-test="nav-menu"]';
  private readonly navMyProfile = '[data-test="nav-my-profile"]';
  private readonly firstNameInput = '[data-test="first-name"]';
  private readonly lastNameInput = '[data-test="last-name"]';
  private readonly phoneInput = '[data-test="phone"]';
  private readonly saveButton = '[data-test="update-profile-submit"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToProfile(): Promise<void> {
    await this.clickElement(this.navMenu);
    await this.clickElement(this.navMyProfile);
    await this.waitForUrl(urls.profile);
  }

  async updatePersonalInfo(firstName: string, lastName: string, phone: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.phoneInput, phone);
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
}