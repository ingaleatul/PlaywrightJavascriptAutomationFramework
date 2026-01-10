// tests/specs/logout.spec.js
import { test, expect } from '../fixtures/test-fixtures.js';
import { logger } from '../../utils/logger.js';
import properties from '../../config/properties.js';
import '../hooks/test-hooks.js';

// Test: Successful Logout
test('TC009 - Successful Logout', async ({ loginPage, homePage, page, logger: testLogger }) => {
  testLogger.info('Test: Successful Logout');

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Login with Valid Credentials', async () => {
    const { username, password } = properties.validCredentials;
    await loginPage.login(username, password);
  });

  await test.step('Verify Dashboard is Displayed', async () => {
    await page.waitForSelector('.oxd-layout-context', { timeout: 15000 });
    const isHomepageDisplayed = await homePage.isHomepageDisplayed();
    expect(isHomepageDisplayed).toBeTruthy();
  });

  await test.step('Logout from Application', async () => {
    await homePage.logout();
    testLogger.info('Logout action completed');
  });

  await test.step('Verify User is Redirected to Login Page', async () => {
    await page.waitForTimeout(1500);
    const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBeTruthy();
    testLogger.info('User successfully redirected to login page');
  });
});

// Test: Session Timeout
test('TC010 - Verify Login Session', async ({ loginPage, homePage, page, logger: testLogger }) => {
  testLogger.info('Test: Verify Login Session');

  await test.step('Login with Valid Credentials', async () => {
    await loginPage.navigateToLogin();
    await loginPage.login(properties.validCredentials.username, properties.validCredentials.password);
  });

  await test.step('Verify Session is Active', async () => {
    await page.waitForTimeout(1000);
    const isHomepageDisplayed = await homePage.isHomepageDisplayed();
    expect(isHomepageDisplayed).toBeTruthy();
    testLogger.info('User session is active');
  });

  await test.step('Verify Page Title Contains Expected Text', async () => {
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toBeTruthy();
    testLogger.info(`Current page title: ${pageTitle}`);
  });
});
