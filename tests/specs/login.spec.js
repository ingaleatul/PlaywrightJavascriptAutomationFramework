// tests/specs/login.spec.js
import { test, expect } from '../fixtures/test-fixtures.js';
import { logger } from '../../utils/logger.js';
import loginTestData from '../../test-data/login-test-data.js';
import '../hooks/test-hooks.js';

// Test: Valid Login
test('TC001 - Valid Login with Valid Credentials', async ({ loginPage, homePage, page }) => {
  logger.info('Test: Valid Login with Valid Credentials');
  
  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Enter Valid Credentials', async () => {
    const testData = loginTestData[0]; // TC001
    await loginPage.login(testData.username, testData.password);
  });

  await test.step('Verify Dashboard is Displayed', async () => {
    // Wait for dashboard to load
    await page.waitForTimeout(2000);
    const isHomepageDisplayed = await homePage.isHomepageDisplayed();
    expect(isHomepageDisplayed).toBeTruthy();
  });
});

// Test: Invalid Username
test('TC002 - Login with Invalid Username', async ({ loginPage, page, logger: testLogger }) => {
  testLogger.info('Test: Login with Invalid Username');
  const testData = loginTestData[1]; // TC002

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Enter Invalid Username', async () => {
    await loginPage.login(testData.username, testData.password);
  });

  await test.step('Verify Error Message', async () => {
    await page.waitForTimeout(1500);
    const errorDisplayed = await loginPage.isErrorDisplayed();
    expect(errorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    testLogger.info(`Error Message: ${errorMessage}`);
  });
});

// Test: Invalid Password
test('TC003 - Login with Invalid Password', async ({ loginPage, page, logger: testLogger }) => {
  testLogger.info('Test: Login with Invalid Password');
  const testData = loginTestData[2]; // TC003

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Enter Invalid Password', async () => {
    await loginPage.login(testData.username, testData.password);
  });

  await test.step('Verify Error Message', async () => {
    await page.waitForTimeout(1500);
    const errorDisplayed = await loginPage.isErrorDisplayed();
    expect(errorDisplayed).toBeTruthy();
  });
});

// Test: Empty Username
test('TC004 - Login with Empty Username', async ({ loginPage, page, logger: testLogger }) => {
  testLogger.info('Test: Login with Empty Username');
  const testData = loginTestData[3]; // TC004

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Enter Empty Username and Valid Password', async () => {
    await loginPage.enterPassword(testData.password);
    await loginPage.clickLoginButton();
  });

  await test.step('Verify Validation Message', async () => {
    await page.waitForTimeout(1000);
    // The form should still be visible as login should fail
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});

// Test: Empty Password
test('TC005 - Login with Empty Password', async ({ loginPage, page, logger: testLogger }) => {
  testLogger.info('Test: Login with Empty Password');
  const testData = loginTestData[4]; // TC005

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Enter Valid Username and Empty Password', async () => {
    await loginPage.enterUsername(testData.username);
    await loginPage.clickLoginButton();
  });

  await test.step('Verify Validation Message', async () => {
    await page.waitForTimeout(1000);
    // The form should still be visible as login should fail
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});

// Test: Both Fields Empty
test('TC006 - Login with Both Fields Empty', async ({ loginPage, page, logger: testLogger }) => {
  testLogger.info('Test: Login with Both Fields Empty');

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Click Login without Entering Credentials', async () => {
    await loginPage.clickLoginButton();
  });

  await test.step('Verify Login Page Still Visible', async () => {
    await page.waitForTimeout(1000);
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});

// Test: Special Characters in Username
test('TC007 - Login with Special Characters in Username', async ({ loginPage, page, logger: testLogger }) => {
  testLogger.info('Test: Login with Special Characters');
  const testData = loginTestData[6]; // TC007

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Enter Special Characters', async () => {
    await loginPage.login(testData.username, testData.password);
  });

  await test.step('Verify Error is Displayed', async () => {
    await page.waitForTimeout(1500);
    const errorDisplayed = await loginPage.isErrorDisplayed();
    expect(errorDisplayed).toBeTruthy();
  });
});

// Test: Trimmed Username
test('TC008 - Login with Spaces in Username', async ({ loginPage, page, logger: testLogger }) => {
  testLogger.info('Test: Login with Spaces in Username');
  const testData = loginTestData[7]; // TC008

  await test.step('Navigate to Login Page', async () => {
    await loginPage.navigateToLogin();
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });

  await test.step('Enter Username with Spaces', async () => {
    await loginPage.login(testData.username, testData.password);
  });

  await test.step('Verify Error is Displayed', async () => {
    await page.waitForTimeout(1500);
    // Depending on app behavior, either error or invalid credentials
    const isLoginVisible = await loginPage.isLoginPageDisplayed();
    expect(isLoginVisible).toBeTruthy();
  });
});
