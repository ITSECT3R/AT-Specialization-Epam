import { Page } from '@playwright/test';

export class BaseComponent {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
