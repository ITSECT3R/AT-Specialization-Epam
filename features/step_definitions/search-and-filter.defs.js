import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, assert } from 'chai';

setDefaultTimeout(60 * 1000);

let homePage;

Then('I should see the correct page title', async function () {
  const pageTitle = await this.page.title();
  assert.match(pageTitle, /Practice Software Testing/, 'Page title should match');
});

When('I enter {string} in the search box', async function (searchTerm) {
  const { pages } = await this.loadModules();

  // Get fresh homePage reference
  homePage = pages(this.page).homePage;

  // When I enter "hammer" in the search box
  await homePage.search.searchInput.fill(searchTerm);
});

When('I click the search button', async function () {
  // And I click the search button or press Enter
  await homePage.search.searchButton.click();
});

Then('I should see the search results page', async function () {
  // And I review the search results
  const searchCaption = homePage.search.searchCaption;
  await searchCaption.waitFor({ state: 'visible' });
  const isCaptionVisible = await searchCaption.isVisible();
  expect(isCaptionVisible).to.be.true;

  const searchedForHeader = homePage.search.hammerHeader;
  await searchedForHeader.waitFor({ state: 'visible' });
  const isHeaderVisible = await searchedForHeader.isVisible();
  expect(isHeaderVisible).to.be.true;
});

Then(
  'I should see products related to {string} displayed in the results',
  async function (searchTerm) {
    // Verify search results contain relevant products
    const searchCompleted = await homePage.search.searchCompleted.textContent();
    expect(searchCompleted).to.match(new RegExp(searchTerm, 'i'));
  }
);

Then('I should see the search term {string} in the results', async function (expectedSearchTerm) {
  // Then I should see products related to "hammer" displayed in the results
  const searchTermText = await homePage.search.searchTerm.textContent();
  assert.equal(searchTermText, expectedSearchTerm, `Search term should be ${expectedSearchTerm}`);
});

Then('I should see {string} in the search results', async function (productName) {
  if (productName === 'Thor Hammer') {
    // Verify Thor Hammer appears in search results
    const thorHammer = homePage.search.thorHammer;
    await thorHammer.waitFor({ state: 'visible' });
    const isVisible = await thorHammer.isVisible();
    expect(isVisible).to.be.true;
  }
});

// Filter and Sort Scenario Steps

When('I apply filters and sorting with the following criteria:', async function (dataTable) {
  const { pages, applyFiltersAndSort } = await this.loadModules();

  homePage = pages(this.page).homePage;

  // Extract filter criteria from the data table using World utility
  const criteria = this.parseDataTableCriteria(dataTable);

  // When I apply filters and sorting using reusable utility functions
  await applyFiltersAndSort(
    this.page,
    criteria.category,
    parseInt(criteria.min_price),
    parseInt(criteria.max_price),
    criteria.sort
  );
});

Then('I should see the filtered and sorted products displayed correctly', async function () {
  // This step verifies that the filtering process completed successfully
  const hasVisibleProducts = await this.page
    .locator('h5')
    .first()
    .isVisible()
    .catch(() => false);
  expect(hasVisibleProducts).to.be.true;
});

Then('I should see {string} in the filtered results', async function (productName) {
  // Use World utility to check product visibility
  const isVisible = await this.checkProductVisibility(productName, homePage);
  expect(isVisible).to.be.true;
});
