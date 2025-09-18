import { Page } from '@playwright/test';

export class SearchComponent {
  private page: Page;

  public searchInput = '[data-test="search-query"]';
  public searchButton = '[data-test="search-submit"]';
  public searchCaption = '[data-test="search-caption"]';
  public searchTerm = '[data-test="search-term"]';
  public hammerHeader = 'h3:has-text("Searched for: hammer")'
  public thorHammer = 'text=Thor Hammer';
  public searchCompleted = '[data-test="search_completed"]';

  constructor(page: Page) {
    this.page = page;
  }
}
