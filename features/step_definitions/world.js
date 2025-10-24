import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

class CustomWorld extends World {
  async init() {
    this.baseURL = 'https://practicesoftwaretesting.com';
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Initialize modules cache
    this.modules = {};
  }

  async loadModules() {
    // Load modules once and cache them to avoid repeated imports
    if (!this.modules.pages) {
      const { pages } = await import('../../src/po/index.page.ts');
      const { urls, updateUserInfo, products, expectedProducts } = await import(
        '../../src/data/index.data.ts'
      );
      const { getTestUser, registerUser, loginUser, applyFiltersAndSort } = await import(
        '../../src/utils/index.utils.ts'
      );

      this.modules = {
        pages,
        urls,
        updateUserInfo,
        products,
        expectedProducts,
        getTestUser,
        registerUser,
        loginUser,
        applyFiltersAndSort,
      };
    }
    return this.modules;
  }

  // Utility function to parse data table criteria
  parseDataTableCriteria(dataTable) {
    const criteria = {};
    const rows = dataTable.hashes();
    rows.forEach(row => {
      const key = Object.keys(row)[0];
      const value = Object.values(row)[0];
      criteria[key] = value;
    });
    return criteria;
  }

  // Utility function to parse data table for shipping information
  parseShippingDataTable(dataTable) {
    const shippingInfo = {};
    const rows = dataTable.hashes();
    rows.forEach(row => {
      shippingInfo[row.field] = row.value;
    });
    return shippingInfo;
  }

  // Utility function to check if a product is visible in filtered results
  async checkProductVisibility(productName, homePage) {
    const { expectedProducts } = await this.loadModules();

    let isVisible = false;

    switch (productName) {
      case 'Open-end Spanners (Set)':
        isVisible = await homePage.store.isVisibleProduct(expectedProducts.spannersSet);
        break;
      case 'Swiss Woodcarving Chisels':
        isVisible = await homePage.store.isVisibleProduct(expectedProducts.swissWoodcarvingChisels);
        break;
      case 'Adjustable Wrench':
        isVisible = await homePage.store.isVisibleProduct(expectedProducts.adjustableWrench);
        break;
      case 'Claw Hammer with Fiberglass Handle':
        isVisible = await homePage.store.isVisibleProduct(expectedProducts.clawHammer);
        break;
      default:
        throw new Error(`Unknown product: ${productName}`);
    }

    return isVisible;
  }

  async close() {
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
