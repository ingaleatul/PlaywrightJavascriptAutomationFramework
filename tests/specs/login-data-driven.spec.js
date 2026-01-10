// tests/specs/login-data-driven.spec.js
import { test, expect } from '../fixtures/test-fixtures.js';
import { logger } from '../../utils/logger.js';
import loginTestData from '../../test-data/login-test-data.js';
import '../hooks/test-hooks.js';

// Data-driven test approach
loginTestData.forEach((testData) => {
  test(`${testData.testId} - ${testData.testName}`, async ({ loginPage, homePage, page, logger: testLogger }) => {
    testLogger.info(`Executing test: ${testData.testId} - ${testData.testName}`);
    testLogger.info(`Test Parameters: ${JSON.stringify(testData)}`);

    await test.step('Navigate to Login Page', async () => {
      await loginPage.navigateToLogin();
      expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
    });

    await test.step('Enter Credentials', async () => {
      testLogger.info(`Username: ${testData.username || 'empty'}`);
      testLogger.info(`Password: ${testData.password ? '***' : 'empty'}`);
      
      if (testData.username) {
        await loginPage.enterUsername(testData.username);
      }
      if (testData.password) {
        await loginPage.enterPassword(testData.password);
      }
      
      await loginPage.clickLoginButton();
    });

    await test.step('Verify Expected Result', async () => {
      testLogger.info(`Expected Result: ${testData.expectedResult}`);
      await page.waitForTimeout(2000);

      if (testData.shouldSucceed) {
        // Verify successful login - dashboard should be displayed
        const isHomepageDisplayed = await homePage.isHomepageDisplayed();
        expect(isHomepageDisplayed).toBeTruthy();
        testLogger.info('Login successful - Dashboard displayed');
      } else {
        // Verify login failure - should remain on login page or show error
        const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
        const isErrorDisplayed = await loginPage.isErrorDisplayed();
        
        expect(isLoginPageDisplayed || isErrorDisplayed).toBeTruthy();
        testLogger.info('Login failed as expected - Error displayed or login page shown');
      }
    });
  });
});
