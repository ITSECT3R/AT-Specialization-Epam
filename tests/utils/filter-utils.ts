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
export async function selectAllCategoryCheckboxes(page: Page, categoryText: string): Promise<void> {
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
export async function setPriceRangeSlider(page: Page, minPrice: number, maxPrice: number): Promise<void> {
  // Get the slider elements
  const minSlider = page.locator('.ngx-slider-pointer-min');
  const maxSlider = page.locator('.ngx-slider-pointer-max');
  
  // Wait for sliders to be visible
  await minSlider.waitFor({ state: 'visible' });
  await maxSlider.waitFor({ state: 'visible' });
  
  // Verify sliders are visible using Chai
  const minSliderVisible = await minSlider.isVisible();
  const maxSliderVisible = await maxSlider.isVisible();
  expect(minSliderVisible).to.be.true;
  expect(maxSliderVisible).to.be.true;
  
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
export async function applySorting(page: Page, sortOption: string): Promise<void> {
  await page.locator('[data-test="sort"]').selectOption({ label: sortOption });
}

/**
 * Waits for sorting to be applied by checking for a specific product to appear first
 * @param page - Playwright page object
 * @param firstProductName - Name of the product that should appear first after sorting
 * @param timeout - Optional timeout in milliseconds (default: 10000)
 */
export async function waitForSortingComplete(page: Page, firstProductName: string, timeout: number = 10000): Promise<void> {
  const productLocator = page.locator(`h5:has-text("${firstProductName}")`);
  await productLocator.waitFor({ state: 'visible', timeout });
  
  // Verify product is visible using Chai
  const isVisible = await productLocator.isVisible();
  expect(isVisible).to.be.true;
}

/**
 * Verifies that specific products are visible after filtering
 * @param page - Playwright page object
 * @param productNames - Array of product names to verify
 * @param timeout - Optional timeout in milliseconds (default: 10000)
 */
export async function verifyProductsVisible(page: Page, productNames: string[], timeout: number = 10000): Promise<void> {
  for (const productName of productNames) {
    const productLocator = page.locator(`h5:has-text("${productName}")`);
    await productLocator.waitFor({ state: 'visible', timeout });
    
    // Verify product is visible using Chai
    const isVisible = await productLocator.isVisible();
    expect(isVisible).to.be.true;
  }
}

/**
 * Complete filter and sort workflow
 * @param page - Playwright page object
 * @param categoryFilter - Category text to filter by
 * @param minPrice - Minimum price for range filter
 * @param maxPrice - Maximum price for range filter
 * @param sortOption - Sorting option to apply
 * @param expectedProducts - Array of product names to verify after filtering
 */
export async function applyFiltersAndSort(
  page: Page,
  categoryFilter: string,
  minPrice: number,
  maxPrice: number,
  sortOption: string,
  expectedProducts: string[]
): Promise<void> {
  // Apply category filter
  await page.locator('#filters').getByText(categoryFilter).click();
  
  // Select all checkboxes in the category
  await selectAllCategoryCheckboxes(page, 'Categories Hammer Hand Saw');
  
  // Set price range
  await setPriceRangeSlider(page, minPrice, maxPrice);
  
  // Apply sorting
  await applySorting(page, sortOption);
  
  // Wait for sorting to complete (using first expected product)
  if (expectedProducts.length > 0) {
    await waitForSortingComplete(page, expectedProducts[0]);
  }
  
  // Verify expected products are visible
  await verifyProductsVisible(page, expectedProducts);
}
