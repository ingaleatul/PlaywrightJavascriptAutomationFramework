// tests/api/test-data-provider.js
import fs from 'fs';
import path from 'path';
import { logger } from '../../utils/logger.js';

/**
 * Test Data Provider
 * Manages test data from various sources
 */
export class TestDataProvider {
  constructor() {
    this.dataCache = new Map();
  }

  /**
   * Load test data from JavaScript file
   */
  static loadFromJS(data) {
    try {
      logger.debug('Loading test data from JavaScript file');
      return data;
    } catch (error) {
      logger.error('Failed to load test data', error.message);
      throw error;
    }
  }

  /**
   * Load test data from JSON file
   */
  static loadFromJSON(filePath) {
    try {
      const absolutePath = path.resolve(filePath);
      const fileContent = fs.readFileSync(absolutePath, 'utf8');
      const data = JSON.parse(fileContent);
      logger.info(`Test data loaded from JSON: ${filePath}`);
      return data;
    } catch (error) {
      logger.error(`Failed to load JSON test data from ${filePath}`, error.message);
      throw error;
    }
  }

  /**
   * Get test data by ID
   */
  static getTestDataById(data, testId) {
    const testData = data.find((item) => item.testId === testId);
    if (!testData) {
      logger.warn(`Test data not found for ID: ${testId}`);
      return null;
    }
    return testData;
  }

  /**
   * Get test data by name
   */
  static getTestDataByName(data, testName) {
    const testData = data.find((item) => item.testName === testName);
    if (!testData) {
      logger.warn(`Test data not found for name: ${testName}`);
      return null;
    }
    return testData;
  }

  /**
   * Filter test data by criteria
   */
  static filterTestData(data, criteria) {
    return data.filter((item) => {
      for (const [key, value] of Object.entries(criteria)) {
        if (item[key] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Get positive test cases (should succeed)
   */
  static getPositiveTestCases(data) {
    return this.filterTestData(data, { shouldSucceed: true });
  }

  /**
   * Get negative test cases (should fail)
   */
  static getNegativeTestCases(data) {
    return this.filterTestData(data, { shouldSucceed: false });
  }
}

export default TestDataProvider;
