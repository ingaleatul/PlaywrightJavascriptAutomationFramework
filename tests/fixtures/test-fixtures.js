// tests/fixtures/test-fixtures.js
import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/login-page.js';
import { HomePage } from '../../pages/home-page.js';
import { logger } from '../../utils/logger.js';
import { screenshotManager } from '../../utils/screenshot.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  logger: async ({}, use) => {
    await use(logger);
  },

  screenshotManager: async ({}, use) => {
    await use(screenshotManager);
  },
});

export { expect } from '@playwright/test';
