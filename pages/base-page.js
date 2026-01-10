// pages/base-page.js
import { logger } from '../utils/logger.js';
import { screenshotManager } from '../utils/screenshot.js';
import { WaitHelper } from '../utils/wait-helper.js';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.logger = logger;
    this.screenshotManager = screenshotManager;
    this.waitHelper = WaitHelper;
  }

  async goto(path = '') {
    try {
      this.logger.info(`Navigating to: ${path}`);
      await this.page.goto(path);
      this.logger.info(`Successfully navigated to: ${path}`);
    } catch (error) {
      this.logger.error(`Navigation failed: ${error.message}`);
      throw error;
    }
  }

  async click(selector) {
    try {
      this.logger.debug(`Clicking element: ${selector}`);
      await this.page.click(selector);
      this.logger.info(`Element clicked: ${selector}`);
    } catch (error) {
      this.logger.error(`Failed to click element: ${selector}`, error.message);
      throw error;
    }
  }

  async fill(selector, text) {
    try {
      this.logger.debug(`Filling element: ${selector} with text`);
      await this.page.fill(selector, text);
      this.logger.info(`Element filled: ${selector}`);
    } catch (error) {
      this.logger.error(`Failed to fill element: ${selector}`, error.message);
      throw error;
    }
  }

  async getText(selector) {
    try {
      this.logger.debug(`Getting text from element: ${selector}`);
      const text = await this.page.textContent(selector);
      this.logger.info(`Text retrieved from ${selector}: ${text}`);
      return text;
    } catch (error) {
      this.logger.error(`Failed to get text from element: ${selector}`, error.message);
      throw error;
    }
  }

  async isVisible(selector) {
    try {
      const visible = await this.page.isVisible(selector);
      this.logger.debug(`Element visibility check: ${selector} - ${visible}`);
      return visible;
    } catch (error) {
      this.logger.warn(`Failed to check visibility: ${selector}`, error.message);
      return false;
    }
  }

  async waitForElement(selector, timeout = 30000) {
    return this.waitHelper.waitForElement(this.page, selector, timeout);
  }

  async captureScreenshot(testName) {
    return this.screenshotManager.captureScreenshot(this.page, testName);
  }

  async captureFullPageScreenshot(testName) {
    return this.screenshotManager.captureFullPageScreenshot(this.page, testName);
  }

  async getTitle() {
    const title = await this.page.title();
    this.logger.info(`Page title: ${title}`);
    return title;
  }

  async getURL() {
    const url = this.page.url();
    this.logger.info(`Current URL: ${url}`);
    return url;
  }

  async press(key) {
    try {
      this.logger.debug(`Pressing key: ${key}`);
      await this.page.press('body', key);
    } catch (error) {
      this.logger.error(`Failed to press key: ${key}`, error.message);
      throw error;
    }
  }

  async reload() {
    try {
      this.logger.info(`Reloading page`);
      await this.page.reload();
    } catch (error) {
      this.logger.error(`Failed to reload page`, error.message);
      throw error;
    }
  }
}

export default BasePage;
