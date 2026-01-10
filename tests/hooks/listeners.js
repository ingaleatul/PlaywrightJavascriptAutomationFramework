// tests/hooks/listeners.js
import { test } from '@playwright/test';
import { logger } from '../../utils/logger.js';

/**
 * Custom Test Listeners/Hooks
 * Provides global test lifecycle management
 */

// Global test event listener
class TestListener {
  constructor() {
    this.testStats = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
    };
  }

  recordTestResult(status) {
    this.testStats.total++;
    if (status === 'passed') this.testStats.passed++;
    else if (status === 'failed') this.testStats.failed++;
    else if (status === 'skipped') this.testStats.skipped++;
  }

  getReport() {
    return this.testStats;
  }
}

export const testListener = new TestListener();

/**
 * Test event handlers
 */

// Attach listener to each test
test.afterEach((testInfo) => {
  testListener.recordTestResult(testInfo.status);
  
  const duration = testInfo.duration;
  logger.info(`Test duration: ${duration}ms`);
});

// Report summary after all tests
test.afterAll(() => {
  const report = testListener.getReport();
  logger.info('\n========================================');
  logger.info('TEST EXECUTION SUMMARY');
  logger.info('========================================');
  logger.info(`Total Tests: ${report.total}`);
  logger.info(`✓ Passed: ${report.passed}`);
  logger.info(`✗ Failed: ${report.failed}`);
  logger.info(`⊘ Skipped: ${report.skipped}`);
  logger.info(`Success Rate: ${report.total > 0 ? ((report.passed / report.total) * 100).toFixed(2) : 0}%`);
  logger.info('========================================\n');
});

export default TestListener;
