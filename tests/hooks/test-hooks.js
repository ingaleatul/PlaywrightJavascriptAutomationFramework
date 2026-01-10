// tests/hooks/test-hooks.js
import { test } from '@playwright/test';
import { logger } from '../../utils/logger.js';
import { screenshotManager } from '../../utils/screenshot.js';

// Before All Hook
test.beforeAll(async () => {
  logger.info('========================================');
  logger.info('Starting Test Suite Execution');
  logger.info('========================================');
  logger.info(`Timestamp: ${new Date().toISOString()}`);
});

// After All Hook
test.afterAll(async () => {
  logger.info('========================================');
  logger.info('Test Suite Execution Completed');
  logger.info('========================================');
});

// Before Each Hook
test.beforeEach(async ({ page }, testInfo) => {
  const testName = testInfo.title;
  logger.info(`\n>>> Starting Test: ${testName}`);
  logger.info(`Test Method: ${testInfo.fn.name || 'anonymous'}`);
  
  // Set up page error listeners
  page.on('error', (error) => {
    logger.error(`Page error: ${error.message}`);
  });

  page.on('pageerror', (error) => {
    logger.error(`Page JavaScript error: ${error.message}`);
  });

  // Capture console messages
  page.on('console', (message) => {
    if (message.type() === 'error') {
      logger.warn(`Console error: ${message.text()}`);
    }
  });
});

// After Each Hook
test.afterEach(async ({ page }, testInfo) => {
  const testName = testInfo.title;
  
  if (testInfo.status === 'failed') {
    logger.error(`Test FAILED: ${testName}`);
    logger.error(`Failure: ${testInfo.error?.message}`);
    
    try {
      // Capture screenshot on failure
      await screenshotManager.captureScreenshot(page, testName);
      logger.info(`Screenshot saved for failed test: ${testName}`);
    } catch (error) {
      logger.error(`Failed to capture screenshot: ${error.message}`);
    }
  } else if (testInfo.status === 'passed') {
    logger.info(`Test PASSED: ${testName}`);
  } else if (testInfo.status === 'skipped') {
    logger.info(`Test SKIPPED: ${testName}`);
  }

  logger.info(`<<< Completed Test: ${testName}\n`);
});
