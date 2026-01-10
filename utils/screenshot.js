// utils/screenshot.js
import fs from 'fs';
import path from 'path';
import { logger } from './logger.js';

class ScreenshotManager {
  constructor() {
    this.screenshotDir = './screenshots';
    
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
  }

  async captureScreenshot(page, testName) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${testName}_${timestamp}.png`;
      const filepath = path.join(this.screenshotDir, filename);

      await page.screenshot({ path: filepath });
      logger.info(`Screenshot captured: ${filepath}`);
      return filepath;
    } catch (error) {
      logger.error('Failed to capture screenshot', error);
      throw error;
    }
  }

  async captureFullPageScreenshot(page, testName) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${testName}_fullpage_${timestamp}.png`;
      const filepath = path.join(this.screenshotDir, filename);

      await page.screenshot({ path: filepath, fullPage: true });
      logger.info(`Full page screenshot captured: ${filepath}`);
      return filepath;
    } catch (error) {
      logger.error('Failed to capture full page screenshot', error);
      throw error;
    }
  }
}

export const screenshotManager = new ScreenshotManager();
export default ScreenshotManager;
