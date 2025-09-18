import { test } from '@playwright/test';
import { expect } from 'chai';
import * as chai from 'chai';
chai.should();
import { assert } from 'chai';
import { urls, expectedProducts  } from '../data/index.data';
import { loginUser, applyFiltersAndSort } from '../utils/index.utils';
import { pages } from '../po/index.page';

test.describe('Search & Filter', () => {
  
  test('Search for a specific product by name', async ({ page }) => {
    const { homePage } = pages(page);

    // Given I am on the Practice Software Testing homepage
    await homePage.navigateTo(urls.home);
    await homePage.waitForLoad();
    const pageTitle = await page.title();

    assert.match(pageTitle, /Practice Software Testing/, 'Page title should match');
    
    // When I enter "hammer" in the search box
    await page.fill(homePage.search.searchInput, 'hammer');
    
    // And I click the search button or press Enter
    await page.click(homePage.search.searchButton);

    // And I review the search results
    const searchCaption = page.locator(homePage.search.searchCaption);
    await searchCaption.waitFor({ state: 'visible' });
    const isCaptionVisible = await searchCaption.isVisible();
    (isCaptionVisible as any).should.be.true;

    const searchedForHeader = page.locator(homePage.search.hammerHeader);
    await searchedForHeader.waitFor({ state: 'visible' });
    const isHeaderVisible = await searchedForHeader.isVisible();

    expect(isHeaderVisible).to.be.true;
    
    // Then I should see products related to "hammer" displayed in the results
    const searchTermText = await page.locator(homePage.search.searchTerm).textContent();
    assert.equal(searchTermText, 'hammer', 'Search term should be hammer');

    // Verify Thor Hammer appears in search results
    const thorHammer = page.locator(homePage.search.thorHammer);
    await thorHammer.waitFor({ state: 'visible' });
    await thorHammer.isVisible();

    // Verify search results contain relevant products
    const searchCompleted = await page.locator(homePage.search.searchCompleted).textContent();
    expect(searchCompleted).to.match(/hammer/i);
  });

  test('Filter and sort products on the main page', async ({ page }) => {
    const { homePage } = pages(page);

    await loginUser(page);
    // Given I am on the Practice Software Testing homepage
    await homePage.navigateTo(urls.home);
    await homePage.waitForLoad();
    const currentUrl = await homePage.getCurrentUrl();

    (currentUrl as any).should.equal(urls.home);

    // When I apply filters and sorting using reusable utility functions
    await applyFiltersAndSort(
      page,
      'Hand Tools',           // Category filter
      19,                     // Min price
      45,                     // Max price  
      'Price (High - Low)',   // Sort option
    );
    
    // Then I should see the filtered and sorted products displayed correctly
    expect(await homePage.store.isVisibleProduct(expectedProducts.spannersSet)).to.be.true;
    assert.isTrue(await homePage.store.isVisibleProduct(expectedProducts.swissWoodcarvingChisels));
    (await homePage.store.isVisibleProduct(expectedProducts.adjustableWrench) as any).should.be.true;
    expect(await homePage.store.isVisibleProduct(expectedProducts.clawHammer)).to.be.true;
  });
});
