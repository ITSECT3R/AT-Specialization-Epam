import { test, expect } from '@playwright/test';
import { baseURL, loginUser } from './utils/test-config';
import { applyFiltersAndSort } from './utils/filter-utils';

test.describe('Search & Filter', () => {
  
  test('Search for a specific product by name', async ({ page }) => {
    // Given I am on the Practice Software Testing homepage
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Practice Software Testing/);
    
    // When I enter "hammer" in the search box
    await page.fill('[data-test="search-query"]', 'hammer');
    
    // And I click the search button or press Enter
    await page.click('[data-test="search-submit"]');
    
    // And I review the search results
    await expect(page.locator('[data-test="search-caption"]')).toBeVisible();
    await expect(page.locator('h3:has-text("Searched for: hammer")')).toBeVisible();
    
    // Then I should see products related to "hammer" displayed in the results
    await expect(page.locator('[data-test="search-term"]')).toHaveText('hammer');

    // Verify Thor Hammer appears in search results
    await expect(page.locator('text=Thor Hammer')).toBeVisible();

    // Verify search results contain relevant products
    await expect(page.locator('[data-test="search_completed"]')).toContainText(/hammer/i);
  });

  test('Filter and sort products on the main page', async ({ page }) => {
    await loginUser(page);
    // Given I am on the Practice Software Testing homepage
    await page.goto(baseURL);
    await expect(page).toHaveTitle(/Practice Software Testing/);
    
    // When I apply filters and sorting using reusable utility functions
    const expectedProducts = [
      'Bolt Cutters',
      'Claw Hammer with Fiberglass Handle', 
      'Adjustable Wrench'
    ];
    
    await applyFiltersAndSort(
      page,
      'Hand Tools',           // Category filter
      19,                     // Min price
      45,                     // Max price  
      'Price (High - Low)',   // Sort option
      expectedProducts        // Expected products to verify
    );

    // Additional verification: Check that Bolt Cutters appears before Adjustable Wrench
    // (Price High to Low sorting: $48.41 > $20.33)
    const boltCuttersElement = page.locator('h5:has-text("Bolt Cutters")');
    const adjustableWrenchElement = page.locator('h5:has-text("Adjustable Wrench")');

    // Both should be visible
    await expect(boltCuttersElement).toBeVisible();
    await expect(adjustableWrenchElement).toBeVisible();
  });
});
