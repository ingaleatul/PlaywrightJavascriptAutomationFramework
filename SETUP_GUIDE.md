// SETUP_GUIDE.md
# Playwright JavaScript Testing Framework - Setup Guide

## Quick Start Guide

### 1. Prerequisites
- Node.js v14 or higher
- npm or yarn
- Git (optional)

### 2. Installation Steps

#### Step 1: Navigate to Project Directory
```bash
cd PlaywrightJavascriptFramework
```

#### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- `@playwright/test` - Playwright test runner and assertions
- `allure-playwright` - Allure reporting integration
- `dotenv` - Environment variable management

#### Step 3: Install Browsers
```bash
npx playwright install
```

This installs Chromium, Firefox, and WebKit browsers.

### 3. Configuration

#### Environment Setup
1. Copy the environment template:
```bash
cp config/.env.example config/.env
```

2. Update `config/.env` with your settings:
```env
BASE_URL=https://opensource-demo.orangehrm.com
LOG_LEVEL=INFO
NODE_ENV=test
```

#### Update Test Credentials (if needed)
Edit `config/properties.js`:
```javascript
validCredentials: {
  username: 'Admin',
  password: 'admin123',
}
```

### 4. Run Your First Test

#### Run All Tests
```bash
npm test
```

#### Run Specific Test File
```bash
npx playwright test tests/specs/login.spec.js
```

#### Run in Headed Mode (see browser)
```bash
npm run test:headed
```

#### Run in Debug Mode
```bash
npm run test:debug
```

### 5. View Test Reports

#### Playwright HTML Report
Tests generate an HTML report automatically:
```bash
npx playwright show-report
```

#### Generate Allure Report
```bash
npm run allure:report
```

This will:
1. Generate Allure report from test results
2. Open the report in your default browser

### 6. Directory Structure Overview

```
PlaywrightJavascriptFramework/
│
├── config/                    # Configuration files
│   ├── properties.js          # Application properties
│   └── .env.example           # Environment template
│
├── pages/                     # Page Object Models
│   ├── base-page.js           # Common page methods
│   ├── login-page.js          # Login page object
│   └── home-page.js           # Home page object
│
├── test-data/                 # Test data files
│   └── login-test-data.js     # Login test scenarios
│
├── tests/                     # Test specifications
│   ├── fixtures/
│   │   └── test-fixtures.js   # Custom fixtures
│   ├── hooks/
│   │   ├── test-hooks.js      # Lifecycle hooks
│   │   └── listeners.js       # Custom listeners
│   ├── api/
│   │   └── test-data-provider.js  # Data provider utility
│   └── specs/
│       ├── login.spec.js      # Login test cases
│       └── login-data-driven.spec.js  # Data-driven tests
│
├── utils/                     # Utility classes
│   ├── logger.js              # Logging utility
│   ├── screenshot.js          # Screenshot manager
│   └── wait-helper.js         # Wait utilities
│
├── logs/                      # Generated log files
├── screenshots/               # Failed test screenshots
├── test-results/              # HTML reports
├── allure-results/            # Allure report data
│
├── package.json               # Dependencies
├── playwright.config.js       # Playwright configuration
├── README.md                  # Full documentation
└── .gitignore                 # Git ignore rules
```

## Understanding the Framework

### Page Object Model (POM)
- All page-related code is organized in `pages/` directory
- Each page has a corresponding class extending `BasePage`
- Selectors are defined as class properties
- Methods represent user actions (click, fill, navigate, etc.)

### Test Data Driven Approach
- Test data is defined in `test-data/login-test-data.js`
- Each test scenario is a data object with:
  - `testId` - Unique identifier
  - `testName` - Descriptive name
  - `username` - Test input
  - `password` - Test input
  - `expectedResult` - Expected outcome
  - `shouldSucceed` - Boolean flag

### Logging
- Logs are automatically generated in `logs/` directory
- Each day gets a separate log file
- Log levels: DEBUG, INFO, WARN, ERROR
- View logs: `cat logs/test-YYYY-MM-DD.log`

### Screenshots
- Screenshots are captured automatically on test failure
- Stored in `screenshots/` directory
- Also available in Playwright's default report

## Common Commands

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/specs/login.spec.js

# Run specific test by name
npx playwright test -g "Valid Login"

# Run tests in headed mode
npm run test:headed

# Debug a test
npm run test:debug

# Run tests on specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Generate reports
npm run allure:report

# Clean up reports
npm run allure:clean
npx playwright clean
```

## Troubleshooting

### Issue: Tests not running
**Solution:**
```bash
npm install
npx playwright install
npx playwright install-deps
```

### Issue: Browser not found
**Solution:**
```bash
npx playwright install chromium firefox webkit
npx playwright install-deps
```

### Issue: Timeout errors
- Increase timeout in `config/properties.js`
- Check if the website is accessible
- Check your internet connection

### Issue: Allure report not generating
**Solution:**
```bash
npm run allure:clean
npm test
npm run allure:report
```

### Issue: Screenshots not captured
- Ensure `screenshots/` directory exists
- Check file permissions
- Verify test actually failed

## Next Steps

1. **Understand the existing tests**
   - Review `tests/specs/login.spec.js`
   - Review `tests/specs/login-data-driven.spec.js`

2. **Add new tests**
   - Create new spec file in `tests/specs/`
   - Create corresponding page object in `pages/`

3. **Add new test data**
   - Update or create test data file in `test-data/`
   - Reference in your test

4. **Configure CI/CD**
   - Add GitHub Actions, Jenkins, or other CI/CD
   - Use provided npm scripts in pipeline

## Best Practices

1. **Always use Page Objects** - Never hardcode selectors in tests
2. **Use logging** - Log important steps for debugging
3. **Data-driven approach** - Separate test data from test logic
4. **Organize tests** - Use meaningful test names and IDs
5. **Clean code** - Follow consistent naming conventions
6. **Error handling** - Always use try-catch for error scenarios

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Allure Report Docs](https://docs.qameta.io/allure)
- [OrangeHRM Demo](https://opensource-demo.orangehrm.com)

## Support

For issues:
1. Check the `logs/` directory for error details
2. Run in debug mode: `npm run test:debug`
3. Check Playwright browser console messages
4. Review test-results/index.html for detailed report

---

**Happy Testing! 🚀**
