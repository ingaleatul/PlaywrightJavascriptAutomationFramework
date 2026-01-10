# Playwright JavaScript Testing Framework

A comprehensive testing framework built with Playwright and JavaScript, following the Page Object Model (POM) pattern with data-driven test approach, Allure reporting, and comprehensive logging.

## Features

✅ **Page Object Model (POM)** - Structured and maintainable test code
✅ **Data-Driven Testing** - Test multiple scenarios with different data sets
✅ **Allure Reporting** - Beautiful and detailed HTML reports
✅ **Advanced Logging** - File-based logging with multiple log levels
✅ **Screenshot & Video** - Automatic capture on test failures
✅ **Test Listeners/Hooks** - BeforeAll, AfterAll, BeforeEach, AfterEach
✅ **Properties File** - Centralized configuration management
✅ **Utilities** - Logger, Screenshot Manager, Wait Helper
✅ **Cross-Browser Testing** - Chrome, Firefox, Safari
✅ **OrangeHRM Login Tests** - Real-world test scenarios

## Project Structure

```
playwright-javascript-framework/
├── config/
│   ├── properties.js          # Configuration properties
│   └── .env.example           # Environment variables template
├── pages/
│   ├── base-page.js           # Base page with common methods
│   ├── login-page.js          # Login page POM
│   └── home-page.js           # Home page POM
├── test-data/
│   └── login-test-data.js     # Test data for data-driven tests
├── tests/
│   ├── fixtures/
│   │   └── test-fixtures.js   # Custom test fixtures
│   ├── hooks/
│   │   └── test-hooks.js      # Test lifecycle hooks
│   └── specs/
│       ├── login.spec.js      # Individual login test cases
│       └── login-data-driven.spec.js  # Data-driven login tests
├── utils/
│   ├── logger.js              # Custom logger utility
│   ├── screenshot.js          # Screenshot manager
│   └── wait-helper.js         # Wait and synchronization helpers
├── playwright.config.js       # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone/Create the project**
   ```bash
   cd PlaywrightJavascriptFramework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   ```bash
   cp config/.env.example config/.env
   ```

## Configuration

### Properties File (`config/properties.js`)

Centralized configuration for:
- Base URL
- Browser timeouts
- Log levels
- Screenshot settings
- Test credentials
- Retry configuration

### Environment Variables (`config/.env`)

```env
BASE_URL=https://opensource-demo.orangehrm.com
LOG_LEVEL=INFO
NODE_ENV=test
```

## Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

### Browser-Specific Testing

```bash
# Run only on Chrome
npm run test:chrome

# Run only on Firefox
npm run test:firefox

# Run only on Safari
npm run test:webkit

# Run on all browsers
npm run test:all
```

## Test Data & Data-Driven Approach

Test data is defined in `test-data/login-test-data.js`:

```javascript
{
  testId: 'TC001',
  testName: 'Valid Login',
  username: 'Admin',
  password: 'admin123',
  expectedResult: 'Dashboard should be displayed',
  shouldSucceed: true
}
```

The data-driven tests in `login-data-driven.spec.js` iterate through all test data and execute them dynamically.

## Page Object Model

### Base Page (`pages/base-page.js`)

Common methods available to all pages:
- `goto(path)` - Navigate to a page
- `click(selector)` - Click an element
- `fill(selector, text)` - Fill input field
- `getText(selector)` - Get element text
- `isVisible(selector)` - Check element visibility
- `waitForElement(selector, timeout)` - Wait for element
- `captureScreenshot(testName)` - Capture screenshot
- `getTitle()` - Get page title
- `getURL()` - Get current URL

### Login Page (`pages/login-page.js`)

Specific methods for login functionality:
- `navigateToLogin()` - Navigate to login page
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `login(username, password)` - Complete login
- `getErrorMessage()` - Get error message text
- `isErrorDisplayed()` - Check error visibility
- `isLoginPageDisplayed()` - Verify login page loaded

## Logging

The logger utility provides multiple log levels:

```javascript
logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', errorData);
```

Logs are written to:
- Console (stdout)
- File (`./logs/test-YYYY-MM-DD.log`)

Set log level in `config/properties.js`:
```javascript
logLevel: process.env.LOG_LEVEL || 'INFO'
```

## Test Listeners/Hooks

Hooks defined in `tests/hooks/test-hooks.js`:

- **beforeAll** - Executes once before all tests
- **afterAll** - Executes once after all tests
- **beforeEach** - Executes before each test
- **afterEach** - Executes after each test
  - Captures screenshot on failure
  - Logs test status
  - Handles console errors

## Screenshots & Videos

### Automatic Capture on Failure

Screenshots and videos are automatically captured when tests fail:
- Screenshots: `./screenshots/`
- Videos: `./test-results/` (in Playwright's default reporter)

### Manual Capture

```javascript
await loginPage.captureScreenshot('my-test');
await loginPage.captureFullPageScreenshot('my-test');
```

## Allure Reporting

### Generate Allure Report

```bash
# Generate and open Allure report
npm run allure:report

# Clean Allure results
npm run allure:clean
```

### Allure Features

- Detailed test execution timeline
- Step-by-step test execution
- Screenshot attachments
- Error/failure details
- Statistics and trends

### Viewing Reports

Reports are generated in:
- Playwright HTML: `./test-results/index.html`
- Allure HTML: `./allure-report/index.html`

## Test Cases

### Login Tests (login.spec.js)

Individual test cases for specific scenarios:

1. **TC001** - Valid Login
2. **TC002** - Invalid Username
3. **TC003** - Invalid Password
4. **TC004** - Empty Username
5. **TC005** - Empty Password
6. **TC006** - Both Fields Empty
7. **TC007** - Special Characters
8. **TC008** - Spaces in Username

### Data-Driven Tests (login-data-driven.spec.js)

Dynamic test execution using test data array - executes all test scenarios from the data file.

## Utilities

### Logger (`utils/logger.js`)
- Multi-level logging (DEBUG, INFO, WARN, ERROR)
- File-based log persistence
- Timestamp support
- Data serialization

### Screenshot Manager (`utils/screenshot.js`)
- Full page screenshots
- Viewport screenshots
- Timestamped filenames
- Organized directory structure

### Wait Helper (`utils/wait-helper.js`)
- Wait for element visibility
- Wait for navigation
- Wait for custom functions
- Timeout handling

## Best Practices

1. **Page Objects** - Keep selectors and methods in page objects
2. **Logging** - Use logger for detailed test execution tracking
3. **Data-Driven** - Use test data arrays for multiple scenarios
4. **Error Handling** - Always wrap operations in try-catch
5. **Assertions** - Use Playwright's expect for assertions
6. **Steps** - Use test.step() for better report organization
7. **Waits** - Avoid hardcoded waits; use proper wait mechanisms

## Troubleshooting

### Tests Not Running
- Ensure Node.js and npm are installed
- Run `npm install` to install dependencies
- Run `npx playwright install` to install browsers

### Playwright Browsers Not Installed
```bash
npx playwright install
npx playwright install-deps
```

### Port Already in Use
Check for other processes using the test port and terminate them.

### Allure Report Not Generating
```bash
# Ensure allure-playwright is installed
npm install allure-playwright --save-dev

# Clean and regenerate
npm run allure:clean
npm test
npm run allure:report
```

## Environment Setup

### For CI/CD Pipelines

Set environment variables:
```bash
export BASE_URL=https://opensource-demo.orangehrm.com
export LOG_LEVEL=DEBUG
export NODE_ENV=test
```

### Docker Support (Optional)

Create a Dockerfile to run tests in a containerized environment:

```dockerfile
FROM mcr.microsoft.com/playwright:v1.48.0-jammy
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "test"]
```

## Contributing

1. Create feature branch
2. Add tests for new features
3. Ensure all tests pass
4. Submit pull request

## License

MIT

## Support

For issues and questions, please refer to:
- [Playwright Documentation](https://playwright.dev)
- [Allure Report Documentation](https://docs.qameta.io/allure)

---

**Created:** January 2026
**Framework Version:** 1.0.0
