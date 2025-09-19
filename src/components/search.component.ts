import { Page, Locator } from '@playwright/test';
import { BaseComponent } from './base.component';

/**
 * SearchComponent - Reusable component for search functionality
 * Exposes locators directly for modern Playwright usage patterns
 */
export class SearchComponent extends BaseComponent {

  // Public locators - can be used directly in tests
  public readonly searchInput: Locator;
  public readonly searchButton: Locator;
  public readonly searchCaption: Locator;
  public readonly searchTerm: Locator;
  public readonly hammerHeader: Locator;
  public readonly thorHammer: Locator;
  public readonly searchCompleted: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators after page is set
    this.searchInput = this.page.locator('[data-test="search-query"]');
    this.searchButton = this.page.locator('[data-test="search-submit"]');
    this.searchCaption = this.page.locator('[data-test="search-caption"]');
    this.searchTerm = this.page.locator('[data-test="search-term"]');
    this.hammerHeader = this.page.locator('h3:has-text("Searched for: hammer")');
    this.thorHammer = this.page.locator('text=Thor Hammer');
    this.searchCompleted = this.page.locator('[data-test="search_completed"]');
  }
}
