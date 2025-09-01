import { test } from '@playwright/test';
import { expect } from 'chai';
import { loginUser } from './utils/login';
import { applyFiltersAndSort } from './utils/filter-utils';

test.describe('Search & Filter', () => {
  
  test('Search for a specific product by name', async ({ page }) => {
    // Given I am on the Practice Software Testing homepage
    await page.goto('/');
    await page.waitForLoadState('load');
    const pageTitle = await page.title();
    expect(pageTitle).to.match(/Practice Software Testing/);
    
    // When I enter "hammer" in the search box
    await page.fill('[data-test="search-query"]', 'hammer');
    
    // And I click the search button or press Enter
    await page.click('[data-test="search-submit"]');
    
    // And I review the search results
    const searchCaption = page.locator('[data-test="search-caption"]');
    await searchCaption.waitFor({ state: 'visible' });
    const isCaptionVisible = await searchCaption.isVisible();
    expect(isCaptionVisible).to.be.true;
    
    const searchedForHeader = page.locator('h3:has-text("Searched for: hammer")');
    await searchedForHeader.waitFor({ state: 'visible' });
    const isHeaderVisible = await searchedForHeader.isVisible();
    expect(isHeaderVisible).to.be.true;
    
    // Then I should see products related to "hammer" displayed in the results
    const searchTermText = await page.locator('[data-test="search-term"]').textContent();
    expect(searchTermText).to.equal('hammer');

    // Verify Thor Hammer appears in search results
    const thorHammer = page.locator('text=Thor Hammer');
    await thorHammer.waitFor({ state: 'visible' });
    const isThorHammerVisible = await thorHammer.isVisible();
    expect(isThorHammerVisible).to.be.true;

    // Verify search results contain relevant products
    const searchCompleted = await page.locator('[data-test="search_completed"]').textContent();
    expect(searchCompleted).to.match(/hammer/i);
  });

  test('Filter and sort products on the main page', async ({ page }) => {
    await loginUser(page);
    // Given I am on the Practice Software Testing homepage
    await page.goto('/');
    await page.waitForLoadState('load');
    const pageTitle = await page.title();
    expect(pageTitle).to.match(/Practice Software Testing/);
    
    // When I apply filters and sorting using reusable utility functions
    const expectedProducts = [
      'Open-end Spanners (Set)',
      'Swiss Woodcarving Chisels', 
      'Adjustable Wrench',
      'Claw Hammer with Fiberglass Handle'
    ];
    
    await applyFiltersAndSort(
      page,
      'Hand Tools',           // Category filter
      19,                     // Min price
      45,                     // Max price  
      'Price (High - Low)',   // Sort option
      expectedProducts        // Expected products to verify
    );

    // Additional verification: Check that products are visible
    const openEndSpannersElement = page.locator('h5:has-text("Open-end Spanners (Set)")');
    const swissWoodcarvingChiselsElement = page.locator('h5:has-text("Swiss Woodcarving Chisels")');
    const adjustableWrenchElement = page.locator('h5:has-text("Adjustable Wrench")');
    const clawHammerElement = page.locator('h5:has-text("Claw Hammer with Fiberglass Handle")');

    // Wait for and verify all elements are visible
    await openEndSpannersElement.waitFor({ state: 'visible' });
    const isOpenEndVisible = await openEndSpannersElement.isVisible();
    expect(isOpenEndVisible).to.be.true;
    
    await swissWoodcarvingChiselsElement.waitFor({ state: 'visible' });
    const isSwissWoodcarvingVisible = await swissWoodcarvingChiselsElement.isVisible();
    expect(isSwissWoodcarvingVisible).to.be.true;
    
    await adjustableWrenchElement.waitFor({ state: 'visible' });
    const isAdjustableWrenchVisible = await adjustableWrenchElement.isVisible();
    expect(isAdjustableWrenchVisible).to.be.true;
    
    await clawHammerElement.waitFor({ state: 'visible' });
    const isClawHammerVisible = await clawHammerElement.isVisible();
    expect(isClawHammerVisible).to.be.true;
  });
});
