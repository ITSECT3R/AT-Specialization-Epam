import { Page } from '@playwright/test';
import { expect } from 'chai';
/**
 * Filter utility functions for e-commerce product filtering
 * These functions provide reusable logic for common filtering operations
 */

/**
 * Selects all checkboxes within a specific category list
 * @param page - Playwright page object
 * @param categoryText - The text to filter the category list by
 */
async function selectAllCategoryCheckboxes(page: Page, categoryText: string): Promise<void> {
  // Find the category list and select all checkboxes within it
  const categoryList = page.getByRole('list').filter({ hasText: categoryText });
  const checkboxes = categoryList.locator('input[type="checkbox"]');
  const count = await checkboxes.count();

  for (let i = 0; i < count; i++) {
    const checkbox = checkboxes.nth(i);
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
    // Verify checkbox is checked using Chai
    const isChecked = await checkbox.isChecked();
    expect(isChecked).to.be.true;
  }
}

/**
 * Sets price range using slider controls with keyboard navigation
 * @param page - Playwright page object
 * @param minPrice - Target minimum price (0-100 range)
 * @param maxPrice - Target maximum price (0-100 range)
 */
async function setPriceRangeSlider(page: Page, minPrice: number, maxPrice: number): Promise<void> {
  // Get the slider elements
  const minSlider = page.locator('.ngx-slider-pointer-min');
  const maxSlider = page.locator('.ngx-slider-pointer-max');

  // Wait for sliders to be visible
  await minSlider.waitFor({ state: 'visible' });
  await maxSlider.waitFor({ state: 'visible' });

  // Set minimum price (assuming slider starts at 0)
  if (minPrice > 0) {
    await minSlider.click();
    await minSlider.focus();
    // Move right to increase value to target minPrice
    for (let i = 0; i < minPrice; i++) {
      await page.keyboard.press('ArrowRight');
    }
  }

  // Set maximum price (assuming slider starts at 100)
  if (maxPrice < 100) {
    await maxSlider.click();
    await maxSlider.focus();
    // Move left to decrease value to target maxPrice
    const stepsToDecrease = 100 - maxPrice;
    for (let i = 0; i < stepsToDecrease; i++) {
      await page.keyboard.press('ArrowLeft');
    }
  }
}

/**
 * Applies product sorting option
 * @param page - Playwright page object
 * @param sortOption - The sorting option to select (e.g., 'Price (High - Low)')
 */
async function applySorting(page: Page, sortOption: string): Promise<void> {
  await page.locator('[data-test="sort"]').selectOption({ label: sortOption });
}

/**
 * Complete filter and sort workflow
 * @param page - Playwright page object
 * @param categoryFilter - Category text to filter by
 * @param minPrice - Minimum price for range filter
 * @param maxPrice - Maximum price for range filter
 * @param sortOption - Sorting option to apply
 */

export async function applyFiltersAndSort(
  page: Page,
  categoryFilter: string,
  minPrice: number,
  maxPrice: number,
  sortOption: string
): Promise<void> {
  // Apply category filter
  await page.locator('#filters').getByText(categoryFilter).click();

  // Select all checkboxes in the category
  await selectAllCategoryCheckboxes(page, 'Categories Hammer Hand Saw');

  // Set price range
  await setPriceRangeSlider(page, minPrice, maxPrice);

  // Apply sorting
  await applySorting(page, sortOption);
}
