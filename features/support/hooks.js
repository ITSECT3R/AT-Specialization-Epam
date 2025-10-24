import { Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.init();
});

After(async function () {
  // Clean up after each scenario
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
