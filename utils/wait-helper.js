// utils/wait-helper.js
import { logger } from './logger.js';

export class WaitHelper {
  static async waitForElement(page, selector, timeout = 30000) {
    try {
      logger.debug(`Waiting for element: ${selector}`);
      await page.waitForSelector(selector, { timeout });
      logger.info(`Element found: ${selector}`);
    } catch (error) {
      logger.error(`Element not found within timeout: ${selector}`, error.message);
      throw error;
    }
  }

  static async waitForNavigation(page, action, timeout = 30000) {
    try {
      logger.debug(`Waiting for navigation after action`);
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout }),
        action(),
      ]);
      logger.info(`Navigation completed successfully`);
    } catch (error) {
      logger.warn(`Navigation timeout or error`, error.message);
    }
  }

  static async waitForFunction(page, predicate, timeout = 30000) {
    try {
      logger.debug(`Waiting for function condition`);
      await page.waitForFunction(predicate, { timeout });
      logger.info(`Function condition met`);
    } catch (error) {
      logger.error(`Function condition not met within timeout`, error.message);
      throw error;
    }
  }
}

export default WaitHelper;
